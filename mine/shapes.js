/*
* General app variables.
*/
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const radius = 5.5;
const red = '#ff0000';
const blue = '#0000ff';

/*
 * Inmutable app state. 
 * The state is handled as inmutable and is always returning a copy of the last state. This approach of functional programming will avoid side effects and also 
 * presents the possibilty to scale the app, for instance by adding an 'undo' feature in the future, just saving the copies of the state on a stack.
 */
const stateHandler = Immutable.Map();

// Initial state
let state = stateHandler.set("points", []);

/*
 * By using Inmutable.js copies are free. It means the object is copied only by creating a new reference, which results in memory savings and save potential execution speed problems.
 */
const setState = (key, value) => {
  const newState = stateHandler.set(key, value);
  state = state.merge(newState);
}

/*
 * Returns the current state.
 */
const getState = (key) => state.get(key);

/*
 * Init app.
 */
const initialize = () => {
  canvas.addEventListener('click', handleDot);
  canvas.addEventListener('mousedown', startDragging);
  canvas.addEventListener('mouseup', stopDragging);
  canvas.addEventListener('mousemove', drag);
  sizeCanvas();
}

/*
 * Size the canvas to be fullscreen maintaining thr aspect ratio.
 */
const sizeCanvas = () => {
  const container = document.getElementById("container");
  const aspect = canvas.height / canvas.width;
  const width = container.offsetWidth;

  canvas.width = width;
  canvas.height = Math.round(width * aspect);
}

/*
 * Click event handler to draw a dot.
 */ 
const handleDot = (e) => {
  const mousePosition = getMousePosition(e);
  if (getState("points").length < 3) {
    drawDot(mousePosition.x, mousePosition.y);
    setState("points", [...getState("points"), { x: mousePosition.x, y: mousePosition.y }]);
  }
  if (getState("points").length === 3) {
    drawParalellogram();
  }
}

const drawDot = (x, y) => {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = red;
  context.fill();
}

const drawParalellogram = () => {
  const points = getState("points");

  context.beginPath();
  context.strokeStyle = blue;
  context.lineWidth = 2;
  context.moveTo(points[0].x, points[0].y);
  context.lineTo(points[1].x, points[1].y);
  context.lineTo(points[2].x, points[2].y);

  const lastPointX = points[0].x + points[2].x - points[1].x;
  const lastPointY = points[0].y + points[2].y - points[1].y;

  context.lineTo(lastPointX, lastPointY);
  context.closePath();
  context.stroke();
}

const startDragging = (e) => {
  const mousePosition = getMousePosition(e);
  const points = getState("points");
  points.forEach(point => {
    if(
        (point.x <= mousePosition.x)                &&
        (point.x + (radius * 2) >= mousePosition.x) &&
        (point.y <= mousePosition.y)                &&
        (point.y + (radius * 2) >= mousePosition.y)
      ) {
        // Holds a reference of the dragged point.
        setState("dragged", point);
      }
  });
};

const stopDragging = () => {
  setState("dragged", null);
}

const drag = (e) => {
    if(getState("dragged")) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const mousePosition = getMousePosition(e);
      
      // Updates the reference of the dragged dot.
      getState("dragged").x = mousePosition.x;
      getState("dragged").y = mousePosition.y;
      
      // Redraw all the dots and parallelogram according to the state change.
      redrawDots();
      drawParalellogram();    
    }
}

const redrawDots = () => {
  const points = getState("points");
  points.forEach(point => {
   drawDot(point.x, point.y);
  });
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
