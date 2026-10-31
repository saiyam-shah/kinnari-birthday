/* The logic. You normally do not need to edit this file:
   words, dates and settings are in content.js, and each page lives in js/pages/. */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var C = window.SITE;
  var PAGES = window.PAGES = window.PAGES || {};

  /* ---------- progress (saved in her browser) ----------
     Developer switches, add to the address:  ?unlock  opens every page,  ?reset  clears progress */
  var KEY = 'kb2', RESET_KEY = 'kb2-reset-at', RESET_INTERVAL = 100 * 365 * 24 * 60 * 60 * 1000, S = { m: [], g: [], v: {} };
  var q = new URLSearchParams(location.search), DEV = q.has('unlock');
  var resetAt = Date.now();
  try {
    var storedResetAt = Number(localStorage.getItem(RESET_KEY));
    var manualReset = q.has('reset');
    if (manualReset || !storedResetAt || Date.now() - storedResetAt >= RESET_INTERVAL) {
      localStorage.removeItem(KEY);
      resetAt = Date.now();
      localStorage.setItem(RESET_KEY, String(resetAt));
      if (manualReset) {
        q.delete('reset');
        var cleanUrl = location.pathname + (q.toString() ? '?' + q.toString() : '') + location.hash;
        history.replaceState(null, '', cleanUrl);
      }
    } else resetAt = storedResetAt;
  } catch (e) {}
  try {
    var s0 = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s0 && s0.m && s0.g) S = { m: s0.m, g: s0.g, v: s0.v || {} };
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function total() { return S.g.length; }
  var FK = Object.keys(C.finds);
  function pill(id) { return C.pills.filter(function (p) { return p.id === id; })[0]; }
  var giftPages = {
    home:     { items:[0,1,2,3], name:'the scene where our story begins', points:[[22,33],[91,47],[60,90],[10,62]], hint:'Something small may be hiding in the place where our story begins.' },
    timeline: { items:[4,5,6], name:'Timeline', points:[[6,58],[48,12],[36,80]], hint:'A little surprise is tucked somewhere along our story.' },
    next:     { items:[7,8,9], name:'Next Adventures', points:[[12,20],[50,88],[92,62]], hint:'One of our future adventures may be hiding a secret.' },
    future:   { items:[10,11,12], name:'Future', points:[[50,6],[8,45],[92,70]], hint:'Look where the dreams we share are gathered.' },
    letter:   { items:[13,14,15], name:'Letter', points:[[12,15],[88,30],[20,85]], hint:'A quiet surprise may be hiding among our words.' },
    movie:    { items:[16,17,18], name:'Movie', points:[[10,20],[90,25],[50,6]], hint:'There may be more to notice around our little film.' },
    suitcase: { items:[19,20], name:'Suitcase of Memories', points:[[70,15],[80,15]], hint:'Try looking around the things we would pack for a trip.' },
    hundred:  { items:[21], name:'52 Reasons', points:[[88,12]], hint:'A little something may be tucked among the reasons.' }
  };

  /* ---------- the journey: which pages are open ---------- */
  function need_n(r) { return r.n === 'all' ? FK.length : r.n; }
  function unlocked(id) {
    if (DEV) return true;
    var r = C.rules[id]; if (!r) return false;
    if (r.k === 'open' || r.k === 'play') return true;
    if (r.k === 'find') return total() >= need_n(r);
    if (r.k === 'msg') return S.g.length >= need_n(r);
    if (r.k === 'visit') return !!S.v[r.v];
    return false;
  }
  function need(id) {
    var r = C.rules[id];
    if (r.k === 'find') { var k = need_n(r) - total(); return 'Find ' + k + ' more hidden ' + (k === 1 ? 'thing' : 'things') + ' to open this.'; }
    if (r.k === 'msg') return 'Find a hidden message from someone who loves you to open this.';
    if (r.k === 'visit') { var pv = pill(r.v); return 'Open ' + (pv ? pv.title : 'the previous page') + ' first. This one comes last.'; }
    return '';
  }

  /* ---------- modal ---------- */
  function open_(t, html) { $('#mt').textContent = t; $('#mb').innerHTML = html; $('#modal').hidden = false; }
  function close_() { $('#modal').hidden = true; }
  $('.x').onclick = close_;
  $('#modal').onclick = function (e) { if (e.target.id === 'modal') close_(); };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close_(); });

  /* ---------- Explore pills ---------- */
  var host = $('#spots');
  C.pills.forEach(function (p) {
    if (p.hidden) return;
    var d = document.createElement('div');
    d.className = 'spot' + (p.left ? ' l' : ''); d.id = 'sp-' + p.id;
    d.style.left = p.x + '%'; d.style.top = p.y + '%';
    d.innerHTML = '<span class="dot"></span><button class="pl"><i></i><span>' + p.title + '<small></small></span><em>›</em></button>';
    d.querySelector('button').onclick = function () { go(p); };
    host.appendChild(d);
  });
  function paint() {
    $('#cm').textContent = S.g.length; $('#tm').textContent = C.totals.g;
    $('#cg').textContent = C.gifts.filter(function (_, i) { return !!S.v['gift' + i]; }).length;
    $('#tg').textContent = C.gifts.length;
    C.pills.forEach(function (p) {
      if (p.hidden) return;
      var el = $('#sp-' + p.id), u = unlocked(p.id);
      el.classList.toggle('lk', !u);
      el.querySelector('i').textContent = u ? p.icon : '🔒';
      el.querySelector('small').textContent = u ? '' : '(locked)';
    });
    document.querySelectorAll('[data-find]').forEach(function (b) {
      var k = b.dataset.find; b.classList.toggle('got', S[k[0]].indexOf(k) > -1);
    });
    document.querySelectorAll('[data-gift]').forEach(function (b) {
      b.classList.toggle('got', !!S.v['gift' + b.dataset.gift]);
    });
  }

  /* ---------- separate pages with their own address (#/timeline ...) ---------- */
  var cleanups = [];
  function leave() { cleanups.forEach(function (f) { f(); }); cleanups = []; }
  var ctx = { C: C, S: S, save: save, onLeave: function (f) { cleanups.push(f); } };
  function go(p) {
    if (unlocked(p.id)) location.hash = '#/' + p.id;
    else open_(p.title + ' 🔒', '<p>' + need(p.id) + '</p><p style="color:var(--soft)">Hidden things are scattered around the map. The two of us can hint.</p>');
  }
  function addGiftHotspots(id, box) {
    var group = giftPages[id], stage = box.querySelector('.tl-stage');
    if (!group || !stage) return;
    group.items.forEach(function (giftIndex, n) {
      var b = document.createElement('button'), pos = group.points[n];
      b.type = 'button'; b.className = 'hs hid gift-hidden'; b.dataset.gift = giftIndex;
      b.style.setProperty('--glint-delay', (-giftIndex * .37) + 's');
      b.style.left = pos[0] + '%'; b.style.top = pos[1] + '%'; b.style.width = '2.8%'; b.style.height = '4.5%';
      b.setAttribute('aria-label', 'Hidden gift clue ' + (giftIndex + 1));
      b.onclick = function () { showGift(giftIndex); };
      stage.appendChild(b);
    });
  }
  function addMessageHotspots(id, box) {
  var stage = box.querySelector('.tl-stage');
  if (!stage) return;

  Object.keys(C.finds).forEach(function (key) {
    var message = C.finds[key];
    if (message.page !== id) return;

    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'hs hid';
    button.dataset.find = key;
    button.style.left = message.x + '%';
    button.style.top = message.y + '%';
    button.style.width = '3%';
    button.style.height = '5%';
    button.setAttribute('aria-label', message.title);
    stage.appendChild(button);
  });
}
  function route() {
    leave(); clearSay(); $('#hintBtn').hidden = false;
    var id = (location.hash.match(/^#\/([\w-]+)/) || [])[1], p = pill(id);
    crewOn = false; $('#crew').classList.remove('on');
    if (!p || !unlocked(id)) { $('#page').classList.remove('on'); if (id) location.hash = ''; return; }
    $('#stage').classList.add('ex'); setNav('ex');
    $('#ptag').textContent = p.tag; $('#ptitle').textContent = p.title; $('#pdesc').textContent = p.desc;
    var box = $('#pbox'); box.textContent = '';
    $('#page').classList.toggle('full', !!(PAGES[id] && PAGES[id].full)); /* full = the page fills the whole screen */
    if (PAGES[id]) { PAGES[id](box, ctx); addGiftHotspots(id, box); addMessageHotspots(id, box);
 }
    else box.textContent = 'Placeholder. This will be its own full page in the finished site.';
    S.v[id] = 1; save(); paint();
    $('#page').classList.add('on'); $('#page').scrollTop = 0; $('#back').focus();
    crewOn = !!(PAGES[id] && PAGES[id].full); $('#crew').classList.toggle('on', crewOn);
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Tab') document.body.classList.add('kb'); });
  document.addEventListener('mousedown', function () { document.body.classList.remove('kb'); });
  $('#rotX').onclick = function () { $('#rot').hidden = true; };
  $('#back').onclick = function () { location.hash = ''; };
  window.addEventListener('hashchange', route);

  /* ---------- hidden finds ---------- */
  document.addEventListener('click', function (event) {
  var button = event.target.closest('[data-find]');
  if (!button) return;

  var key = button.dataset.find;
  var type = key[0];
  var message = C.finds[key];
  if (!message) return;

  var alreadyFound = S[type].indexOf(key) > -1;
  if (!alreadyFound) {
    S[type].push(key);
    save();
    paint();
  }

  open_(
    message.title,
    '<p>' + message.body.replace(/\n\n/g, '</p><p>') + '</p><p><b>' +
      (alreadyFound
        ? 'You already found this one.'
        : 'Added! ' + S[type].length + ' of ' + C.totals[type] + ' messages collected.') +
    '</b></p>'
  );

  if (S.g.length > 0) {
    var archive = document.createElement('button');
    archive.type = 'button';
    archive.className = 'archive-link';
    archive.textContent = 'Open the message archive';
    archive.onclick = function () {
      close_();
      location.hash = '#/archive';
    };
    $('#mb').appendChild(archive);
  }
});
  function showGift(i) {
    var item = C.gifts[i], key = 'gift' + i;
    if (!item) return;
    open_(S.v[key] ? item.gift : 'A hidden gift riddle', '');
    var body = $('#mb'), prompt = document.createElement('p');
    prompt.textContent = item.riddle; body.appendChild(prompt);
    if (S.v[key]) {
      var found = document.createElement('p'); found.innerHTML = '<b>Gift uncovered:</b> ';
      found.appendChild(document.createTextNode(item.gift)); body.appendChild(found); return;
    }
    var form = document.createElement('form'); form.className = 'gift-answer-form';
    var input = document.createElement('input'); input.type = 'text'; input.autocomplete = 'off'; input.placeholder = 'Your answer'; input.setAttribute('aria-label', 'Answer to gift riddle ' + (i + 1));
    var submit = document.createElement('button'); submit.type = 'submit'; submit.textContent = 'Unlock gift';
    var feedback = document.createElement('p'); feedback.className = 'gift-answer-feedback';
    form.appendChild(input); form.appendChild(submit); body.appendChild(form); body.appendChild(feedback);
    form.onsubmit = function (event) {
      event.preventDefault();
      function clean(value) { return value.trim().toLocaleLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' '); }
      if (clean(input.value) !== clean(item.answer)) { feedback.textContent = 'Not quite. Try another answer.'; input.focus(); return; }
      S.v[key] = 1; save(); paint(); $('#mt').textContent = item.gift;
      body.textContent = 'You uncovered ' + item.gift + '!';
    };
  }
  document.querySelectorAll('[data-gift]').forEach(function (b) {
    var i = Number(b.dataset.gift);
    b.style.setProperty('--glint-delay', (-i * .37) + 's');
    b.onclick = function () { showGift(i); };
  });
  $('#ps').onclick = function () { open_('P.S.', '<p>You are in for a special ride. Look closely at everything.</p>'); };

  /* ---------- the two characters ----------
     Two separate things, never mixed, sharing one speaking channel (starting one stops the other):
       1) click a character -> a short flirty scene between them
       2) tap Hint          -> one hint in a yellow bubble, poetic first, blunt on the second tap */
  var sc = 0, tmr = [], hc = {}, crewOn = false;
  var ALL_B = ['#b1', '#b2', '#cb1', '#cb2'];
  function clearSay() {
    tmr.forEach(clearTimeout); tmr = [];
    ALL_B.forEach(function (s) { $(s).classList.remove('on', 'hint'); });
    pose(1, 'idle'); pose(2, 'idle');
  }
  /* the small companions that stand in the corner of every full page (pictures are set in content.js, "crew") */
  var crew = C.crew || {}, figs = { 1: $('#cf1'), 2: $('#cf2') }, keys = { 1: 'him', 2: 'her' }, pi = { 1: 0, 2: 0 };
  [1, 2].forEach(function (n) {
    var d = crew[keys[n]];
    if (d && d.idle) { figs[n].querySelector('img').src = d.idle; figs[n].hidden = false;
      (d.say || []).concat(d.hint ? [d.hint] : []).forEach(function (u) { new Image().src = u; }); }
  });
  function pose(n, kind, hint) {
    var d = crew[keys[n]], f = figs[n]; if (!d || !d.idle) return;
    var u = d.idle;
    if (kind === 'say') { var s = d.say || []; if (s.length) u = hint && d.hint ? d.hint : s[pi[n]++ % s.length]; }
    f.querySelector('img').src = u; f.classList.toggle('talk', kind === 'say');
  }
  function play(lines, kind) {
    clearSay(); var t = 0, pre = crewOn ? '#cb' : '#b';
    lines.forEach(function (l) {
      tmr.push(setTimeout(function () {
        ALL_B.forEach(function (s) { $(s).classList.remove('on', 'hint'); });
        pose(1, 'idle'); pose(2, 'idle'); pose(l[0], 'say', kind === 'hint');
        var el = $(pre + l[0]); el.textContent = (kind === 'hint' ? '💡 ' : '') + l[1];
        if (kind === 'hint') el.classList.add('hint');
        el.classList.add('on');
      }, t));
      t += 3300;
    });
    tmr.push(setTimeout(clearSay, t + 1200));
  }
  document.querySelectorAll('[data-char]').forEach(function (b) {
    b.onclick = function () { play(C.scenes[sc++ % C.scenes.length], 'banter'); };
  });
  [1, 2].forEach(function (n) { figs[n].onclick = function () { play(C.scenes[sc++ % C.scenes.length], 'banter'); }; });
  $('#hintBtn').onclick = function () {
    var left = FK.filter(function (k) { return S[k[0]].indexOf(k) < 0; });
    if (!left.length) {
      var giftsLeft = C.gifts.map(function (_, i) { return i; }).filter(function (i) { return !S.v['gift' + i]; });
      if (giftsLeft.length) {
        var gi = giftsLeft[0], lvGift = Math.min(hc['gift' + gi] || 0, 1); hc['gift' + gi] = (hc['gift' + gi] || 0) + 1;
        var groupId = Object.keys(giftPages).filter(function (key) { return giftPages[key].items.indexOf(gi) >= 0; })[0];
        var group = groupId && giftPages[groupId];
        if (group) {
          var currentId = (location.hash.match(/^#\/([\w-]+)/) || [])[1] || 'home';
          var currentStage = currentId === 'home' ? $('#stage') : $('#pbox .tl-stage');
          var message = currentId === groupId ?
            (lvGift ? 'I think I saw something shift nearby. Take another look.' : 'Something may be hiding close by. Let’s look around.') :
            (lvGift ? group.hint : 'I have a feeling there is a little secret somewhere in this part of our story.');
          if (currentId === groupId && currentStage) {
            currentStage.classList.remove('searching');
            void currentStage.offsetWidth;
            currentStage.classList.add('searching');
            setTimeout(function () { currentStage.classList.remove('searching'); }, 1900);
          }
          play([[lvGift ? 2 : 1, message]], 'hint');
          return;
        }
      }
      play([[1, 'You found everything hidden here. Explore the other pages for more.']], 'hint'); return;
    }
    var k = left[0], lv = Math.min(hc[k] || 0, 1); hc[k] = (hc[k] || 0) + 1;
    play([[lv ? 2 : 1, C.finds[k].hint[lv]]], 'hint');
  };

  /* ---------- views ---------- */
  function setNav(v) { $('#nH').setAttribute('aria-current', v === 'home'); $('#nE').setAttribute('aria-current', v === 'ex'); }
  function view(v) {
    location.hash = ''; $('#page').classList.remove('on'); $('#crew').classList.remove('on'); crewOn = false;
    $('#stage').classList.toggle('ex', v === 'ex'); setNav(v); clearSay();
  }
  $('#nH').onclick = function () { view('home'); };
  $('#nE').onclick = function () { view('ex'); };

  /* ---------- music: Spotify player + Play/Pause, Next, Shuffle ----------
     Play/Pause works with the playlist alone. Next and Shuffle need the song links in content.js (tracksRaw). */
  var ctl = null, tracks = [], ti = -1, shuf = false, advancing = false;
  $('#musBtn').onclick = function () {
    var p = $('#panel'); p.classList.toggle('open'); this.setAttribute('aria-expanded', p.classList.contains('open'));
  };
  function pickNext() {
    if (shuf && tracks.length > 1) { var n; do { n = Math.floor(Math.random() * tracks.length); } while (n === ti); return n; }
    return (ti + 1) % tracks.length;
  }
  function next() {
    if (!ctl || !tracks.length) return;
    advancing = true; ti = pickNext();
    ctl.loadUri('spotify:track:' + tracks[ti]);
    setTimeout(function () { ctl.play(); }, 900);
    setTimeout(function () { advancing = false; }, 2500);
    $('#trk').textContent = 'Song ' + (ti + 1) + ' of ' + tracks.length;
  }
  $('#pp').onclick = function () {
    if (ctl) ctl.togglePlay(); else $('#trk').textContent = 'The music is still loading, try again in a moment.';
  };
  $('#nx').onclick = next;
  $('#sh').onclick = function () { shuf = !shuf; this.setAttribute('aria-pressed', shuf); };
  function noTracks(off) {
    $('#nx').disabled = off; $('#sh').disabled = off;
    $('#nx').title = $('#sh').title = off ? 'Add song links to tracksRaw in js/content.js to turn this on' : '';
  }
  noTracks(true);
  window.onSpotifyIframeApiReady = function (API) {
    tracks = ((C.tracksRaw || '').match(/track\/([A-Za-z0-9]{10,})/g) || []).map(function (x) { return x.split('/')[1]; });
    noTracks(!tracks.length);
    API.createController($('#spotify'), { uri: 'spotify:playlist:' + C.playlist, width: '100%', height: 152 }, function (c) {
      ctl = c;
      c.addListener('playback_update', function (e) {
        var d = (e && e.data) || {};
        $('#pp').textContent = d.isPaused === false ? '⏸' : '▶';
        /* when a single song ends, move on to the next one */
        if (tracks.length && d.duration && d.isPaused === false && d.position >= d.duration - 1000 && !advancing) {
          advancing = true; setTimeout(next, 1200);
        }
      });
    });
  };

  function resetProgressNow() {
    S.m.length = 0; S.g.length = 0; S.v = {};
    hc = {}; sc = 0;
    close_(); leave(); view('home'); save(); paint();
  }
  function scheduleDailyReset() {
    var remaining = RESET_INTERVAL - (Date.now() - resetAt);
    setTimeout(function () {
      resetAt = Date.now();
      try { localStorage.setItem(RESET_KEY, String(resetAt)); } catch (e) {}
      resetProgressNow();
      scheduleDailyReset();
    }, Math.max(1000, remaining));
  }

  /* ---------- start ---------- */
  paint(); route(); scheduleDailyReset();
})();
