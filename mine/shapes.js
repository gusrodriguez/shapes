/*
* General app variables.
*/
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const diameter = 5;
const red = '#ff0000';

/*
* Global app state.
*/
const state = {
  points: [],
};

/*
* Init app.
*/
const initialize = () => {
  canvas.addEventListener('click', drawDot);
  sizeCanvas();
}

/*
* Size the canvas to be fullscreen maintaining thr aspect ratio.
*/
const sizeCanvas = () => {
  const container = document.getElementById("container");
  const aspect = canvas.height / canvas.width;
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  canvas.width = width;
  canvas.height = Math.round(width * aspect);
}

/*
* Click event handler to draw a dot.
*/
const drawDot = (e) => {
  const mousePosition = getMousePosition(e);
  const dot = new Dot(mousePosition, diameter, red);
  dot.draw();
}

/*
* Get the mouse position on click.
*/
const getMousePosition = (e) => {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

initialize();

/*
* Domain model.
*/
class Dot {
  constructor(mousePosition, diameter, color) {
    this.mousePosition = mousePosition;
    this.diameter = diameter;
    this.color = color;
  }

  draw() {
    if(state.points.length <= 3) {
      state.points.push({ x: this.mousePosition.x, y:this.mousePosition.y });
      context.beginPath();
      context.arc(this.mousePosition.x, this.mousePosition.y, this.diameter, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.fill();
    }

    if (state.points.length === 3) {
      alert("three");
    }
  }
}
