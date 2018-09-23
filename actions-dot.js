/*
* Actions related to dots.
*/

/*
* Redraws all the dots according to the current points state.
*/
const redrawDots = () => {
  const points = getState("points");
  points.forEach(point => {
    drawDot(point.x, point.y, red);
  });
}

/*
 * Draw a dot given its coordinates.
 */
const drawDot = (x, y, color) => {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();
}