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
	movie();
}


function movie() {

	var tl = new TimelineMax({repeat:4, repeatDelay:0});
	tl.set('.scene1', {visibility: 'visible'}); 
	tl.to([".scene1"], 3, {scale: 1.03, ease: Linear.easeNone });
	tl.set('.scene3', {delay: -1, visibility: 'visible'});
	tl.to([".scene3"], 4, {delay: -1, scale: 1.05, ease: Linear.easeNone});
	tl.set('.scene4', {delay: -1, visibility: 'visible'});
	tl.to([".scene4"], 4, {delay: -1, scale: 1.05, ease: Linear.easeNone});
	tl.set('.scene8', {delay: -1, visibility: 'visible'});
	tl.to([".scene8"], 3, {delay: -1, scale: 1.03, ease: Linear.easeNone});

}




ready(init);