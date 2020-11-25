import React, { useEffect } from "react";
import {Dimensions} from 'react-native';
import useWeather from "./utils/useWeather";
import Loading from "./components/Loading";
import Weather from "./components/Weather";
import { Container } from "./components/Styles";
import * as ScreenOrientation from 'expo-screen-orientation';
import EStyleSheet from 'react-native-extended-stylesheet';

const {width} = Dimensions.get('window');
const rem = width > 340 ? 16 : 18;

// calc styles
EStyleSheet.build({
  $rem: rem,
});

export default function App() {
  const weather = useWeather();
  useEffect(() => {
    changeScreenOrientation();
    async function changeScreenOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
    }
  }, []);
  return (
    <Container>
      {!weather ? <Loading /> : <Weather forecast={weather} />}
    </Container>
  );
}
