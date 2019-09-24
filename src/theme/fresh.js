define(function(require, exports, module) {
	var kity = require('../core/kity');
	var theme = require('../core/theme');
	var r = kity
		, o = theme;
	function a(t, e, n) {
		return r.Color.createHSL(t, e, n)
	}
	function s(t, e) {
		return {
			background: "#fbfbfb",
			"root-color": "white",
			"root-background": a(t, 37, 60),
			"root-stroke": a(t, 37, 60),
			"root-font-size": 16,
			"root-padding": e ? [6, 12] : [12, 24],
			"root-margin": e ? 10 : [30, 100],
			"root-radius": 5,
			"root-space": 10,
			"main-color": "black",
			"main-background": a(t, 33, 95),
			"main-stroke": a(t, 37, 60),
			"main-stroke-width": 1,
			"main-font-size": 14,
			"main-padding": [6, 20],
			"main-margin": e ? 8 : 20,
			"main-radius": 3,
			"main-space": 5,
			"sub-color": "black",
			"sub-background": "transparent",
			"sub-stroke": "none",
			"sub-font-size": 12,
			"sub-padding": e ? [3, 5] : [5, 10],
			"sub-margin": e ? [4, 8] : [15, 20],
			"sub-radius": 5,
			"sub-space": 5,
			"connect-color": a(t, 37, 60),
			"connect-width": 1,
			"connect-radius": 5,
			"selected-stroke": a(t, 26, 30),
			"selected-stroke-width": "3",
			"blur-selected-stroke": a(t, 10, 60),
			"marquee-background": a(t, 100, 80).set("a", .1),
			"marquee-stroke": a(t, 37, 60),
			"drop-hint-color": a(t, 26, 35),
			"drop-hint-width": 5,
			"order-hint-area-color": a(t, 100, 30).set("a", .5),
			"order-hint-path-color": a(t, 100, 25),
			"order-hint-path-width": 1,
			"text-selection-color": a(t, 100, 20),
			"line-height": 1.5
		}
	}
	var c, l = {
		red: 0,
		soil: 25,
		green: 122,
		blue: 204,
		purple: 246,
		pink: 334
	};
	for (c in l)
		o.register("fresh-" + c, s(l[c])),
			o.register("fresh-" + c + "-compat", s(l[c], !0))
	//
	// function hsl(h, s, l) {
	// 	return kity.Color.createHSL(h, s, l);
	// }
	//
	// function generate(h, compat) {
	// 	return {
	// 		'background': '#fbfbfb',
	//
	// 		'root-color': 'white',
	// 		'root-background': hsl(h, 37, 60),
	// 		'root-stroke': hsl(h, 37, 60),
	// 		'root-font-size': 16,
	// 		'root-padding': compat ? [6, 12] : [12, 24],
	// 		'root-margin': compat ? 10 : [30, 100],
	// 		'root-radius': 5,
	// 		'root-space': 10,
	//
	// 		'main-color': 'black',
	// 		'main-background': hsl(h, 33, 95),
	// 		'main-stroke': hsl(h, 37, 60),
	// 		'main-stroke-width': 1,
	// 		'main-font-size': 14,
	// 		'main-padding': [6, 20],
	// 		'main-margin': [8, 20],
	// 		'main-radius': 3,
	// 		'main-space': 5,
	//
	// 		'sub-color': 'black',
	// 		'sub-background': 'transparent',
	// 		'sub-stroke': 'none',
	// 		'sub-font-size': 12,
	// 		'sub-padding': [5, 0],
	// 		'sub-margin': [2, 10],
	// 		'sub-radius': 5,
	// 		'sub-space': 5,
	//
	// 		'connect-color': hsl(h, 37, 60),
	// 		'connect-width': 1,
	// 		'connect-radius': 5,
	//
	// 		'selected-stroke': hsl(h, 26, 30),
	// 		'selected-stroke-width': '3',
	// 		'blur-selected-stroke': hsl(h, 10, 60),
	//
	// 		'marquee-background': hsl(h, 100, 80).set('a', 0.1),
	// 		'marquee-stroke': hsl(h, 37, 60),
	//
	// 		'drop-hint-color': hsl(h, 26, 35),
	// 		'drop-hint-width': 5,
	//
	// 		'order-hint-area-color': hsl(h, 100, 30).set('a', 0.5),
	// 		'order-hint-path-color': hsl(h, 100, 25),
	// 		'order-hint-path-width': 1,
	//
	// 		'text-selection-color': hsl(h, 100, 20),
	// 		'line-height':1.5
	// 	};
	// }
	//
	// var plans = {
	// 	red: 0,
	// 	soil: 25,
	// 	green: 122,
	// 	blue: 204,
	// 	purple: 246,
	// 	pink: 334
	// };
	// var name;
	// for (name in plans) {
	// 	theme.register('fresh-' + name, generate(plans[name]));
	// 	theme.register('fresh-' + name + '-compat', generate(plans[name], true));
	// }
	
});
