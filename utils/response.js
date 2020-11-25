import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");

export const wp = dimension => {
  return wp2dp((dimension / screen.width) * 100 + '%');
};


export const hp = dimension => {
  return hp2dp((dimension / screen.height) * 100 + '%');
};