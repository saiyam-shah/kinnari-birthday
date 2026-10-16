/* Page: Final surprise. Plays your YouTube video once youtubeId is set in content.js. */
window.PAGES = window.PAGES || {};
PAGES.fin = function (box, ctx) {
  var id = (ctx.C.youtubeId || '').replace(/[^\w-]/g, '');
  if (!id) { box.textContent = 'Placeholder: your video plays here. Set youtubeId in js/content.js.'; return; }
  box.innerHTML = '<div style="position:relative;padding-top:56.25%"><iframe ' +
    'src="https://www.youtube-nocookie.com/embed/' + id + '" title="A video, for you" ' +
    'style="position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:14px" ' +
    'allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>';
};
