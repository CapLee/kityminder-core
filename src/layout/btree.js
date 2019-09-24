define(function(require, exports, module) {
    var kity = require('../core/kity');
    var Layout = require('../core/layout');

    ['left', 'right', 'top', 'bottom'].forEach(registerLayoutForDirection);

    function registerLayoutForDirection(name) {

        var axis = (name == 'left' || name == 'right') ? 'x' : 'y';
        var dir = (name == 'left' || name == 'top') ? -1 : 1;

        var oppsite = {
            'left': 'right',
            'right': 'left',
            'top': 'bottom',
            'bottom': 'top',
            'x': 'y',
            'y': 'x'
        };

        function getOrderHint(node) {
            var hint = [];
            var box = node.getLayoutBox();
            var offset = 5;

            if (axis == 'x') {
                hint.push({
                    type: 'up',
                    node: node,
                    area: new kity.Box({
                        x: box.x,
                        y: box.top - node.getStyle('margin-top') - offset,
                        width: box.width,
                        height: node.getStyle('margin-top')
                    }),
                    path: ['M', box.x, box.top - offset, 'L', box.right, box.top - offset]
                });

                hint.push({
                    type: 'down',
                    node: node,
                    area: new kity.Box({
                        x: box.x,
                        y: box.bottom + offset,
                        width: box.width,
                        height: node.getStyle('margin-bottom')
                    }),
                    path: ['M', box.x, box.bottom + offset, 'L', box.right, box.bottom + offset]
                });
            } else {
                hint.push({
                    type: 'up',
                    node: node,
                    area: new kity.Box({
                        x: box.left - node.getStyle('margin-left') - offset,
                        y: box.top,
                        width: node.getStyle('margin-left'),
                        height: box.height
                    }),
                    path: ['M', box.left - offset, box.top, 'L', box.left - offset, box.bottom]
                });

                hint.push({
                    type: 'down',
                    node: node,
                    area: new kity.Box({
                        x: box.right + offset,
                        y: box.top,
                        width: node.getStyle('margin-right'),
                        height: box.height
                    }),
                    path: ['M', box.right + offset, box.top, 'L', box.right + offset, box.bottom]
                });
            }
            return hint;
        }

        Layout.register(name, kity.createClass({

            base: Layout,

            doLayout: function(parent, children) {

                var pbox = parent.getContentBox();

                if (axis == 'x') {
                    parent.setVertexOut(new kity.Point(pbox[name], pbox.cy));
                    parent.setLayoutVectorOut(new kity.Vector(dir, 0));
                } else {
                    parent.setVertexOut(new kity.Point(pbox.cx, pbox[name]));
                    parent.setLayoutVectorOut(new kity.Vector(0, dir));
                }

                if (!children.length) {
                    return false;
                }

                children.forEach(function(child) {
                    var cbox = child.getContentBox();
                    child.setLayoutTransform(new kity.Matrix());

                    if (axis == 'x') {
                        child.setVertexIn(new kity.Point(cbox[oppsite[name]], cbox.cy));
                        child.setLayoutVectorIn(new kity.Vector(dir, 0));
                    } else {
                        child.setVertexIn(new kity.Point(cbox.cx, cbox[oppsite[name]]));
                        child.setLayoutVectorIn(new kity.Vector(0, dir));
                    }
                });

                this.align(children, oppsite[name]);
                this.stack(children, oppsite[axis]);

                var bbox = this.getBranchBox(children);
                var xAdjust = 0, yAdjust = 0;

                if (axis == 'x') {
                    xAdjust = pbox[name];
                    xAdjust += dir * parent.getStyle('margin-' + name);
                    xAdjust += dir * children[0].getStyle('margin-' + oppsite[name]);

                    yAdjust = pbox.bottom;
                    yAdjust -= pbox.height / 2;
                    yAdjust -= bbox.height / 2;
                    yAdjust -= bbox.y;
                } else {
                    xAdjust = pbox.right;
                    xAdjust -= pbox.width / 2;
                    xAdjust -= bbox.width / 2;
                    xAdjust -= bbox.x;

                    yAdjust = pbox[name];
                    yAdjust += dir * parent.getStyle('margin-' + name);
                    yAdjust += dir * children[0].getStyle('margin-' + oppsite[name]);
                }

                this.move(children, xAdjust, yAdjust);
            },

            getOrderHint: getOrderHint
        }));
    }
		var r = kity
			, o = Layout;
		["left", "right", "top", "bottom"].forEach(function(t) {
		var e = "left" == t || "right" == t ? "x" : "y"
			, n = "left" == t || "top" == t ? -1 : 1
			, i = {
			left: "right",
			right: "left",
			top: "bottom",
			bottom: "top",
			x: "y",
			y: "x"
		};
		o.register(t, r.createClass({
			base: o,
			doLayout: function(o, a) {
				var s = o.getContentBox();
				if ("x" == e ? (o.setVertexOut(new r.Point(s[t],s.cy - 10)),
					o.setLayoutVectorOut(new r.Vector(n,0))) : (o.setVertexOut(new r.Point(s.cx,s[t])),
					o.setLayoutVectorOut(new r.Vector(0,n))),
					!a.length)
					return !1;
				a.forEach(function(o) {
					var a = o.getContentBox();
					o.setLayoutTransform(new r.Matrix),
						"x" == e ? (o.setVertexIn(new r.Point(a[i[t]],a.cy)),
							o.setLayoutVectorIn(new r.Vector(n,0))) : (o.setVertexIn(new r.Point(a.cx,a[i[t]])),
							o.setLayoutVectorIn(new r.Vector(0,n)))
				}),
					this.align(a, i[t]),
					this.stack(a, i[e]);
				var c = this.getBranchBox(a)
					, l = 0
					, u = this;
				var h = window.sessionStorage.getItem("project_type");
				h && "dfmea" == h ? function t(e) {
					var n = e.filter(function(t) {
						return 1 !== t.data.nodeType
					});
					if (n && n.length) {
						var i = u.getBranchBox(n);
						i.right > l && (l = i.right),
							n.forEach(function(e) {
								e.children && e.children.length && t(e.children)
							})
					}
				}(o.children) : function t(e) {
					var n = e.filter(function(t) {
						return 1 !== t.data.nodeType && 9 !== t.data.nodeType && 0 !== String(t.data.nodeType).indexOf("8")
					});
					if (n && n.length) {
						var i = u.getBranchBox(n);
						i.right > l && (l = i.right),
							n.forEach(function(e) {
								e.children && e.children.length && t(e.children)
							})
					}
				}(o.children);
				var f = 0
					, d = 0;
				"x" == e ? (f = s[t],
					f += n * o.getStyle("margin-" + t),
					f += n * a[0].getStyle("margin-" + i[t]),
					d = s.bottom,
					d -= s.height / 2,
					d -= c.height / 2,
					d -= c.y) : (f = s.right,
					f -= s.width / 2,
					f -= c.width / 2,
					f -= c.x,
					d = s[t],
					d += n * o.getStyle("margin-" + t),
					d += n * a[0].getStyle("margin-" + i[t])),
					this.move(a, f + l + 20, d)
			},
			getOrderHint: function(t) {
				var n = []
					, i = t.getLayoutBox();
				return "x" == e ? (n.push({
					type: "up",
					node: t,
					area: new r.Box({
						x: i.x,
						y: i.top - t.getStyle("margin-top") - 5,
						width: i.width,
						height: t.getStyle("margin-top")
					}),
					path: ["M", i.x, i.top - 5, "L", i.right, i.top - 5]
				}),
					n.push({
						type: "down",
						node: t,
						area: new r.Box({
							x: i.x,
							y: i.bottom + 5,
							width: i.width,
							height: t.getStyle("margin-bottom")
						}),
						path: ["M", i.x, i.bottom + 5, "L", i.right, i.bottom + 5]
					})) : (n.push({
					type: "up",
					node: t,
					area: new r.Box({
						x: i.left - t.getStyle("margin-left") - 5,
						y: i.top,
						width: t.getStyle("margin-left"),
						height: i.height
					}),
					path: ["M", i.left - 5, i.top, "L", i.left - 5, i.bottom]
				}),
					n.push({
						type: "down",
						node: t,
						area: new r.Box({
							x: i.right + 5,
							y: i.top,
							width: t.getStyle("margin-right"),
							height: i.height
						}),
						path: ["M", i.right + 5, i.top, "L", i.right + 5, i.bottom]
					})),
					n
			}
		}))
	})
});
