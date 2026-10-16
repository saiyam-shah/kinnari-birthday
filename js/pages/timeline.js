/* Page: Timeline. A lantern-lit path; each numbered lantern opens a milestone.
   The entries (dates, titles, text, photos, lantern positions) live in content.js under "timeline". */
window.PAGES = window.PAGES || {};
PAGES.timeline = function (box, ctx) {
  var T = ctx.C.timeline;
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  var wrap = el('div', 'tl'), stage = el('div', 'tl-stage'), card = el('div', 'tl-card');
  stage.style.setProperty('--r', T.ratio);
  var img = el('img'); img.src = T.image; img.alt = 'A lantern-lit cobblestone path winding along a hillside at sunset';
  stage.appendChild(img); stage.appendChild(card); wrap.appendChild(stage); box.appendChild(wrap);
  card.setAttribute('aria-live', 'polite');

  var pts = [], last = T.points.length - 1;
  T.points.forEach(function (p, i) {
    var b = el('button', 'tl-pt', String(i + 1));
    b.style.left = p.x + '%'; b.style.top = p.y + '%';
    b.setAttribute('aria-label', 'Memory ' + (i + 1) + ': ' + p.title);
    b.onclick = function () { show(i); };
    stage.appendChild(b); pts.push(b);
  });

  function show(i) {
    pts.forEach(function (b, k) { b.classList.toggle('on', k === i); });
    card.textContent = '';
    if (i < 0) {
      card.appendChild(el('h2', null, 'Our story'));
      card.appendChild(el('p', null, T.intro));
    } else {
      var p = T.points[i];
      card.appendChild(el('div', 'd', p.date));
      card.appendChild(el('h2', null, p.title));
      if (p.photo) { var im = el('img'); im.src = p.photo; im.alt = p.title; card.appendChild(im); }
      card.appendChild(el('p', null, p.text));
    }
    var nav = el('div', 'tl-nav'), prev = el('button', null, '← Earlier'),
        next = el('button', null, i < 0 ? 'Begin →' : (i === last ? 'The end ♥' : 'Next →'));
    prev.disabled = i <= 0; next.disabled = (i === last);
    prev.onclick = function () { show(i - 1); };
    next.onclick = function () { show(i + 1); };
    nav.appendChild(prev); nav.appendChild(next); card.appendChild(nav);
  }
  show(-1);
};
/* tells app.js to give this page the whole screen instead of the plain white page layout */
PAGES.timeline.full = true;
