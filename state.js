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

const resetState = () => {
  state.splice(0, state.length);
  render();
}

/*
 * Returns a copy of the current state.
 */
const getState = (key) => [...state];