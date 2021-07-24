import {PlaceType} from '../../types';
import actionTypes from '../types';

const setPlace = (newPlace: PlaceType) => {
  return {
    type: actionTypes.PLACE_TYPES.SET_PLACE,
    payload: newPlace,
  };
};

export {setPlace};
