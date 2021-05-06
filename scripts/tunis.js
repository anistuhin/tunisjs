var $ = window.jQuery,
    props = null,
    files = false,
    shared = null,
    target = null,
    audience = null,
    variations = null;
var eol = `

`; // end of line or emepty line simulator 
var metricsLibrary = { // list of available metrics
    'clickSegment': `
// clickSegment
window.optimizely = window.optimizely || []; // window['optimizely'] will be defined when run using the Optimizely tool
document.querySelector('#target').addEventListener('click', function() {
    optimizlyPushSegmentValue('true');
});

function optimizlyPushSegmentValue(value) {
    window["optimizely"].push({
        type: "user",
        attributes: {
            clickSegment: value
        }
    });
    window['optimizely'].push({ // an event push is always required to ensure a segment push as in optimizely data don't get sent until an event is fired
        type: "event",
        eventName: "tempEventForSegmentFire"
    });
}
// clickSegment
	`,
    'scroll75': `
// scroll75
var $ = window.jQuery;
var scrollSeventyFive = true;
$(window).bind('scroll', function() {
    window.scrollPercent = ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100;
    if (window.scrollPercent >= 50 && scrollSeventyFive) {
        window['optimizely'] = window['optimizely'] || [];
        window['optimizely'].push({
            type: "event",
            eventName: "scroll75"
        });
        scrollSeventyFive = false;
    }
});
// end: scroll75
	`,
    'click': `
// click metrics, example case: Optimizely
var $ = window.jQuery;
window['optimizely'] = window['optimizely'] || []; // window['optimizely'] will be defined when run using the Optimizely tool
$(document).on('click', 'selectorName', function() {
    window['optimizely'].push({
        type: "event",
        eventName: "eventName"
    });
});
// end: click metrics, example case: Optimizely
	`,
    'pageview': `
// pageview metrics, example case: VWO
if (window.location.pathname.toLowerCase() == "/example-apge/") {
    customMetricsTrigger(['pageID']); // pageID is an integer
}

function customMetricsTrigger(metricsIDList) {
    metricsIDList.forEach(function(value) {
        window._vis_opt_queue.push(function() {
            _vis_opt_goal_conversion(value); // _vis_opt_goal_conversion will be defined when run using the VWO tool
        });
    });
}
// end: pageview metrics, example case: VWO
	`
};

var audienceLibrary = { // list of available audiences
    'lt520': `
// lt520
function isLt520() {
    var w = screen.width || window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (w < 520) {
        return true;
    } else {
        return false;
    }
}
// end: lt520
	`,
    'iPhone': `
// iPhone
function isIphone() {
    var isIphone = !!navigator.platform && /iPhone/i.test(navigator.platform);
    return isIphone;
}
// end: iPhone
	`
};

$(document).on('click', '.interpret', function() { // on submit, click on the interpret button
    try {
        props = null;
        files = false;
        shared = null;
        target = null;
        audience = null;
        variations = null;
        var config = JSON.parse($('#prot').val());
        processConfig(config);
    } catch (e) {
        clearAll(); // clear all the previous result sections
        $(this).closest('.example').after(snippetWrapper(e, ' red')); // print the error messages
    }
});

function snippetWrapper(codes, statusClass, id = 'result') { // creates resulted code snippet to push to the html for copying purposes
    return `
		<pre id="` + id + `" class="snippet"><code class="html hljs xml` + statusClass + `">` + codes + `</code></pre>
		<div class="align-right">
            <button class="btn tbtn" type="button" data-clipboard data-clipboard-target="#` + id + `">Copy '` + id + `' to clipboard</button>
        </div>
	`;
}

