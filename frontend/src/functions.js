import Jimp from "jimp";
import _ from "lodash";

CanvasRenderingContext2D.prototype.renderPreview = function({image, filter = "", rotate = 0, events}) {
    this.canvas.width = image.width;
    this.canvas.height = image.height;

    let {canvas: {width, height}} = this;

    this.clearRect(0, 0, width, height);

    this.save();

    // Set filter
    this.filter = filter;

    // Set rotation
    this.translate(width / 2, height / 2);
    this.rotate = (Math.PI / 180) * rotate;

    // Draw image
    this.drawImage(image, width / -2, height / -2, width, height);

    this.restore();

    events.forEach(([name, value]) => {
        if(this[name]) this[name](value)
    });
}

CanvasRenderingContext2D.prototype._setWarmth = function(value) {
    // 100 -> 255
    value = (value * 2.55) - (255 / 2);

    console.log({value});

    const {canvas: {width, height}} = this;

    const imageData = this.getImageData(0, 0, width, height);
    const {data} = imageData;

    for(let i = 0; i < imageData.data.length; i += 4) {
        let r = i, 
            g = i + 1, 
            b = i + 2;

        data[r] = _.clamp(data[r] + value, 0, 255);
        data[b] = _.clamp(data[b] - value, 0, 255);
    }

    this.putImageData(imageData, 0, 0);
}

CanvasRenderingContext2D.prototype.setWarmth = function(value) {
    value -= 50;

    const {canvas: {width, height}} = this;

    this.save();

    if(value > 0)       this.fillStyle = `rgba(255, 100, 0, ${value / 125})`;
    else if(value < 0)  this.fillStyle = `rgba(0, 100, 255, ${value / -125})`;
    else                this.fillStyle = `transparent`;

    this.fillRect(0, 0, width, height);
    this.restore();
}