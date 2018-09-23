
/*
* General view variables.
*/
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const radius = 5.5;
const red = '#ff0000';
const blue = '#000080';
const yellow = '#ffff66';
const pink = '#ffa500';

let draggedPoint = null;
let area = null;

/*
 * Starts the  app.
 */
const start = () => {
  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('mousedown', startDragging);
  canvas.addEventListener('mouseup', stopDragging);
  canvas.addEventListener('mousemove', move);
  sizeCanvas();
}

const handleClick = (e) => {
  const mousePosition = getMousePosition(e);
  if (getState().length <= 3) {
    setState({ x: mousePosition.x, y: mousePosition.y });
  }
}

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
  points.forEach(point => {
    const color = mouseOverPoint(point, mousePosition) ? pink : red;
    highlightDot(point.x, point.y, color);
  });
  if (draggedPoint) {

    // Updates the reference of the dragged dot.
    draggedPoint.x = mousePosition.x;
    draggedPoint.y = mousePosition.y;

    setState(null);
  }
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
 * Draw a dot given its coordinates.
 */
const drawDots = (color) => {
  getState().forEach((dot) => {
    context.beginPath();
    context.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  });
}

/*
 * Highlight a single dot on mouse over.
 */
const highlightDot = (x, y, color) => {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();
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
 * Draw the parallelogram.
 */
const drawParallelogram = () => {
  const points = getState();

  const fourthPoint = calculateFourthPoint(points);

  context.beginPath();
  context.strokeStyle = blue;
  context.lineWidth = 3;
  context.moveTo(points[0].x, points[0].y);
  context.lineTo(points[1].x, points[1].y);
  context.lineTo(points[2].x, points[2].y);
  context.lineTo(fourthPoint.x, fourthPoint.y);
  context.closePath();
  context.stroke();
}

const calculateFourthPoint = (points) => {
  return {
    x: points[0].x + points[2].x - points[1].x,
    y: points[0].y + points[2].y - points[1].y
  }
}

const calculateArea = (points, fourthPoint) => {
  const v1 = Math.sqrt(Math.pow((fourthPoint.x - points[0].x), 2) + Math.pow((fourthPoint.y - [points[0].y]), 2));
  const v2 = Math.sqrt(Math.pow((points[1].x - points[0].x), 2) + Math.pow((points[1].y - [points[0].y]), 2));

  return ((v1 * v2)).toFixed();
}

/*
 * Draw the circle.
 */
const drawCircle = () => {
  const points = getState();

  // Get the radius according to the area of the parallelogram
  area = calculateArea(points, calculateFourthPoint(points));
  const circleRadius =  Math.sqrt(area/Math.PI).toFixed();

  const lastPointX = points[0].x + points[2].x - points[1].x;
  const lastPointY = points[0].y + points[2].y - points[1].y;
  const centerX = (points[0].x + points[1].x + points[2].x + lastPointX) / 4;
  const centerY = (points[0].y + points[1].y + points[2].y + lastPointY) / 4;
  context.beginPath();
  context.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
  context.strokeStyle = yellow;
  context.lineWidth = 3;
  context.stroke();
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
  const points = getState("points");
  document.getElementById("shape-info-parallelogram").textContent = area;
  document.getElementById("shape-info-circle").textContent = area;
  document.getElementById("shape-info-point1").textContent = `x: ${points[0].x} - y: ${points[0].y}`;
  document.getElementById("shape-info-point2").textContent = `x: ${points[1].x} - y: ${points[1].y}`;
  document.getElementById("shape-info-point3").textContent = `x: ${points[2].x} - y: ${points[2].y}`;
}

start();
