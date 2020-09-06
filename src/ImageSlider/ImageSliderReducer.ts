import { loop, Cmd } from 'redux-loop';
import { getType, ActionType } from 'typesafe-actions';
import * as imageSliderActions from './ImageSliderActions';
import { ApiService, ModelPhotos } from '../ApiService';
import { Action } from 'redux';

export interface IImageSliderState {
  apiResponse: ModelPhotos[];
  loading: boolean;
}

export const initialImageSliderState: IImageSliderState = {
  apiResponse: [],
  loading: false,
};

async function getPhotosData(): Promise<ModelPhotos[]> {
  const result = await ApiService.getPhotos();
  return shuffle(result);
}

function shuffle(array: ModelPhotos[]) {
  let ctr = array.length;
  let temp;
  let index;

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
    ctr--;
    // And swap the last element with it
    temp = array[ctr];
    array[ctr] = array[index];
    array[index] = temp;
  }
  return array;
}

export type ImageSliderAction = ActionType<typeof imageSliderActions>;
export default (state = initialImageSliderState, action: ImageSliderAction) => {
  switch (action.type) {
    case getType(imageSliderActions.getPhotoList):
      return loop(
        { ...state, loading: true },
        Cmd.run<Action>(getPhotosData, {
          failActionCreator: imageSliderActions.getPhotoListFailed,
          successActionCreator: imageSliderActions.getPhotoListSuccess,
        })
      );

    case getType(imageSliderActions.getPhotoListSuccess):
      return { ...state, loading: false, apiResponse: action.payload };

    case getType(imageSliderActions.getPhotoListFailed):
      return { ...state, loading: false, };

    default:
      return state;
  }
};
