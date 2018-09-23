/*
 * Inmutable app state handler. 
 * The state is handled as inmutable and is always returning a copy of the last state. This approach of functional programming will avoid side effects and also 
 * presents the possibilty to scale the app, for instance by adding an 'undo' feature in the future, by saving the copies of the state on a stack.
 */
const inmutableStateHandler = Immutable.Map();

/*
 * Initial state.
 */
let state = inmutableStateHandler.set("points", []);

/*
 * By using Inmutablejs copies are free. It means the object is copied only by creating a new reference, which results in memory savings and save potential execution speed problems.
 */
const setState = (key, value) => {
  const newState = inmutableStateHandler.set(key, value);
  state = state.merge(newState);
}

/*
 * Returns the current state.
 */
const getState = (key) => state.get(key);