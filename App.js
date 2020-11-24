import React, { useEffect } from "react";
import useWeather from "./utils/useWeather";
import Loading from "./components/Loading";
import Weather from "./components/Weather";
import { Container } from "./components/Styles";
import * as ScreenOrientation from 'expo-screen-orientation';

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
