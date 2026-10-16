/* The logic. You normally do not need to edit this file:
   words, dates and settings are in content.js, and each page lives in js/pages/. */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var C = window.SITE;
  var PAGES = window.PAGES = window.PAGES || {};

  /* ---------- progress (saved in her browser) ----------
     Developer switches, add to the address:  ?unlock  opens every page,  ?reset  clears progress */
  var KEY = 'kb2', S = { m: [], g: [], v: {} };
  var q = new URLSearchParams(location.search), DEV = q.has('unlock');
  if (q.has('reset')) { try { localStorage.removeItem(KEY); } catch (e) {} }
  try {
    var s0 = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (s0 && s0.m && s0.g) S = { m: s0.m, g: s0.g, v: s0.v || {} };
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function total() { return S.m.length + S.g.length; }
  var FK = Object.keys(C.finds);
  function pill(id) { return C.pills.filter(function (p) { return p.id === id; })[0]; }

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
    var d = document.createElement('div');
    d.className = 'spot' + (p.left ? ' l' : ''); d.id = 'sp-' + p.id;
    d.style.left = p.x + '%'; d.style.top = p.y + '%';
    d.innerHTML = '<span class="dot"></span><button class="pl"><i></i><span>' + p.title + '<small></small></span><em>›</em></button>';
    d.querySelector('button').onclick = function () { go(p); };
    host.appendChild(d);
  });
  function paint() {
    $('#cm').textContent = S.m.length; $('#cg').textContent = S.g.length;
    C.pills.forEach(function (p) {
      var el = $('#sp-' + p.id), u = unlocked(p.id);
      el.classList.toggle('lk', !u);
      el.querySelector('i').textContent = u ? p.icon : '🔒';
      el.querySelector('small').textContent = u ? '' : '(locked)';
    });
    document.querySelectorAll('[data-find]').forEach(function (b) {
      var k = b.dataset.find; b.classList.toggle('got', S[k[0]].indexOf(k) > -1);
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
  function route() {
    leave(); clearSay(); $('#hintBtn').hidden = false;
    var id = (location.hash.match(/^#\/(\w+)/) || [])[1], p = pill(id);
    crewOn = false; $('#crew').classList.remove('on');
    if (!p || !unlocked(id)) { $('#page').classList.remove('on'); if (id) location.hash = ''; return; }
    $('#stage').classList.add('ex'); setNav('ex'); $('#hintBtn').hidden = true;
    $('#ptag').textContent = p.tag; $('#ptitle').textContent = p.title; $('#pdesc').textContent = p.desc;
    var box = $('#pbox'); box.textContent = '';
    $('#page').classList.toggle('full', !!(PAGES[id] && PAGES[id].full)); /* full = the page fills the whole screen */
    if (PAGES[id]) PAGES[id](box, ctx);
    else box.textContent = 'Placeholder. This will be its own full page in the finished site.';
    S.v[id] = 1; save(); paint();
    $('#page').classList.add('on'); $('#page').scrollTop = 0; $('#back').focus();
    crewOn = !!(PAGES[id] && PAGES[id].full); $('#crew').classList.toggle('on', crewOn);
  }
  $('#back').onclick = function () { location.hash = ''; };
  window.addEventListener('hashchange', route);

  /* ---------- hidden finds ---------- */
  document.querySelectorAll('[data-find]').forEach(function (b) {
    b.onclick = function () {
      var k = b.dataset.find, t = k[0], c = C.finds[k], again = S[t].indexOf(k) > -1;
      if (!c) return;
      if (!again) { S[t].push(k); save(); paint(); }
      open_(c.title, '<p>' + c.body + '</p><p><b>' + (again ? 'You already found this one.' :
        'Added! ' + S[t].length + ' of ' + C.totals[t] + ' ' + (t === 'm' ? 'memories' : 'messages') + ' collected.') + '</b></p>');
    };
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
    if (!left.length) { play([[1, 'You found everything on this screen. Peek at the other pages, new doors may have opened.']], 'hint'); return; }
    var k = left[0], lv = Math.min(hc[k] || 0, 1); hc[k] = (hc[k] || 0) + 1;
    play([[lv ? 2 : 1, C.finds[k].hint[lv]]], 'hint');
  };

  /* ---------- views ---------- */
  function setNav(v) { $('#nH').setAttribute('aria-current', v === 'home'); $('#nE').setAttribute('aria-current', v === 'ex'); }
  function view(v) {
    location.hash = ''; $('#page').classList.remove('on');
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

  /* ---------- start ---------- */
  $('#tm').textContent = C.totals.m; $('#tg').textContent = C.totals.g;
  paint(); route();
})();
