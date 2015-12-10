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

	var tl = new TimelineMax({repeat:4, repeatDelay:0, });
	tl.set('.scene1', {visibility: 'visible'}); 
	tl.to([".scene1"], 3, {scale: 1.03});
	tl.set('.scene3', {delay: -0.25, visibility: 'visible'});
	tl.to([".scene3"], 4, {delay: -0.25, scale: 1.05});
	tl.set('.scene4', {delay: -0.25, visibility: 'visible'});
	tl.to([".scene4"], 4, {delay: -0.25, scale: 1.05});
	tl.set('.scene8', {delay: -0.25, visibility: 'visible'});
	tl.to([".scene8"], 3, {delay: -0.25, scale: 1.03});

}







ready(init);