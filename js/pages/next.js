/* Page: Next Adventure. A live countdown to the Europe trip, plus a few things on the cafe table to open.
   The trip date is in content.js under "dates"; the items under "trip". Replaces the simple version in countdown.js. */
window.PAGES = window.PAGES || {};
PAGES.next = function (box, ctx) {
  var T = ctx.C.trip, S = ctx.S, when = new Date(ctx.C.dates.trip);
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function seen(i) { return !!S.v['t' + i]; }

  var wrap = el('div', 'tl'), stage = el('div', 'tl-stage'), card = el('div', 'tl-card nx-card');
  stage.style.setProperty('--r', T.ratio);
  var img = el('img'); img.src = T.image; img.alt = 'A cafe table on a cobblestone street at sunset with two passports, packed suitcases and a golden retriever puppy';
  stage.appendChild(img);

  var pts = [];
  T.items.forEach(function (it, i) {
    var b = el('button', 'fu-pt' + (seen(i) ? ' seen' : ''));
    b.style.left = it.x + '%'; b.style.top = it.y + '%'; b.style.width = it.w + '%'; b.style.height = it.h + '%';
    b.setAttribute('aria-label', it.title);
    b.appendChild(el('span', 'lbl', it.title));
    b.onclick = function () { openItem(i); };
    stage.appendChild(b); pts.push(b);
  });
  stage.appendChild(card); wrap.appendChild(stage); box.appendChild(wrap);

  var nums = {};
  function clock() {
    card.textContent = '';
    card.appendChild(el('div', 'd', T.dateLabel));
    card.appendChild(el('h2', null, T.title));
    var row = el('div', 'nx-clock');
    ['days', 'hours', 'minutes', 'seconds'].forEach(function (u) {
      var c = el('div', 'nx-u'); nums[u] = el('b', null, '0');
      c.appendChild(nums[u]); c.appendChild(el('span', null, u)); row.appendChild(c);
    });
    card.appendChild(row);
    card.appendChild(el('p', null, T.intro));
    tick();
  }
  function tick() {
    if (!nums.days || !nums.days.isConnected) return;
    var s = Math.max(0, Math.floor((when - Date.now()) / 1000));
    nums.days.textContent = Math.floor(s / 86400);
    nums.hours.textContent = Math.floor(s % 86400 / 3600);
    nums.minutes.textContent = Math.floor(s % 3600 / 60);
    nums.seconds.textContent = s % 60;
  }
  function openItem(i) {
    var it = T.items[i];
    S.v['t' + i] = 1; ctx.save(); pts[i].classList.add('seen');
    card.textContent = '';
    card.appendChild(el('div', 'd', it.when || 'The plan'));
    card.appendChild(el('h2', null, it.title));
    card.appendChild(el('p', null, it.text));
    var nav = el('div', 'tl-nav'), back = el('button', null, 'Back to the countdown');
    back.onclick = clock; nav.appendChild(back); card.appendChild(nav);
  }
  clock();
  var t = setInterval(tick, 1000);
  ctx.onLeave(function () { clearInterval(t); });
};
PAGES.next.full = true;
