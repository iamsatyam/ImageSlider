import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { install } from 'redux-loop';
import { createStore } from 'redux';
import ImageSliderReducer, { initialImageSliderState } from './src/ImageSlider/ImageSliderReducer';
import ImageSlider from './src/ImageSlider/ImageSliderComponent';

const store = install()(createStore)(ImageSliderReducer, initialImageSliderState);

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <ImageSlider />
    </Provider>
    );
  }
}