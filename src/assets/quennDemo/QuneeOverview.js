/*eslint-disable*/
import Q from './Q';

function QuneeOverview(html, graph) {
  this.html = html;
  this.canvas = Q.createCanvas(true);
  this.html.appendChild(this.canvas);
  new Q.DragSupport(this.canvas, this);
  this.setGraph(graph);
}

function globalToLocal(evt, div) {
  if (evt.touches) {
    if (evt.changedTouches && evt.changedTouches.length) {
      evt = evt.changedTouches[0];
    } else {
      evt = evt.touches[0];
    }
  }
  const clientRect = div.getBoundingClientRect();
  let x = evt.clientX || 0;
  let y = evt.clientY || 0;
  if (Q.isTouchSupport && Q.isSafari) {
    if (window.pageXOffset && x == evt.pageX) {
      x -= window.pageXOffset;
    }
    if (window.pageYOffset && y == evt.pageY) {
      y -= window.pageYOffset;
    }
  }
  return [x - clientRect.left, y - clientRect.top];
}

QuneeOverview.prototype = {
  html: null,
  canvas: null,
  visible: true,
  setGraph: function (graph) {
    if (this.graph == graph) {
      return;
    }
    this._uninstall();
    this.graph = graph;
    this._install();
  },
  _install: function () {
    if (!this.graph) {
      return;
    }
    if (!this._onPropertyChanged) {
      this._onPropertyChanged = function (evt) {
        const kind = evt.kind;
        if (kind == 'element.bounds') {
          this._invalidateGraph();
          return;
        }
        if (kind == 'transform' || kind == 'viewport') {
          this.invalidate();
        }
      }.bind(this);
      this._onDataChanged = function () {
        this._invalidateGraph();
      }.bind(this)
    }
    this.graph.propertyChangeDispatcher.addListener(this._onPropertyChanged);
    this.graph.dataPropertyChangeDispatcher.addListener(this._onDataChanged);
    this.graph.listChangeDispatcher.addListener(this._onDataChanged);
    this._invalidateGraph(true);
  },
  _uninstall: function () {
    if (!this.graph || !this._onPropertyChanged) {
      return;
    }
    this.graph.propertyChangeDispatcher.removeListener(this._onPropertyChanged);
    this.graph.dataPropertyChangeDispatcher.removeListener(this._onDataChanged);
    this.graph.listChangeDispatcher.removeListener(this._onDataChanged);
    this.imageInfo = null;
    this.bounds = null;
    this.scale = null;
  },
  _toCanvas: function (x, y) {
    x = this.scale * (x - this.bounds.x);
    y = this.scale * (y - this.bounds.y);
    return [x, y]
  },
  _toGraph: function (evt) {
    const xy = globalToLocal(evt, this.html);
    const x = xy[0] / this.scale + this.bounds.x;
    const y = xy[1] / this.scale + this.bounds.y;
    return [x, y]
  },
  _validateGraph: function () {
    this._invalidateGraphFlag = false;
    if (!this.visible) {
      return;
    }
    const width = this.html.clientWidth, height = this.html.clientHeight;
    const bounds = new Q.Rect();
    bounds.add(this.graph.bounds);
    const imageScale = Math.min(width / bounds.width, height / bounds.height) * this.canvas.ratio;
    this.imageInfo = this.graph.exportImage(imageScale, bounds);
    this.imageInfo.scale = imageScale;
    this.imageInfo.bounds = bounds;

    this.invalidate();
  },
  _invalidateGraphFlag: false,
  _invalidateGraph: function (force) {
    if (!this.graph || (!force && this._invalidateGraphFlag)) {
      return;
    }
    this._invalidateGraphFlag = true;
    this.graph.callLater(this._validateGraph, this, force ? 0 : 100);
  },
  invalidate: function (force) {
    if (!force && this._invalidateFlag) {
      return;
    }
    this._invalidateFlag = true;
    setTimeout(this.validate.bind(this));
  },
  validate: function () {
    this._invalidateFlag = false;
    let imageInfo = this.imageInfo;
    if (!imageInfo) {
      return;
    }
    const viewportBounds = this.graph.viewportBounds;
    if (!viewportBounds.height || !viewportBounds.width) {
      return;
    }

    const canvas = this.canvas;
    const ratio = canvas.ratio;
    const g = canvas.getContext('2d');
    let width = this.html.clientWidth, height = this.html.clientHeight;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    g.scale(ratio, ratio);

    const bounds = new Q.Rect(imageInfo.bounds);
    bounds.add(viewportBounds);
    const scale = Math.min(width / bounds.width, height / bounds.height);
    this.scale = scale;

    const offsetX = (width / scale - bounds.width) / 2;
    const offsetY = (height / scale - bounds.height) / 2;
    bounds.x -= offsetX;
    bounds.y -= offsetY;
    bounds.width = width / scale;
    bounds.height = height / scale;
    this.bounds = bounds;

    g.save();
    let xy = this._toCanvas(imageInfo.bounds.x, imageInfo.bounds.y);
    g.translate(xy[0], xy[1]);
    g.scale(scale / imageInfo.scale, scale / imageInfo.scale);
    g.drawImage(this.imageInfo.canvas, 0, 0);
    g.restore();

    g.beginPath();
    g.moveTo(0, 0);
    g.lineTo(canvas.width, 0);
    g.lineTo(canvas.width, canvas.height);
    g.lineTo(0, canvas.height);
    g.lineTo(0, 0);

    xy = this._toCanvas(viewportBounds.x, viewportBounds.y);
    const x = xy[0];
    const y = xy[1];
    width = viewportBounds.width * scale;
    height = viewportBounds.height * scale;

    g.moveTo(x, y);
    g.lineTo(x, y + height);
    g.lineTo(x + width, y + height);
    g.lineTo(x + width, y);
    g.closePath();
    g.fillStyle = 'rgba(132, 146, 166, 0.4)';
    g.fill();
    g.lineWidth = 0.5;
    g.strokeStyle = '#99A9BF';
    g.strokeRect(x, y, width, height)
  },
  accept: function () {
    return this.graph != null;
  },
  startdrag: function (evt) {
    this.enddrag();
    if (!this.scale) {
      return;
    }
    const xy = this._toGraph(evt);
    const viewport = this.graph.viewportBounds;
    if (viewport.contains(xy[0], xy[1])) {
      this._dragInfo = {
        scale: this.scale / this.graph.scale,
        point: xy
      };
      this.graph.stopAnimation()
    }
  },
  ondrag: function (evt) {
    if (!this._dragInfo) {
      return;
    }
    const scale = this._dragInfo.scale;
    let dx = evt.dx;
    let dy = evt.dy;
    dx /= scale;
    dy /= scale;
    this.graph.translate(-dx, -dy, false)
  },
  enddrag: function () {
    this._dragInfo = null;
  },
  onstart: function (evt) {
    Q.stopEvent(evt);
    const xy = this._toGraph(evt);
    this.graph.centerTo(xy[0], xy[1])
  },
  onmousewheel: function (evt) {
    Q.stopEvent(evt);
    let xy = this._toGraph(evt);
    xy = this.graph.toCanvas(xy[0], xy[1]);
    this.graph.zoomAt(Math.pow(this.graph.scaleStep, evt.delta), xy.x, xy.y);
  },
  ondblclick: function (evt) {
    const graph = this.graph;
    if (graph.enableDoubleClickToOverview) {
      const resetScale = graph.resetScale || 1;
      if (Math.abs(graph.scale - resetScale) < 0.001) {
        graph.zoomToOverview();
      } else {
        graph.moveToCenter(resetScale)
      }
    }
  },
  setVisible: function (visible) {
    this.visible = visible;
    if (visible) {
      this.html.style.display = 'block';
    } else {
      this.html.style.display = 'none';
    }
    this._invalidateGraph();
  }
};
export default QuneeOverview;
