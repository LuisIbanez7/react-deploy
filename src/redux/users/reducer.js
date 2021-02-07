import * as Actions from './action-types';

const initialState = { 
    jwt: undefined,
    isLoggedIn: false,
}

export function reducer(state = initialState, action) {

  switch(action.type) {

    case Actions.ADD_USER:
      return {...state, isLoggedIn: true,  ...action.payload };

    default:
      return state;
  }
}
