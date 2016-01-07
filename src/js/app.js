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
	intro();
}


function intro() {
	TweenMax.to('.movie__intro__title',1,{opacity: 1});
	TweenMax.to('.movie__intro__loader',1,{delay: 1,opacity: 1,yoyo: true, repeat:-1});
}

function movieReady() {
	TweenMax.killTweensOf('.movie__intro__title');
	TweenMax.killTweensOf('.movie__intro__loader');
	document.getElementById('movie__intro__loader').innerHTML = "click to start";
	TweenMax.to(['.movie__intro__title','.movie__intro__loader'], 1, {opacity: 1});
	document.getElementById('movie__intro').onclick=function(){
		playAudio();
		movie();
	}
}


var audioTrack = document.createElement('audio');
audioTrack.setAttribute('src', 'audio/let-the-mystery-be.mp3');
audioTrack.setAttribute('type', 'audio/mpeg');
audioTrack.setAttribute('preload', 'none');

function playAudio() {
	audioTrack.play();
}

function killAudio() {
	audioTrack.pause();
}


function movie() {

	

	var tl = new TimelineMax(/*{repeat:4, repeatDelay:0}*/);

	tl.to(['.movie__intro__loader'], 3, {x: -80, opacity: 0, ease: Expo.easeInOut});
	tl.to(['.movie__intro__title'], 3, {x: 80, opacity: 0, ease: Expo.easeInOut},'-=3');

	tl.set('.scene1', {display: 'block',opacity: 0});
	tl.to(['.scene1'], 1, {opacity: 1, ease: Linear.easeNone });
	tl.to(['.scene1'], 4, {scale: 1.05, ease: Linear.easeNone },'-=1');

	tl.set('.scene3', {display: 'block'});
	tl.set('.scene1', {display: 'none'});
	tl.to(['.scene3'], 4, {scale: 1.05, ease: Linear.easeNone});

	tl.set('.scene4', {display: 'block'});
	tl.set('.scene3', {display: 'none'});
	tl.to(['.scene4'], 4, {scale: 1.05, ease: Linear.easeNone});

	tl.set('.scene5', {display: 'block'});
	tl.set('.scene4', {display: 'none'});
	tl.to(['.scene5'], 4, {scale: 1.05, ease: Linear.easeNone});

	tl.set('.scene6', {display: 'block'});
	tl.set('.scene5', {display: 'none'});
	tl.set(['.scene6__figure1','.scene6__figure2','.scene6__figure3'], {opacity: 0});
	tl.to(['.scene6'], 4, {scale: 1.05, ease: Linear.easeNone});

	tl.staggerTo(['.scene6__figure1','.scene6__figure2','.scene6__figure3'], 2, {opacity:1}, 1, "-=4");

	tl.set('.scene8', {display: 'block'});
	tl.set('.scene6', {display: 'none'});
	tl.to(['.scene8'], 4, {scale: 1.05, ease: Linear.easeNone});
	tl.to(['.scene8'], 2, {opacity: 0, ease: Linear.easeNone});

	tl.set(['.movie__intro__title'], {x: 0, y: -60});
	tl.to(['.movie__intro__title'], 1, {y: 0, opacity: 1});

	tl.to(audioTrack,5,{volume: 0, ease: Linear.easeNone});

	tl.call(killAudio);

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
	'img/scene1.jpg','img/scene3.jpg','img/scene4.jpg',
	'img/scene5.jpg','img/scene6.jpg','img/scene6-figure.jpg','img/scene8.jpg',
	'img/animated-ocean.gif','img/animated-sky.gif','img/animated-borealis.gif'
	]).then(function(imgs) {
    // all images are loaded now and in the array imgs
    //alert("loaded");
    movieReady();
}, function(errImg) {
    // at least one image failed to load
    //alert("errored");
});



ready(init);