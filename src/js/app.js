/*$(document).ready(function() {
	console.log ('app js loaded');
});*/


function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function init() {
	console.log ('app js loaded');
	boomsvgloader.load('icons/sprite.svg');
	movie();
}


function movie() {


var tl = new TimelineMax({repeat:10, repeatDelay:4, });
tl.to([".scene"], 6, {scale: 1.1});

}







ready(init);