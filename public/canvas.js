const Canvas = function(){
  this.canvas = document.querySelector('#main-canvas');
  this.context = this.canvas.getContext('2d');
  this.context.lineWidth = 15;
  this.prevX = null;
  this.prevY = null;
  this.currentX = null;
  this.currentY = null;
}

Canvas.prototype.changeColour = function(inputColour) {
  //console.log(value);
  this.context.strokeStyle = inputColour;
}

Canvas.prototype.draw = function(event) {
  this.context.beginPath();
  this.context.moveTo(this.prevX, this.prevY);
  this.currentX = event.offsetX;
  this.currentY = event.offsetY;
  this.context.lineTo(this.currentX, this.currentY);
  this.context.stroke();
  this.prevX = this.currentX;
  this.prevY = this.currentY;
}