function processConfig(config) { // break the config JSON file into multiple parts
    $.each(config, function(index, value) {
        if (index == 'variations' && !$.isEmptyObject(value)) {
            variations = value;
            var tempVariations = '';
            $.each(variations, function(i, v) {
                tempVariations += interpretVariation(v, i);
            });
            variations = tempVariations;
        }
        if (index == 'props' && !$.isEmptyObject(value)) {
            props = value;
            $.each(props, function(i, v) {
                if (i == 'shared' && !$.isEmptyObject(value)) {
                    shared = v;
                    interpretShared(shared);
                }
                if (i == 'target' && !$.isEmptyObject(value)) {
                    target = v;
                    interpretTarget(target);
                }
                if (i == 'audience' && !$.isEmptyObject(value)) {
                    audience = v;
                    interpretAudience(audience);
                }
            });
            if (shared == null && target == null && audience == null) {
                props = null;
            }
        }
        if (index == 'files' && typeof value === "boolean") {
            files = value;
        }
    });
    if (props == null && variations == null) {
        clearAll(); // clear all the previous result sections
        $('.interpret').closest('.example').after(snippetWrapper('<code>props</code> or <code>variations</code> must be available on the top level', ' red'));
    } else {
        if (files) {
            $('#result, [data-clipboard-target="#result"]').remove(); // removing exisiting results and copy buttons to replace with the updated one
            if (shared != null) {
                $('#shared, [data-clipboard-target="#shared"]').remove(); // removing exisiting results and copy buttons to replace with the updated one
                $('.interpret').closest('.example').after(snippetWrapper(shared, '', 'shared')); // print the shared codes
            }
            if (target != null) {
                $('#target, [data-clipboard-target="#target"]').remove(); // removing exisiting results and copy buttons to replace with the updated one
                $('.interpret').closest('.example').after(snippetWrapper(target, '', 'target')); // print the target codes
            }
            if (audience != null) {
                $('#audience, [data-clipboard-target="#audience"]').remove(); // removing exisiting results and copy buttons to replace with the updated one
                $('.interpret').closest('.example').after(snippetWrapper(audience, '', 'audience')); // print the audience codes
            }
            if (variations != null) {
                $('#variations, [data-clipboard-target="#variations"]').remove(); // removing exisiting results and copy buttons to replace with the updated one
                $('.interpret').closest('.example').after(snippetWrapper(variations, '', 'variations')); // print the variations codes
            }
        } else {
            clearAll(); // clear all the previous result sections
            var result = '';
            if (shared != null) {
                result += shared + eol;
            }
            if (target != null) {
                result += target + eol;
            }
            if (audience != null) {
                result += audience + eol;
            }
            if (variations != null) {
                result += variations + eol;
            }
            $('.interpret').closest('.example').after(snippetWrapper(result)); // print all as a single file/copy
        }
    }
}

function interpretShared(s) { // process the sahred codes
    var sProps = null,
        sMetrics = null,
        sPoll = null,
        sJquery = false,
        sElements = true,
        sTimeout = 25;
    $.each(s, function(i, v) {
        if (i == 'props' && v.length) {
            sProps = v;
        }
        if (i == 'poll' && !$.isEmptyObject(v)) {
            sPoll = v;
            $.each(sPoll, function(it, va) {
                if (it == 'jQuery') {
                    sJquery = va;
                }
                if (it == 'elements' && va.length) {
                    sElements = va;
                    sElements = processElements(sElements, sJquery);
                }
                if (it == 'timeout' && Number.isInteger(va) && Number(va) > 0) {
                    sTimeout = va;
                }
            });
        }
        if (i == 'metrics' && v.length) {
            sMetrics = v;
        }
    });
    if (sProps == null && sMetrics == null && sPoll == null) {
        shared = null;
    }
    if (shared == null) {
        shared = '';
    } else {
        shared = `
// shared
(function() {
    (function pollFunction() { // poll`;
        if (sJquery) {
            shared += `
        if (window.jQuery !== undefined) {
    	var $ = window.jQuery;`;
        }
        shared += `
	        if (` + sElements + `) { // elements
	            try {
	        `;
        if (sMetrics != null) {
            $.each(sMetrics, function(i, v) {
                shared += `` + metricsLibrary[v] + `
	        	`;
            });
        }
        if (sProps != null) {
            $.each(sProps, function(i, v) {
                shared += `function ` + v + `() {}
        	`;
            });
        }
        shared += `
	            } catch (err) {
	                console.log('Try error: ' + err);
	            }
	        } else {
	            setTimeout(pollFunction, ` + sTimeout + `); // timeout: ` + sTimeout + `
	        }`;
        if (sJquery) {
            shared += `
        } else {
            setTimeout(pollFunction, ` + sTimeout + `); // timeout: ` + sTimeout + `
        }`;
        }
        shared += `})();
})();
// end: shared
		`;
    }
}

