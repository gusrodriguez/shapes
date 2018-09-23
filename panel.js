/*
* Main application that represents a panel, and all the event handlers and state changes that will occur on it..
*/

/*
* General panel variables.
*/
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const radius = 5.5;
const red = '#ff0000';
const blue = '#000080';
const yellow = '#ffff66';
const lightGrey = '#d3d3d3';

/*
 * Starts the  app.
 */
const start = () => {
  canvas.addEventListener('click', handleDot);
  canvas.addEventListener('mousedown', startDragging);
  canvas.addEventListener('mouseup', stopDragging);
  canvas.addEventListener('mousemove', drag);
  sizeCanvas();
  grid();
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
    if (
      (point.x <= mousePosition.x) &&
      (point.x + (radius * 2) >= mousePosition.x) &&
      (point.y <= mousePosition.y) &&
      (point.y + (radius * 2) >= mousePosition.y)
    ) {
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
 * Drag handler.
 */
const drag = (e) => {
  if (getState("dragged")) {
    const mousePosition = getMousePosition(e);

    // Clears the canvas.
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Updates the reference of the dragged dot.
    getState("dragged").x = mousePosition.x;
    getState("dragged").y = mousePosition.y;

    dispatch("drawOnDrag");
  }
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

start();
