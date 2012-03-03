var list;
var at = new Array();

function loadedGist(id, gist) {
  list.each(function (idx, e) {
  	var me = $(e);
  	var mid = me.attr('data-id');
  	if (mid != id) return;
  	var file = me.attr('data-file');
  	if (gist[file] == undefined) return;
  	me.removeClass('gc').addClass('gist').empty().append($('<div></div>').addClass('gist-file').append(gist[file].children().first()));
  });
}

function loadGists() {
  for (var i in at) {
    var id = at[i];
    $.ajax({
      url: 'https://gist.github.com/'+id+'.json',
      dataType: 'jsonp',
      success: function (gist) {
        var a = new Array();
        var d = $(gist.div);
        $('div.gist-file', d).each(function(idx, e){
        	a[gist.files[idx]] = $(e);
        });
        loadCss(gist.stylesheet);
        loadedGist(id, a);
      }
    });
  }
}

var lcss = new Array();
function loadCss(url) {
  if (lcss[url] != undefined) return;
  lcss[url] = url;
  $("head").append($("<link/>").attr({
      rel:  "stylesheet",
      type: "text/css",
      href: url
    })
  );
}

$(function() {
  list = $('div.gc');
  list.html('<pre>Loading sourcecode gist...</pre>');
  list.each(function (idx, e) {
  	var me = $(e);
  	var id = me.attr('data-id');
  	var sid = "i"+id;
  	if (at[sid] == undefined) {
  	  at[sid] = id;
  	}
  });
  loadGists();
});