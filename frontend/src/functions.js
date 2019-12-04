import HMS from "canvas-hms";
require("dotenv").config();

CanvasRenderingContext2D.prototype.renderPreview = async function({image, filter = "", rotate = 0, events}) {
    const hms = new HMS({canvas: this.canvas});
    const minWidth = +process.env.REACT_APP_CANVAS_WIDTH;
    
    let increase = 1;
    if(image.width < minWidth) 
        increase = minWidth / image.width;

    let width = increase * image.width,
        height = increase * image.height;

    this.canvas.width = ((rotate % 180) === 0) ? width : height;
    this.canvas.height = ((rotate % 180) === 0) ? height : width;

    const span = [width / -2, height / -2, width, height];

    this.save();
    this.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.clearRect(...span);
    this.rotate((Math.PI / 180) * rotate);

    // Set filter
    if(this.filter) this.filter = filter;
    else this.canvas.style.filter = filter; // Fallback for mobile browsers

    // Draw image
    this.drawImage(image, ...span);
    
    for(let [name, value] of events) {
        value -= 50;
        hms[name](value);
    }

    this.restore();
}