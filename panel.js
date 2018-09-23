/*
* Main application that represents a panel, and all the event handlers and state changes that will occur on it..
*/

/*
* General panel variables.
*/
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const resetButton = document.getElementById('reset');
const radius = 5.5;
const red = '#ff0000';
const blue = '#000080';
const yellow = '#ffff66';
const lightGrey = '#d3d3d3';
const pink = '#ffa500';

/*
 * Starts the  app.
 */
const start = () => {
  canvas.addEventListener('click', handleDot);
  canvas.addEventListener('mousedown', startDragging);
  canvas.addEventListener('mouseup', stopDragging);
  canvas.addEventListener('mousemove', move);
  resetButton.addEventListener('click', reset);
  sizeCanvas();
}

const about = () => {
  document.getElementById('about').style.display='none'
}

/*
 * Size the canvas to be fullscreen keeping the aspect ratio.
 */
const sizeCanvas = () => {
  const container = document.getElementById("container");
  const aspect = canvas.height / canvas.width;
  const width = container.offsetWidth;

  canvas.width = width;
  canvas.height = Math.round(width * aspect);
}

/*
 * Start Drag handler.
 */
const startDragging = (e) => {
  const mousePosition = getMousePosition(e);
  const points = getState("points");
  points.forEach(point => {
    if (mouseOverPoint(point, mousePosition)) {
      // Holds a reference to the point being dragged.
      setState("dragged", point);
    }
  });
};

/*
 * Stop Drag handler.
 */
const stopDragging = () => {
  setState("dragged", null);
}

/*
 * Mouse move and Drag handler.
 */
const move = (e) => {
  const points = getState("points");
  const mousePosition = getMousePosition(e);
  points.forEach(point => {
    const color = mouseOverPoint(point, mousePosition) ? pink : red;
    drawDot(point.x, point.y, color);
  });

  if (getState("dragged")) {
    // Clears the canvas.
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Updates the reference of the dragged dot.
    getState("dragged").x = mousePosition.x;
    getState("dragged").y = mousePosition.y;

    dispatch("drawOnDrag");
  }
}

/*
 * Returns true if the mouse is positioned over a point.
 */
const mouseOverPoint = (point, mousePosition) => {
  return  (point.x <= mousePosition.x)                &&
          ((point.x + radius * 2) >= mousePosition.x) &&
          (point.y <= mousePosition.y)                &&
          ((point.y + radius * 2) >= mousePosition.y)
}

/*
 * Click event handler to draw a dot.
 */
const handleDot = (e) => {
  const mousePosition = getMousePosition(e);
  if (getState("points").length < 3) {
    drawDot(mousePosition.x, mousePosition.y, red);
    setState("points", [...getState("points"), { x: mousePosition.x, y: mousePosition.y }]);
  }
  if (getState("points").length === 3) {
    dispatch("drawOnThirdDot");
  }
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

/*
 * Get the mouse position on click.
 */
const reset = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  setState("points", []);
  setState("area", null);
  resetShapesInfo();
}

start();
