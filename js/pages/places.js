/* Page: Places. Our favourite places in Mumbai, as a grid of cards.
   The list (names, emoji, one-line notes) lives in content.js under "places". */
window.PAGES = window.PAGES || {};
PAGES.places = function (box, ctx) {
  var P = ctx.C.places, S = ctx.S;
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  box.textContent = '';
  box.appendChild(el('p', 'pl-intro', P.intro));
  var count = el('p', 'pl-count'), grid = el('div', 'pl-grid');
  box.appendChild(count); box.appendChild(grid);
  function paint() {
    var n = P.list.filter(function (_, i) { return S.v['pl' + i]; }).length;
    count.textContent = n + ' of ' + P.list.length + ' remembered';
  }
  P.list.forEach(function (p, i) {
    var b = el('button', 'pl-card'), seen = !!S.v['pl' + i];
    b.type = 'button'; b.classList.toggle('on', seen);
    b.appendChild(el('span', 'pl-i', p.icon));
    b.appendChild(el('b', null, p.name));
    var note = el('small', null, p.note || ''); b.appendChild(note);
    b.setAttribute('aria-expanded', seen ? 'true' : 'false');
    b.onclick = function () {
      S.v['pl' + i] = 1; ctx.save();
      var open = !b.classList.contains('open');
      b.classList.toggle('open', open); b.classList.add('on');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      paint();
    };
    grid.appendChild(b);
  });
  paint();
};
