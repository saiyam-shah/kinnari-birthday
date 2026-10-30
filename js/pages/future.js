/* Page: Future (dream board). Every card, tag and keepsake pinned to the board opens one dream.
   The dreams (positions, titles, text) live in content.js under "future". Opened ones are remembered. */
window.PAGES = window.PAGES || {};
PAGES.future = function (box, ctx) {
  var F = ctx.C.future, S = ctx.S;
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function seen(i) { return !!S.v['f' + i]; }
  function opened() { return F.dreams.filter(function (_, i) { return seen(i); }).length; }

  var wrap = el('div', 'tl'), stage = el('div', 'tl-stage'), card = el('div', 'tl-card fu-card');
  stage.style.setProperty('--r', F.ratio);
  var img = el('img'); img.src = F.image; img.alt = 'A cork dream board on a sunlit stone wall, pinned with blank cards, tags, a map and a compass';
  stage.appendChild(img);

  var pts = [];
  F.dreams.forEach(function (d, i) {
    var b = el('button', 'fu-pt' + (seen(i) ? ' seen' : ''));
    b.style.left = d.x + '%'; b.style.top = d.y + '%'; b.style.width = d.w + '%'; b.style.height = d.h + '%';
    b.setAttribute('aria-label', d.title);
    b.appendChild(el('span', 'lbl', d.title));
    b.onclick = function () { openDream(i); };
    stage.appendChild(b); pts.push(b);
  });
  stage.appendChild(card); wrap.appendChild(stage); box.appendChild(wrap);
  card.setAttribute('aria-live', 'polite');

  function intro() {
    card.hidden = false; card.textContent = '';
    card.appendChild(el('h2', null, 'Our dream board'));
    card.appendChild(el('p', null, F.intro));
    card.appendChild(el('p', 'count', opened() + ' of ' + F.dreams.length + ' dreams opened'));
    var nav = el('div', 'tl-nav'), go = el('button', null, 'Look at the board');
    go.onclick = function () { card.hidden = true; };
    nav.appendChild(go); card.appendChild(nav);
  }
  function openDream(i) {
    var d = F.dreams[i];
    S.v['f' + i] = 1; ctx.save(); pts[i].classList.add('seen');
    card.hidden = false; card.textContent = '';
    card.appendChild(el('div', 'd', d.when || 'One day'));
    card.appendChild(el('h2', null, d.title));
    card.appendChild(el('p', null, d.text));
    card.appendChild(el('p', 'count', opened() + ' of ' + F.dreams.length + ' dreams opened'));
    var nav = el('div', 'tl-nav'), back = el('button', null, 'Back to the board');
    back.onclick = function () { card.hidden = true; };
    nav.appendChild(back); card.appendChild(nav);
  }
  intro();
};
PAGES.future.full = true;
