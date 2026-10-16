/* Pages: the Countdown (wedding) and Next Adventure (Europe trip).
   Each page is a function that fills the box. ctx.C = content, ctx.S = her progress,
   ctx.onLeave(fn) = run fn when she leaves the page (used here to stop the clock). */
window.PAGES = window.PAGES || {};
(function () {
  function make(key, label, extra) {
    return function (box, ctx) {
      var T = new Date(ctx.C.dates[key]);
      box.innerHTML = label + '<div class="big"></div>' + (extra || '');
      var el = box.querySelector('.big');
      function tick() {
        var s = Math.max(0, Math.floor((T - Date.now()) / 1000));
        el.textContent = Math.floor(s / 86400) + 'd ' + Math.floor(s % 86400 / 3600) + 'h ' + Math.floor(s % 3600 / 60) + 'm ' + (s % 60) + 's';
      }
      tick();
      var t = setInterval(tick, 1000);
      ctx.onLeave(function () { clearInterval(t); });
    };
  }
  PAGES.count = make('wedding', 'Until we get married (15 May):');
  PAGES.next  = make('trip', 'Until we fly to Europe (21 May):',
    '<p style="margin:12px 0 0">Placeholder: ideas and plans for the trip will go here.</p>');
})();
