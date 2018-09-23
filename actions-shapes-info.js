const updateShapesInfo = () => {
    const points = getState("points");
    document.getElementById("shape-info-parallelogram").textContent = getState("area");
    document.getElementById("shape-info-circle").textContent = getState("area");
    document.getElementById("shape-info-point1").textContent = `x: ${points[0].x} - y: ${points[0].y}`;
    document.getElementById("shape-info-point2").textContent = `x: ${points[1].x} - y: ${points[1].y}`;
    document.getElementById("shape-info-point3").textContent = `x: ${points[2].x} - y: ${points[2].y}`;
}