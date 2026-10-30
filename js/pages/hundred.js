/* Page: 52 Reasons I Love You. She taps the jar and pulls out a folded heart.
   The things live in content.js under "hundred" (one line each; title and noun too). Which ones she has read is remembered. */
window.PAGES = window.PAGES || {};
PAGES.hundred = function (box, ctx) {
  var H = ctx.C.hundred, S = ctx.S, N = H.items.length;
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function seen(i) { return !!S.v['h' + i]; }
  function readCount() { return H.items.filter(function (_, i) { return seen(i); }).length; }

  var wrap = el('div', 'tl'), stage = el('div', 'tl-stage'), card = el('div', 'tl-card hd-card');
  stage.style.setProperty('--r', H.ratio);
  var img = el('img'); img.src = H.image; img.alt = 'A glass jar full of folded paper hearts on a terrace table at sunset, a golden retriever puppy sniffing the spilled hearts';
  stage.appendChild(img);

  var jar = el('button', 'hd-jar');
  jar.style.left = H.jar.x + '%'; jar.style.top = H.jar.y + '%'; jar.style.width = H.jar.w + '%'; jar.style.height = H.jar.h + '%';
  jar.setAttribute('aria-label', 'Pull a heart from the jar');
  stage.appendChild(jar); stage.appendChild(card); wrap.appendChild(stage); box.appendChild(wrap);
  card.setAttribute('aria-live', 'polite');

  function intro() {
    card.textContent = '';
    card.appendChild(el('h2', null, H.title));
    card.appendChild(el('p', null, H.intro));
    card.appendChild(el('p', 'count', readCount() + ' of ' + N + ' read'));
  }
  function pull() {
    var left = [], i;
    for (i = 0; i < N; i++) if (!seen(i)) left.push(i);
    var pool = left.length ? left : H.items.map(function (_, k) { return k; });
    var n = pool[Math.floor(Math.random() * pool.length)];
    S.v['h' + n] = 1; ctx.save();
    card.textContent = '';
    var pop = el('div', 'hd-pop');
    pop.appendChild(el('div', 'd', H.noun + ' ' + (n + 1)));
    pop.appendChild(el('h2', null, H.items[n]));
    pop.appendChild(el('p', 'count', readCount() + ' of ' + N + ' read'));
    var nav = el('div', 'tl-nav'), again = el('button', null, left.length > 1 || !left.length ? 'Pull another heart' : 'Pull the last heart');
    again.onclick = pull; nav.appendChild(again); pop.appendChild(nav);
    card.appendChild(pop);
    again.focus();
  }
  jar.onclick = pull;
  intro();
};
PAGES.hundred.full = true;
