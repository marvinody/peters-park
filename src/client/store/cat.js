import axios from "axios";

// ACTION TYPES
// YOU MAKE THEM!!
// check the test specs for to actually write tho


// INITIAL STATE
const initialState = null

// ACTION CREATORS
export const loadCat = data => ({
  // what kinda stuff goes in here?
})

// THUNK CREATORS
export const fetchCat = id => async (dispatch) => {
  // YOUR CODE HERE

}

// REDUCER
// just modify inside the switch statement by adding cases.
// don't modify what the function takes
export default function (state = initialState, action) {
  switch (action.type) {


    default: return state;
  }
}
