/**
 * @fileOverview
 *
 * 提供折线相连的方法
 *
 * @author: techird
 * @copyright: Baidu FEX, 2014
 */

define(function(require, exports, module) {
    var kity = require('../core/kity');
    var connect = require('../core/connect');

    connect.register('poly', function(node, parent, connection, width) {

        // 连线起点和终点
        var po = parent.getLayoutVertexOut(),
            pi = node.getLayoutVertexIn();

        // 连线矢量和方向
        var v = parent.getLayoutVectorOut().normalize();

        var r = Math.round;
        var abs = Math.abs;

        var pathData = [];
        pathData.push('M', r(po.x), r(po.y));

        switch (true) {
            case abs(v.x) > abs(v.y) && v.x < 0:
                // left
                pathData.push('h', -parent.getStyle('margin-left'));
                pathData.push('v', pi.y - po.y);
                pathData.push('H', pi.x);
                break;

            case abs(v.x) > abs(v.y) && v.x >= 0:
                // right
                pathData.push('h', parent.getStyle('margin-right'));
                pathData.push('v', pi.y - po.y);
                pathData.push('H', pi.x);
                break;

            case abs(v.x) <= abs(v.y) && v.y < 0:
                // top
                pathData.push('v', -parent.getStyle('margin-top'));
                pathData.push('h', pi.x - po.x);
                pathData.push('V', pi.y);
                break;

            case abs(v.x) <= abs(v.y) && v.y >= 0:
                // bottom
                pathData.push('v', parent.getStyle('margin-bottom'));
                pathData.push('h', pi.x - po.x);
                pathData.push('V', pi.y);
                break;

        }

        connection.setMarker(null);
        connection.setPathData(pathData);
    });
		connect.register("poly", function(t, e, n, i) {
		var r = e.getLayoutVertexOut()
			, o = t.getLayoutVertexIn()
			, a = e.getLayoutVectorOut().normalize()
			, s = Math.round
			, c = Math.abs
			, l = [];
		switch (l.push("M", s(r.x) - 10, s(r.y)),
			!0) {
			case c(a.x) > c(a.y) && a.x < 0:
				l.push("h", -e.getStyle("margin-left")),
					l.push("v", o.y - r.y),
					l.push("H", o.x),
					l.push("h", 10);
				break;
			case c(a.x) > c(a.y) && a.x >= 0:
				l.push("h", e.getStyle("margin-right")),
					l.push("v", o.y - r.y),
					l.push("H", o.x),
					l.push("h", 10);
				break;
			case c(a.x) <= c(a.y) && a.y < 0:
				l.push("v", -e.getStyle("margin-top")),
					l.push("h", o.x - r.x),
					l.push("V", o.y),
					l.push("h", 10);
				break;
			case c(a.x) <= c(a.y) && a.y >= 0:
				l.push("v", e.getStyle("margin-bottom")),
					l.push("h", o.x - r.x),
					l.push("V", o.y),
					l.push("h", 10)
		}
		n.setMarker(null),
			n.setPathData(l)
	})
});
