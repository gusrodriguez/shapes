const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const diameter = 5;
const red = '#ff0000';

/*
* Init app
*/
function initialize() {
    canvas.addEventListener('click', drawPoint);
    sizeCanvas();
}

function sizeCanvas() {
    const container = document.getElementById("container");
    const aspect = canvas.height / canvas.width;
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    canvas.width = width;
    canvas.height = Math.round(width * aspect);
}

function drawPoint(e) {
    const mousePosition = getMousePosition(e);
    const dot = new Dot(mousePosition, diameter, red);
    dot.draw();
}

function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

initialize();

class Dot {
    constructor(mousePosition, diameter, color) {
        this.mousePosition = mousePosition;
        this.diameter = diameter;
        this.color = color;
    }

    draw() {
        context.beginPath();
        context.arc(this.mousePosition.x, this.mousePosition.y, this.diameter, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
    }
}
