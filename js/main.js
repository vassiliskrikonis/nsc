// var svg_elem = SVG.get('Layer_2');
// svg_elem.fill('red');

var handDim = {
	width: 560.996,
	height: 488.063
};
var dDim = {
	width: 3369.5,
	height: 2805,
	x: -1746,
	y: -1246.5
}
var strokeFreq = 700;
var canvas = $('#canvas');
canvas.height($(window).height());

var moving = null;
var started_animating = false;

if (SVG.supported) {
	var draw = SVG('canvas');
	// draw.viewbox(0, 488.063, 560.996, 488.063);
	draw.viewbox(0, 0, 560.996, 488.063);
	var hand = draw.group();
	hand.polygon('216.368,225.461 317.938,102.104 484.438,-110.666 672.957,-110.666 391.938,167.104 328.938,223.604 290.438,261.104 261.747,295.676').fill('black');
	var open_palm = hand.polygon('261.747,295.676 247.026,333.045 229.946,367.301 216.386,390.205 195.698,415.789 172.917,454.289 123.325,488.063 121.126,470.443 143.948,452.967 163.297,423.818 175.701,393.354 133.373,432.463 102.012,461.563 60.89,485.211 57.168,479.033 57.464,472.541 57.875,463.551 89.621,436.971 106.56,427.734 140.491,375.227 137.268,369.074 95.941,397.219 78.412,408.43 51.252,433.217 13.923,450.531 14.996,427.057 29.62,413.709 47.218,400.998 113.161,348.953 114.048,340.484 115.321,334.537 79.037,350.898 52.628,370.213 36.71,378.996 2.222,388.934 0,371.814 29.905,352.658 39.375,342.58 58.925,330.961 77.409,320.793 113.08,306.906 144.599,274.311 146.486,265.887 121.851,268.266 84.571,273.57 57.553,273.338 69.363,255.857 96.722,248.599 125.92,244.928 153.623,230.176 168.29,226.842 193.763,228.004 206.977,223.604 233.287,228.809').fill('black');
	var dick = draw.polygon('-1709,-1246.5 1623.5,1500.5 1582.5,1558.5 -1746,-1197.5').fill('black');
	console.log('starting')
	// dick.move(dDim.x, dDim.height);
	dick.move(dDim.x, dDim.y+handDim.height); // basically viewbox is the one that scales to window, so every calculation of transformation is based on 1:1 viewbox size.
	hand.move(0, -handDim.height);
	dick.animate(4000, '<', 0).move(dDim.x,dDim.y).during(function(pos) {
		// console.log(pos);
		var randColor = {
			r: Math.ceil(Math.random()*255),
			g: Math.ceil(Math.random()*255),
			b: Math.ceil(Math.random()*255),
		};
		canvas.css('background', 'rgb('+randColor.r+', '+randColor.g+', '+randColor.b+')');
	});
	hand.animate(2000, '>', 2000).move(0, 0).after(function() {
		open_palm.remove();
		hand.polygon('175.701,393.354 151,405.5 121,401 118.5,361 125.5,333.005 146,339.5 140.491,375.227 137.268,369.074 121.5,381 104.5,384.5 92,374.5 89.5,352 100,322 116.5,319 107,341.5 109.132,350.603 113.161,348.953 114.048,340.484 115.321,334.537 104,339 86.097,347.715 75,350 56,349 54,326 58.5,305.5 69.5,290 88,289 80,308.5 80.27,320.132 86.487,317.259 103.304,310.712 113.08,306.906 144.599,274.311 146.486,265.887 121.851,268.266 84.571,273.57 57.553,273.338 69.363,255.857 96.722,248.599 125.92,244.928 153.623,230.176 168.29,226.842 193.763,228.004 206.977,223.604 233.287,228.809 261.747,295.676 247.026,333.045 229.946,367.301 216.386,390.205 195.698,415.789 172.5,424 157.873,422 157.873,386.5 157.873,347.5 171,336 183,344 176.5,360.5');
		//only on webkit
		SVG.on(window, 'mousewheel', onScroll);
		//moz, ie 9+
		SVG.on(window, 'wheel', onScroll);
	});	
	
	// draw.animate().viewbox(0, 0, 560.996, 488.063);
} else {
	alert('SVG not supported');
}

function onScroll(ev) {
	console.log('scroll wheel event fired!');
	console.log(ev);
	if(ev.wheelDelta < 0 || ev.deltaY > 0) {
		// wheel down
		if(moving != 'up') {
			hand.animate(strokeFreq).move(-0.2*handDim.width, -0.2*handDim.height);
			moving = 'up';
			strokeFreq -= 10;
		}
	}	
	else {
		// wheel up
		if(moving != 'down') {
			hand.animate(strokeFreq).move(0, 0);
			moving = 'down';
			strokeFreq -= 10;
		}
		
	}
	if(strokeFreq <= 0) {
		//cum
		var rect = draw.rect(dDim.width, dDim.height).fill('white');
		rect.move(dDim.x, -dDim.height).animate(1000).move(dDim.x,dDim.y);
	}
}
