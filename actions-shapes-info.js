/*
* Actions related to the shapes info report.
*/

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
const updateShapesInfo = () => {
    const points = getState("points");
    document.getElementById("shape-info-parallelogram").textContent = getState("area");
    document.getElementById("shape-info-circle").textContent = getState("area");
    document.getElementById("shape-info-point1").textContent = `x: ${points[0].x} - y: ${points[0].y}`;
    document.getElementById("shape-info-point2").textContent = `x: ${points[1].x} - y: ${points[1].y}`;
    document.getElementById("shape-info-point3").textContent = `x: ${points[2].x} - y: ${points[2].y}`;
}