/*
 * Masthead navigation, replacing the jQuery greedy-nav plugin.
 *
 * Above the breakpoint every link sits in `.visible-links` and the toggle is
 * hidden by CSS. Below it the links move into `.hidden-links`, which the
 * toggle opens. No layout measuring, no dependencies, ~1 KB.
 */
(function () {
  var WIDE = window.matchMedia('(min-width: 68.75em)');

  function init() {
    var nav = document.querySelector('.greedy-nav');
    if (!nav) return;

    var toggle = nav.querySelector('button');
    var visible = nav.querySelector('.visible-links');
    var hidden = nav.querySelector('.hidden-links');
    if (!toggle || !visible || !hidden) return;

    function setExpanded(open) {
      hidden.classList.toggle('hidden', !open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.classList.toggle('open', open);
    }

    function applyMode() {
      var items = Array.prototype.slice.call(
        WIDE.matches ? hidden.children : visible.children
      );
      var target = WIDE.matches ? visible : hidden;
      items.forEach(function (li) { target.appendChild(li); });
      toggle.setAttribute('aria-expanded', 'false');
      hidden.classList.add('hidden');
      toggle.classList.remove('open');
      toggle.hidden = WIDE.matches;
      document.documentElement.classList.toggle('nav-collapsed', !WIDE.matches);
    }

    toggle.setAttribute('aria-controls', 'site-nav-menu');
    toggle.setAttribute('aria-expanded', 'false');
    hidden.id = 'site-nav-menu';

    toggle.addEventListener('click', function () {
      setExpanded(hidden.classList.contains('hidden'));
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setExpanded(false);
    });

    document.addEventListener('click', function (event) {
      if (!nav.contains(event.target)) setExpanded(false);
    });

    if (WIDE.addEventListener) {
      WIDE.addEventListener('change', applyMode);
    }

    applyMode();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
