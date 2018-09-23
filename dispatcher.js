/*
 * Actions holder and dispatcher.
 * The application can scale in two ways: 
 * 1) By drawing new shapes at the moment the third dot appears and the main shape is drawn. 
 * 2) By drawing (or redrawing) other shapes on drag.
 * In order to achieve those goals, two arrays of actions are created.
 */

/*
 * If any other shape needs to be drawn, we should add actions here:
 */ 
actions = {
  drawOnThirdDot: [
    drawParallelogram,
    drawCircle,
    updateShapesInfo
  ],
  drawOnDrag: [
    redrawDots,
    drawParallelogram,
    drawCircle,
    updateShapesInfo, 
  ], 
}

const dispatch = (actionName) => {
  actions[actionName].forEach(action => {
    action();
  });
}