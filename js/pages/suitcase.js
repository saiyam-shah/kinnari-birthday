/* Page: Suitcase of Memories. Items pop out of the open suitcase; each one opens a memory.
   The items (positions, icons or pictures, titles, text, photos) live in content.js under "suitcase".
   Which items she has opened is remembered in her browser. */
window.PAGES = window.PAGES || {};
PAGES.suitcase = function (box, ctx) {
  var T = ctx.C.suitcase, S = ctx.S;
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function seen(i) { return !!S.v['sc' + i]; }
  function opened() { return T.items.filter(function (_, i) { return seen(i); }).length; }

  var wrap = el('div', 'tl'), stage = el('div', 'tl-stage'), card = el('div', 'tl-card');
  stage.style.setProperty('--r', T.ratio);
  var img = el('img'); img.src = T.image; img.alt = 'An open leather suitcase on a stone balcony at sunset';
  stage.appendChild(img); stage.appendChild(card); wrap.appendChild(stage); box.appendChild(wrap);
  card.setAttribute('aria-live', 'polite');

  var btns = [];
  T.items.forEach(function (it, i) {
    var b = el('button', 'sc-item' + (seen(i) ? ' seen' : ''));
    b.style.left = it.x + '%'; b.style.top = it.y + '%';
    b.style.setProperty('--rot', (it.rot || 0) + 'deg'); b.style.setProperty('--i', i);
    if (it.image) {
      var pic = el('img'); pic.src = it.image; pic.alt = ''; b.appendChild(pic);
    } else {
      b.classList.add('ph'); b.appendChild(el('span', 'ic', it.icon || '✨'));
    }
    b.appendChild(el('span', 'lbl', it.title));
    b.setAttribute('aria-label', it.title);
    b.onclick = function () { openItem(i); };
    stage.appendChild(b); btns.push(b);
  });

  function intro() {
    card.textContent = '';
    card.appendChild(el('h2', null, 'Suitcase of Memories'));
    card.appendChild(el('p', null, T.intro));
    card.appendChild(el('p', 'count', opened() + ' of ' + T.items.length + ' opened'));
  }
  function openItem(i) {
    var it = T.items[i];
    S.v['sc' + i] = 1; ctx.save(); btns[i].classList.add('seen');
    card.textContent = '';
    card.appendChild(el('div', 'd', it.date));
    card.appendChild(el('h2', null, it.title));
    if (it.photo) { var im = el('img'); im.src = it.photo; im.alt = it.title; card.appendChild(im); }
    card.appendChild(el('p', null, it.text));
    var nav = el('div', 'tl-nav'), back = el('button', null, 'Back to the suitcase');
    back.onclick = intro; nav.appendChild(back); card.appendChild(nav);
  }
  intro();
};
/* give this page the whole screen */
PAGES.suitcase.full = true;
