/*
 * All the calculations for drawing the shapes.
 */

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