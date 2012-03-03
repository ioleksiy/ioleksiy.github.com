jQuery.fn.sortElements = (function(){
 
    var sort = [].sort;
 
    return function(comparator, getSortable) {
 
        getSortable = getSortable || function(){return this;};
 
        var placements = this.map(function(){
 
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
 
                // Since the element itself will change position, we have
                // to have some way of storing its original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
 
            return function() {
 
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
 
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
 
            };
 
        });
 
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
 
    };
 
})();

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
  $('ul.tag_box').each(function (idx, e){
    $(e).children().sortElements(function(a, b){
    	return $(a).text() > $(b).text() ? 1 : -1;
	});
  });
  $('div.tag_box_data').sortElements(function(a, b){
   	return $(a).children().first().children().first().text() > $(b).children().first().children().first().text() ? 1 : -1;
  });
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