/* Page: Kinnari Archive. Shows the hidden messages she has found so far. */
window.PAGES = window.PAGES || {};
PAGES.archive = function (box, ctx) {
  var C = ctx.C, S = ctx.S;
  var html = '<b>' + S.g.length + ' of ' + C.totals.g + ' messages found so far.</b>';
  if (S.g.length) {
    html += '<ul style="margin:12px 0 0;padding-left:20px;line-height:1.7">' +
      S.g.map(function (k) { var f = C.finds[k]; return f ? '<li>' + f.title + ' ' + f.body + '</li>' : ''; }).join('') + '</ul>';
  } else {
    html += '<br>Each one is hidden somewhere on this site.';
  }
  box.innerHTML = html;
};
