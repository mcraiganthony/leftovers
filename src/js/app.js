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
	//movie();
}


function movie() {

	var tl = new TimelineMax(/*{repeat:4, repeatDelay:0}*/);

	tl.set('.scene1', {display: 'block',opacity: 0});
	tl.to([".scene1"], 1, {opacity: 1, ease: Linear.easeNone });
	tl.to([".scene1"], 4, {scale: 1.05, ease: Linear.easeNone },"-=1");

	tl.set('.scene3', {display: 'block'});
	tl.set('.scene1', {display: 'none'});
	tl.to([".scene3"], 4, {scale: 1.05, ease: Linear.easeNone});

	tl.set('.scene4', {display: 'block'});
	tl.set('.scene3', {display: 'none'});
	tl.to([".scene4"], 4, {scale: 1.05, ease: Linear.easeNone});

	tl.set('.scene5', {display: 'block'});
	tl.set('.scene4', {display: 'none'});
	tl.to([".scene5"], 4, {scale: 1.05, ease: Linear.easeNone});

	tl.set('.scene8', {display: 'block'});
	tl.set('.scene5', {display: 'none'});
	tl.to([".scene8"], 4, {scale: 1.05, ease: Linear.easeNone});
	tl.to([".scene8"], 2, {opacity: 0, ease: Linear.easeNone});

}



function preloadImages(srcs) {
    function loadImage(src) {
        return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
                resolve(img);
            };
            img.onerror = img.onabort = function() {
                reject(src);
            };
            img.src = src;
        });
    }
    var promises = [];
    for (var i = 0; i < srcs.length; i++) {
        promises.push(loadImage(srcs[i]));
    }
    return Promise.all(promises);
}

preloadImages([
	"img/scene1.jpg","img/scene3.jpg","img/scene4.jpg",
	"img/scene5.jpg","img/scene8.jpg","img/animated-ocean.gif",
	"img/animated-sky.gif","img/animated-borealis.gif"
	]).then(function(imgs) {
    // all images are loaded now and in the array imgs
    //alert("loaded");
    movie();
}, function(errImg) {
    // at least one image failed to load
    //alert("errored");
});



ready(init);