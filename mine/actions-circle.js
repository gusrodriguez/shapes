const drawCircle = () => {
    const points = getState("points");

    // Get the radius according to the area of the parallelogram
    const area = getState("area");
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

