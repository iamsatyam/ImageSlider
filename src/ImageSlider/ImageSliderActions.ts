import { createStandardAction } from 'typesafe-actions';
import { ModelPhotos } from '../ApiService';
export const getPhotoList = createStandardAction('imageSlider/GET_PHOTO_LIST')<void>();
export const getPhotoListSuccess = createStandardAction('imageSlider/GET_PHOTO_LIST_SUCCESS')<ModelPhotos[]>();
export const getPhotoListFailed = createStandardAction('imageSlider/GET_PHOTO_LIST_FAILED')<string>();