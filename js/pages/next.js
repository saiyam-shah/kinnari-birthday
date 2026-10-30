/* Page: Next Adventures. Add the custom map at assets/backdrops/world-map.jpg. */
window.PAGES = window.PAGES || {};
PAGES.next = function (box, ctx) {
  var T = ctx.C.trip, S = ctx.S;
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  var wrap = el('div', 'tl'), stage = el('div', 'tl-stage'), card = el('div', 'tl-card nx-card');
  stage.style.setProperty('--r', T.ratio);
  var img = el('img'); img.src = T.image; img.alt = 'A cafe table on a cobblestone street at sunset with passports and packed luggage';
  stage.appendChild(img);
  T.items.forEach(function (it, i) {
    var b = el('button', 'fu-pt' + (S.v['t' + i] ? ' seen' : ''));
    b.style.left = it.x + '%'; b.style.top = it.y + '%'; b.style.width = it.w + '%'; b.style.height = it.h + '%';
    b.setAttribute('aria-label', it.title); b.appendChild(el('span', 'lbl', it.title));
    b.onclick = function () { S.v['t' + i] = 1; ctx.save(); showItem(it); };
    stage.appendChild(b);
  });
  function showPlan() {
    card.textContent = '';
    card.appendChild(el('h2', null, T.title));
    card.appendChild(el('p', null, T.intro));
    var map = el('img', 'nx-map-image'); map.src = T.mapImage; map.alt = 'Our adventures map';
    map.onerror = function () {
      var placeholder = el('div', 'nx-map-placeholder', 'Your map will appear here. Add the image at assets/backdrops/world-map.jpg.');
      this.replaceWith(placeholder);
    };
    card.appendChild(map);

  }
  function showItem(it) {
    card.textContent = '';
    card.appendChild(el('div', 'd', it.when)); card.appendChild(el('h2', null, it.title)); card.appendChild(el('p', null, it.text));
    var back = el('button', 'nx-back', 'Back to our map'); back.onclick = showPlan; card.appendChild(back);
  }
  stage.appendChild(card); wrap.appendChild(stage); box.appendChild(wrap); showPlan();
};
PAGES.next.full = true;
