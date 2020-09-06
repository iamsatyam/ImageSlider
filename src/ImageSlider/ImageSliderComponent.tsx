import React, {Component} from 'react';
import {View, Text, SafeAreaView, Dimensions} from 'react-native';
import {IImageSliderState} from './ImageSliderReducer';
import Carousel from 'react-native-snap-carousel';
import {ModelPhotos} from '../ApiService';
import FastImage from 'react-native-fast-image';
import * as imageSliderAction from './ImageSliderActions';
import { connect } from 'react-redux';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export interface IProps extends IImageSliderState {
  getPhotoList: () => void;
}

export class ImageSliderComponent extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.props.getPhotoList();
  }

  render() {
    return (
      <SafeAreaView>
        <Carousel
          data={this.props.apiResponse}
          renderItem={this.renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth * 0.85}
          removeClippedSubviews = {true}
          hasParallaxImages={true}
        />
      </SafeAreaView>
    );
  }

  renderItem = ({item, index}: {item: ModelPhotos; index: any}) => {
    return (
      <View style={{height: '100%', backgroundColor: 'lightgrey'}}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
            padding: 20,
            width: '100%',
            backgroundColor: 'grey',
          }}>
          {item.author}
        </Text>
      
       <FastImage
          style={{flex:1,width:200, height:300, alignSelf:'center'}}
          source={{
            uri: `https://picsum.photos/200/300?image=${item.id}`,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  };
}

const mapStateToProps = (state: any) => {
  return {...state};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
      getPhotoList: () => dispatch(imageSliderAction.getPhotoList()),
  };
};

const ImageSlider = connect(mapStateToProps, mapDispatchToProps)(ImageSliderComponent);
export default ImageSlider;