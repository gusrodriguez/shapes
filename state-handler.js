const state = [];

/*
 * Updates the state.
 */
const setState = (point) => {
  if(state.length < 3 && point) {
    state.push(point);
  }
  render();
}

/*
 * Returns the current state.
 */
const getState = (key) => [...state];