/*
* General app variables.
*/
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const diameter = 5;
const red = '#ff0000';

/*
 * Inmutable app state. 
 * The state is handled as inmutable and is always returning a copy of the last state. This approach of functional programming will avoid side effects and also 
 * presents the possibilty to scale the app, for instance by adding an 'undo' feature in the future, just saving the copies of the state on a stack.
 */
const stateHandler = Immutable.Map();

// Initial state
let state = stateHandler.set("points", []);

/*
 * By using Inmutable.js copies are free. It means the object is copied only by creating a new reference, which results in memory savings and save potential execution speed problems.
 */
const setState = (key, value) => {
  state = stateHandler.set(key, value);
}

/*
 * Returns the current state.
 */
const getState = (key) => state.get(key);

/*
 * Init app.
 */
const initialize = () => {
  canvas.addEventListener('click', drawDot);
  sizeCanvas();
}

/*
 * Size the canvas to be fullscreen maintaining thr aspect ratio.
 */
const sizeCanvas = () => {
  const container = document.getElementById("container");
  const aspect = canvas.height / canvas.width;
  const width = container.offsetWidth;
  const height = container.offsetHeight;

  canvas.width = width;
  canvas.height = Math.round(width * aspect);
}

/*
 * Click event handler to draw a dot.
 */
const drawDot = (e) => {
  const mousePosition = getMousePosition(e);
   if(getState("points").length <= 3) {  
      context.beginPath();
      context.arc(mousePosition.x, mousePosition.y, diameter, 0, Math.PI * 2);
      context.fillStyle = red;
      context.fill();
      setState("points", [...getState("points"), { x: mousePosition.x, y: mousePosition.y }]);
    }
    if(getState("points").length === 3) {  
      alert(getState("points"));
    }
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

initialize();

/*
 * Domain model.
 */
class Dot {
  constructor(mousePosition, diameter, color) {
    this.mousePosition = mousePosition;
    this.diameter = diameter;
    this.color = color;
  }

  draw() {
    setState('points', [1]);

    console.log(getState("points"));
    // if(state.get("points").length <= 3) {
    //   debugger;
    //   setState([...state.get("points"), { x: this.mousePosition.x, y:this.mousePosition.y }]);
    //   context.beginPath();
    //   context.arc(this.mousePosition.x, this.mousePosition.y, this.diameter, 0, Math.PI * 2);
    //   context.fillStyle = this.color;
    //   context.fill();
    // }

    // if (state.get("points").length === 3) {
    //   alert("three");
    // }
  }
}
