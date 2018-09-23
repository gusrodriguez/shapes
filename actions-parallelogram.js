
/*
* Actions related to the parallelogram.
*/

/*
 * Draw a parallelogram according to the points state.
 */
const drawParallelogram = () => {
  const points = getState("points");

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

  setState("area", calculateArea(points, fourthPoint));
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