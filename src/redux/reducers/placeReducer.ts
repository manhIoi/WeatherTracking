import actionTypes from '../types';
import {ActionType, PlaceType} from '../../types';

const placeReducer = (state: PlaceType | null = null, action: ActionType) => {
  switch (action.type) {
    case actionTypes.PLACE_TYPES.SET_PLACE:
      return action.payload;
    default:
      return state;
  }
};

export default placeReducer;
