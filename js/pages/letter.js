/* Page: Letter. The sealed envelope on the desk opens into your letter.
   The words live in content.js under "letter". */
window.PAGES = window.PAGES || {};
PAGES.letter = function (box, ctx) {
  var L = ctx.C.letter;
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  var wrap = el('div', 'tl'), stage = el('div', 'tl-stage');
  stage.style.setProperty('--r', L.ratio);
  var img = el('img'); img.src = L.image; img.alt = 'A writing desk on a terrace at sunset with an open notebook, a pen, a sealed envelope and a sleeping golden retriever puppy';
  stage.appendChild(img);

  var env = el('button', 'lt-env');
  env.style.left = L.envelope.x + '%'; env.style.top = L.envelope.y + '%';
  env.style.width = L.envelope.w + '%'; env.style.height = L.envelope.h + '%';
  env.setAttribute('aria-label', 'Open the letter');
  env.appendChild(el('span', 'lt-hint', 'Open the letter'));
  stage.appendChild(env);

  var paper = el('div', 'lt-paper'); paper.hidden = true;
  paper.setAttribute('role', 'dialog'); paper.setAttribute('aria-label', 'Your letter');
  var inner = el('div', 'lt-inner');
  inner.appendChild(el('h2', null, L.greeting));
  L.paragraphs.forEach(function (t) { inner.appendChild(el('p', null, t)); });
  inner.appendChild(el('p', 'lt-sign', L.sign));
  var close = el('button', 'lt-close', 'Fold it back up');
  paper.appendChild(inner); paper.appendChild(close);
  stage.appendChild(paper);

  env.onclick = function () { paper.hidden = false; env.hidden = true; close.focus(); };
  close.onclick = function () { paper.hidden = true; env.hidden = false; env.focus(); };
  wrap.appendChild(stage); box.appendChild(wrap);
};
PAGES.letter.full = true;
