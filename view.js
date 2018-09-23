
/*
 * General variables of the view.
 */
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const resetButton = document.getElementById('reset');
const aboutShowButton = document.getElementById('about-show-button');
const aboutHideSpan = document.getElementById('about-hide-span');
const radius = 5.5;
const red = '#ff0000';
const blue = '#000080';
const yellow = '#ffff66';
const pink = '#ffa500';

/*
 * Rererence to the point being dragged.
 */
let draggedPoint = null;

/*
 * Area value.
 */
let area = null;

/*
 * Starts the  app.
 */
const start = () => {
  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('mousedown', startDragging);
  canvas.addEventListener('mouseup', stopDragging);
  canvas.addEventListener('mousemove', move);
  aboutShowButton.addEventListener('click', handleAboutShow);
  aboutHideSpan.addEventListener('click', handleAboutHide);
  resetButton.addEventListener('click', reset);
  sizeCanvas();
}

const handleAboutShow = () => {
  document.getElementById('about-modal').style.display = 'block'
}

const handleAboutHide = () => {
  document.getElementById('about-modal').style.display = 'none'
}

/*
 * Renders the entire view on each state change.
 */
const render = () => {
  const points = getState();
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (points.length <= 3) {
    drawDots(red);
  }
  if (points.length === 3) {
    drawParallelogram();
    drawCircle();
  }
  updateInfo();
}

/*
 * Handle click on canvas.
 */
const handleClick = (e) => {
  const mousePosition = getMousePosition(e);
  if (getState().length <= 3) {
    setState({ x: mousePosition.x, y: mousePosition.y });
  }
}

/*
 * Start Drag handler.
 */
const startDragging = (e) => {
  const mousePosition = getMousePosition(e);
  const points = getState();
  points.forEach(point => {
    if (mouseOverPoint(point, mousePosition)) {
      // Holds a reference to the point being dragged.
      draggedPoint = point;
    }
  });
};

/*
 * Stop Drag handler.
 */
const stopDragging = () => {
  draggedPoint = null;
}

/*
 * Mouse move and Drag handler.
 */
const move = (e) => {
  const mousePosition = getMousePosition(e);
  const points = getState();

  if (points.length < 3) return;

  points.forEach(point => {
    const color = mouseOverPoint(point, mousePosition) ? pink : red;
    highlightDot(point.x, point.y, color);
  });

  if (draggedPoint) {
    // Updates the reference of the dragged dot.
    draggedPoint.x = mousePosition.x;
    draggedPoint.y = mousePosition.y;

    setState();
  }
}

/*
 * Get the mouse position on click.
 */
const reset = () => {
  area = null;
  resetState();
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
 * Clears the shapes info panel.
 */
const resetShapesInfo = () => {
  const placeHolder = '[Draw...]';
  document.getElementById("shape-info-parallelogram").textContent = placeHolder;
  document.getElementById("shape-info-circle").textContent = placeHolder;
  document.getElementById("shape-info-point1").textContent = placeHolder;
  document.getElementById("shape-info-point2").textContent = placeHolder;
  document.getElementById("shape-info-point3").textContent = placeHolder;
}

/*
 * Updates the information being shown to the user.
 */
const updateInfo = () => {
  const points = getState();
  const placeHolder = '[Draw...]';
  const point1Text = points[0] ? `x: ${points[0].x} - y: ${points[0].y}` : placeHolder;
  const point2Text = points[1] ? `x: ${points[1].x} - y: ${points[1].y}` : placeHolder;
  const point3Text = points[2] ? `x: ${points[2].x} - y: ${points[2].y}` : placeHolder;
  const areaText = area ? area : placeHolder;

  document.getElementById("shape-info-parallelogram").textContent = areaText;
  document.getElementById("shape-info-circle").textContent = areaText;
  document.getElementById("shape-info-point1").textContent = point1Text;
  document.getElementById("shape-info-point2").textContent = point2Text;
  document.getElementById("shape-info-point3").textContent = point3Text;
}

// Go!
start();
