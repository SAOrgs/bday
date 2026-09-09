/* nav-bridge.js — keeps music playing across pages.
   If the page is loaded inside start.html's iframe, all local link
   clicks are routed through the parent frame so the <audio> element
   (which lives in start.html) never gets destroyed or reloaded. */
if (window.parent !== window && window.parent.navigateTo) {
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
      e.preventDefault();
      window.parent.navigateTo(href);
    }
  });
}
