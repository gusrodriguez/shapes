/*
* Actions related to dots.
*/

/*
* Redraws all the dots according to the current points state.
*/
const redrawDots = () => {
  const points = getState("points");
  points.forEach(point => {
    drawDot(point.x, point.y);
  });
}

/*
 * Draw a dot given its coordinates.
 */
const drawDot = (x, y) => {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = red;
  context.fill();
}