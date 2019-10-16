define(function(require, exports, module) {
    var kity = require('../core/kity');
    var Layout = require('../core/layout');
    var Minder = require('../core/minder');

    Layout.register('mind', kity.createClass({
        base: Layout,

        // doLayout: function(node, children) {
        //     var layout = this;
        //     var half = Math.ceil(node.children.length / 2);
        //     var right = [];
        //     var left = [];
				//
        //     children.forEach(function(child) {
        //         if (child.getIndex() < half) right.push(child);
        //         else left.push(child);
        //     });
				//
        //     var leftLayout = Minder.getLayoutInstance('left');
        //     var rightLayout = Minder.getLayoutInstance('right');
				//
        //     leftLayout.doLayout(node, left);
        //     rightLayout.doLayout(node, right);
				//
        //     var box = node.getContentBox();
        //     node.setVertexOut(new kity.Point(box.cx, box.cy));
        //     node.setLayoutVectorOut(new kity.Vector(0, 0));
        // },
	      doLayout: function(node, children) {
		    var layout = this;
		    var right = [];
		    var down = [];
		    children.forEach(function(node) {
			    node.data.nodeType === 1 || 9 === node.data.nodeType ? right.push(node) : node.attached && down.push(node);
		    });
		    var downLayout = Minder.getLayoutInstance("filetree-down");
		    var rightLayout = Minder.getLayoutInstance("right");
		    downLayout.doLayout(node, down);
		    rightLayout.doLayout(node, right);
		    var box = node.getContentBox();
		    1 === node.data.nodeType || 9 === node.data.nodeType ? "root" === node.type ? node.setVertexOut(new kity.Point(box.left + 28, box.cy - 10)) : "main" === node.type ? node.setVertexOut(new kity.Point(box.left + 28, box.cy - 8)) : node.setVertexOut(new kity.Point(box.left + 28, box.bottom)) : node.setVertexOut(new kity.Point(box.left + 28, box.bottom)),
			    node.setLayoutVectorOut(new kity.Vector(0, 0));
	    },
        getOrderHint: function(node) {
            var hint = [];
            var box = node.getLayoutBox();
            var offset = 5;

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
            return hint;
        }
    }));
});