function interpretTarget(tar) { // process the target codes
    target = `// target
(function() {`
    $.each(tar, function(i, v) {
        var tElements = true,
            tUrl = '';
        if (v.elements == undefined) {} else if (v.elements.length) { // elements validation
            tElements = processElements(v.elements);
        }
        if (v.url == undefined) {} else { // url validation
            tUrl = v.url;
        }
        target += `
    // url: ` + tUrl + `
    (function pollFunction() { // poll
        if (` + tElements + `) { // elements
            return true;
        } else {
            setTimeout(pollFunction, 25);
        }
    })();
    // end: url: ` + tUrl;
    });
    target += `
})();
// end: target
`;
}

function interpretAudience(aud) { // process the audience codes
    audience = `// audience
(function() {
`;
    $.each(aud, function(i, v) {
        audience += audienceLibrary[v]; // fetch audiences from the audience library
    });
    audience += `
})();
// end: audience`;
}

function interpretVariation(v, vname) { // process the variation codes
    var vProps = null,
        vMetrics = null,
        vPoll = null,
        vJquery = false,
        vElements = true,
        vTimeout = 25,
        tempV = '';
    $.each(v, function(i, v) {
        if (i == 'props' && v.length) {
            vProps = v;
        }
        if (i == 'poll' && !$.isEmptyObject(v)) {
            vPoll = v;
            $.each(vPoll, function(it, va) {
                if (it == 'jQuery') {
                    vJquery = va;
                }
                if (it == 'elements' && va.length) {
                    vElements = va;
                    vElements = processElements(vElements, vJquery);
                }
                if (it == 'timeout' && Number.isInteger(va) && Number(va) > 0) {
                    vTimeout = va;
                }
            });
        }
        if (i == 'metrics' && v.length) {
            vMetrics = v;
        }
    });
    if (vProps == null && vMetrics == null && vPoll == null) {
        tempV = null;
    }
    if (tempV == null) {
        tempV = '';
    } else {
        tempV = `
// ` + vname + `
(function() {
    var experimentName = {
        init: function() {
            this.mainJS(); // mainJS
            this.mainCSS(); // mainCSS`;
        if (vProps != null) {
            $.each(vProps, function(i, v) {
                tempV += `
            this.` + v + `(); // ` + v;
            });
        }
        tempV += `
        },
        mainCSS: function() { // mainCSS
            var mainCSS = '';
            var head = document.getElementsByTagName('head')[0];
            var createTag = document.createElement('style');
            createTag.setAttribute('type', 'text/css');
            var createText = document.createTextNode(mainCSS);
            createTag.appendChild(createText);
            head.appendChild(createTag);
        },
        mainJS: function() { // mainJS
            reload();

            function reload() {} //keep all the codes that needs reload based different conditions
            `;
        if (vMetrics != null) {
            $.each(vMetrics, function(i, v) {
                tempV += `` + metricsLibrary[v] + `
	        	`;
            });
        }
        tempV += `
        }`;
        if (vProps != null) {
            $.each(vProps, function(i, v) {
                tempV += `, ` + v + `: function(){}; // ` + v + `
    `;
            });
        }
    tempV += `};
    (function pollFunction() { // poll`;
        if (vJquery) {
            tempV += `
        if (window.jQuery !== undefined) {
    	var $ = window.jQuery;`;
        }
        tempV += `
        if (` + vElements + `) { // elements
            try {
                experimentName.init();
                console.log("experimentName: ` + vname + `");
            } catch (err) {
                console.log('Try error: ' + err);
            }
        } else {
            setTimeout(pollFunction, 25); // timeout: 25
        }`;
        if (vJquery) {
            tempV += `
        } else {
            setTimeout(pollFunction, ` + vTimeout + `); // timeout: ` + vTimeout + `
        }`;
        }
        tempV += `
    })();
})();
// end: ` + vname + `
`;
    }
    return tempV;
}

function processElements(elements, jQuery) { // process the elements
    var tempElements = '',
        totalElements = elements.length;
    $.each(elements, function(item, value) {
        if (jQuery) { // jQuery selector
            tempElements += "$('" + value + "')";
        } else { // javscript slector
            tempElements += "document.querySelectorAll('" + value + "').length";
        }
        if (item < totalElements - 1) {
            tempElements += ' && ';
        }
    });
    return tempElements;
}

function clearAll() { // clear all the previous result sections
    $('#result, [data-clipboard-target="#result"], #shared, [data-clipboard-target="#shared"], #target, [data-clipboard-target="#target"], #audience, [data-clipboard-target="#audience"], #variations, [data-clipboard-target="#variations"]').remove();
}