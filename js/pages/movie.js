/* Page: Movie. Your video plays on the screen of the open-air cinema.
   Set the video (movie.youtubeId) and the screen's position in content.js. */
window.PAGES = window.PAGES || {};
PAGES.movie = function (box, ctx) {
  var M = ctx.C.movie;
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  var wrap = el('div', 'tl'), stage = el('div', 'tl-stage');
  stage.style.setProperty('--r', M.ratio);
  var img = el('img'); img.src = M.image; img.alt = 'A tiny open-air cinema on a sunset terrace, a golden retriever puppy watching the screen';
  stage.appendChild(img);

  var scr = el('div', 'mv-screen');
  scr.style.left = M.screen.x + '%'; scr.style.top = M.screen.y + '%'; scr.style.width = M.screen.w + '%';
  var id = (M.youtubeId || '').replace(/[^\w-]/g, '');
  var card = el('div', 'mv-card');
  card.appendChild(el('h2', null, M.title));
  if (id) {
    var play = el('button', 'mv-play', '▶  Play');
    play.setAttribute('aria-label', 'Play the movie');
    play.onclick = function () {
      scr.textContent = '';
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      f.title = M.title;
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      scr.appendChild(f);
    };
    card.appendChild(el('p', null, M.caption)); card.appendChild(play);
  } else {
    card.appendChild(el('p', null, 'Coming soon. Your video plays here once movie.youtubeId is set in js/content.js.'));
  }
  scr.appendChild(card); stage.appendChild(scr); wrap.appendChild(stage); box.appendChild(wrap);
};
PAGES.movie.full = true;
