window.PAGES = window.PAGES || {};

PAGES.archive = function (box, ctx) {
  var A = ctx.C.archive;
  var S = ctx.S;

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  var wrap = el('div', 'tl');
  var stage = el('div', 'tl-stage');
  var panel = el('div', 'tl-card ar-card');
  var image = el('img');

  stage.style.setProperty('--r', A.ratio);
  image.src = A.image;
  image.alt = 'Decorative background for the message archive';
  stage.appendChild(image);

  panel.appendChild(el('h2', null, 'Message Archive'));
  panel.appendChild(el('p', null, S.g.length + ' of ' + ctx.C.totals.g + ' messages found'));

  S.g.forEach(function (key) {
    var message = ctx.C.finds[key];
    if (!message) return;

    var entry = el('article', 'ar-message');
    entry.appendChild(el('h3', null, message.title));

    String(message.body || '').split(/\n\s*\n/).forEach(function (paragraph) {
      if (paragraph.trim()) entry.appendChild(el('p', null, paragraph));
    });

    panel.appendChild(entry);
  });

  stage.appendChild(panel);
  wrap.appendChild(stage);
  box.appendChild(wrap);
};

PAGES.archive.full = true;