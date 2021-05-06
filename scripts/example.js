// shared
(function() {
    (function pollFunction() { // poll
        if (document.querySelectorAll('#main').length && document.querySelectorAll('.container').length) { // elements
            try {
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
            } catch (err) {
                console.log('Try error: ' + err);
            }
        } else {
            setTimeout(pollFunction, 25); // timeout: 25
        }
    })();
})();
// end: shared

// target
(function() {
    // url: www.homepage.com
    (function pollFunction() { // poll
        if (document.querySelectorAll('#main').length && document.querySelectorAll('.container').length) { // elements
            return true;
        } else {
            setTimeout(pollFunction, 25);
        }
    })();
    // end: url: www.homepage.com
    // url: www.homepage.com/events/
    (function pollFunction() { // poll
        if (document.querySelectorAll('.container').length) { // elements
            return true;
        } else {
            setTimeout(pollFunction, 25);
        }
    })();
    // end: url: www.homepage.com/events/
})();
// end: target

// audience
(function() {
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
    // iPhone
    function isIphone() {
        var isIphone = !!navigator.platform && /iPhone/i.test(navigator.platform);
        return isIphone;
    }
    // end: iPhone
})();
// end: audience

// v1
(function() {
    var experimentName = {
        init: function() {
            this.mainJS(); // mainJS
            this.mainCSS(); // mainCSS
            this.customEvent(); // customEvent
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
        },
        customEvent: function() {} // customEvent
    };
    (function pollFunction() { // poll
        if (window.jQuery !== undefined) {
            var $ = window.jQuery;
            if ($('#main').length && $('.container').length) { // elements
                try {
                    experimentName.init();
                    console.log("experimentName: v1");
                } catch (err) {
                    console.log('Try error: ' + err);
                }
            } else {
                setTimeout(pollFunction, 25); // timeout: 25
            }
        } else {
            setTimeout(pollFunction, 25); // timeout: 25
        }
    })();
})();
// end: v1

// v2
(function() {
    var experimentName = {
        init: function() {
            this.mainJS(); // mainJS
            this.mainCSS(); // mainCSS
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
        }
    };
    (function pollFunction() { // poll
        if (document.querySelectorAll('#main').length && document.querySelectorAll('.container').length) { // elements
            try {
                experimentName.init();
                console.log("experimentName: v2");
            } catch (err) {
                console.log('Try error: ' + err);
            }
        } else {
            setTimeout(pollFunction, 25); // timeout: 25
        }
    })();
})();
// end: v2

=========================================================================================================================

// shared
(function() {
    (function pollFunction() { // poll
        if (document.querySelectorAll('#main').length && document.querySelectorAll('.container').length) { // elements
            try {
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
            } catch (err) {
                console.log('Try error: ' + err);
            }
        } else {
            setTimeout(pollFunction, 25); // timeout: 25
        }
    })();
})();
// end: shared

// target
(function() {
    // url: www.homepage.com
    (function pollFunction() { // poll
        if (document.querySelectorAll('#main').length && document.querySelectorAll('.container').length) { // elements
            return true;
        } else {
            setTimeout(pollFunction, 25);
        }
    })();
    // end: url: www.homepage.com
    // url: www.homepage.com/events/
    (function pollFunction() { // poll
        if (document.querySelectorAll('.container').length) { // elements
            return true;
        } else {
            setTimeout(pollFunction, 25);
        }
    })();
    // end: url: www.homepage.com/events/
})();
// end: target

// audience
(function() {
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
    // iPhone
    function isIphone() {
        var isIphone = !!navigator.platform && /iPhone/i.test(navigator.platform);
        return isIphone;
    }
    // end: iPhone
})();
// end: audience

==========================================================================================================================

// v1
(function() {
    var experimentName = {
        init: function() {
            this.mainJS(); // mainJS
            this.mainCSS(); // mainCSS
            this.customEvent(); // customEvent
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
        },
        customEvent: function() {} // customEvent
    };
    (function pollFunction() { // poll
        if (window.jQuery !== undefined) {
            var $ = window.jQuery;
            if ($('#main').length && $('.container').length) { // elements
                try {
                    experimentName.init();
                    console.log("experimentName: v1");
                } catch (err) {
                    console.log('Try error: ' + err);
                }
            } else {
                setTimeout(pollFunction, 25); // timeout: 25
            }
        } else {
            setTimeout(pollFunction, 25); // timeout: 25
        }
    })();
})();
// end: v1

// v2
(function() {
    var experimentName = {
        init: function() {
            this.mainJS(); // mainJS
            this.mainCSS(); // mainCSS
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
        }
    };
    (function pollFunction() { // poll
        if (document.querySelectorAll('#main').length && document.querySelectorAll('.container').length) { // elements
            try {
                experimentName.init();
                console.log("experimentName: v2");
            } catch (err) {
                console.log('Try error: ' + err);
            }
        } else {
            setTimeout(pollFunction, 25); // timeout: 25
        }
    })();
})();
// end: v2