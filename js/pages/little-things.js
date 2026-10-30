/* The Little Things: eight envelopes on the desk, each opens one note.
   Notes live in content.js (littleThings); envelope positions in littleThingsBackdrop.envelopes. */
window.PAGES = window.PAGES || {};
PAGES['little-things'] = function (box, ctx) {
  var B = ctx.C.littleThingsBackdrop, notes = ctx.C.littleThings;
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }
  var wrap = el('div', 'tl'), stage = el('div', 'tl-stage');
  stage.style.setProperty('--r', B.ratio);
  var image = el('img'); image.src = B.image; image.alt = 'A warm desk at sunset with a window, flowers and a cup of tea';
  image.onerror = function () { if (image.src.indexOf(B.fallback) < 0) image.src = B.fallback; };
  stage.appendChild(image);

  var paper = el('div', 'lt-paper lt-note'); paper.hidden = true;
  paper.setAttribute('role', 'dialog'); paper.setAttribute('aria-label', 'A little thing');
  var inner = el('div', 'lt-inner'), count = el('div', 'lt-num'), line = el('p', 'lt-line');
  inner.appendChild(count); inner.appendChild(line);
  var close = el('button', 'lt-close', 'Fold it back up');
  paper.appendChild(inner); paper.appendChild(close); stage.appendChild(paper);

  var opened = {}, current = null, btns = [];
  function refreshHint() { hint.textContent = Object.keys(opened).length + ' of ' + notes.length + ' opened'; }
  B.envelopes.forEach(function (pos, i) {
    if (!notes[i]) return;
    var b = el('button', 'lt-e');
    b.style.left = pos.x + '%'; b.style.top = pos.y + '%'; b.style.transform = 'rotate(' + (pos.r || 0) + 'deg)';
    b.style.animationDelay = (i * 0.25) + 's';
    b.setAttribute('aria-label', 'Open little thing ' + (i + 1));
    b.appendChild(el('span', 'lt-seal', '♥'));
    b.onclick = function () {
      current = b; opened[i] = 1; b.classList.add('read'); refreshHint();
      count.textContent = 'Little thing ' + (i + 1) + ' of ' + notes.length;
      line.textContent = notes[i]; paper.hidden = false; close.focus();
    };
    stage.appendChild(b); btns.push(b);
  });
  var hint = el('div', 'lt-tally'); stage.appendChild(hint); refreshHint();
  close.onclick = function () { paper.hidden = true; if (current) current.focus(); };
  wrap.appendChild(stage); box.appendChild(wrap);
};
PAGES['little-things'].full = true;
