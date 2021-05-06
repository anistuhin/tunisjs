// initialize clipboard
var clipboard = new ClipboardJS('[data-clipboard]');
clipboard.on('success', function(e) {
    e.clearSelection();
    // console.info('Action:', e.action);
    // console.info('Text:', e.text);
    // console.info('Trigger:', e.trigger);
    showTooltip(e.trigger, 'Copied!');
});
clipboard.on('error', function(e) {
    // console.error('Action:', e.action);
    // console.error('Trigger:', e.trigger);
    showTooltip(e.trigger, fallbackMessage(e.action));
});


// initialize tooltip
var btns = document.querySelectorAll('.tbtn');
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('mouseleave', clearTooltip);
    btns[i].addEventListener('blur', clearTooltip);
}

function clearTooltip(e) {
    e.currentTarget.setAttribute('class', 'tbtn btn');
    e.currentTarget.removeAttribute('aria-label');
}

function showTooltip(elem, msg) {
    elem.setAttribute('class', 'tbtn btn tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}

function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');
    if (/iPhone|iPad/i.test(navigator.userAgent)) { actionMsg = 'No support :('; } else if (/Mac/i.test(navigator.userAgent)) { actionMsg = 'Press ⌘-' + actionKey + ' to ' + action; } else { actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action; }
    return actionMsg;
}

// sticky header menu
var pos = $('.menu-bar').offset().top + 70;
var $ = window.jQuery;
if (pos < $(window).scrollTop()) {
    $('body').addClass('sticky');
} else {
    $('body').removeClass('sticky');
}
$(window).scroll(function() {
    if (pos < $(window).scrollTop()) {
        $('body').addClass('sticky');
    } else {
        $('body').removeClass('sticky');
    }
});