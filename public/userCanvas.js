const Canvas = function(){
  this.canvas = document.querySelector('#main-canvas');
  this.context = this.canvas.getContext('2d');
  this.prevX = null;
  this.prevY = null;
  this.currentX = null;
  this.currentY = null;
  this.canDraw = false;
}
