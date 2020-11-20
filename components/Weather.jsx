import React from "react";
import { isSameDay, format } from "date-fns";
import imageDictionary from "../utils/imageDictionary.js";
import Card from "./Card";
import { i18n } from "../utils/i18n";
import {
    AdMobBanner,
    AdMobInterstitial,
    PublisherBanner,
    AdMobRewarded,
    setTestDeviceIDAsync,
} from 'expo-ads-admob';
import {
    Container,
    CurrentDay,
    City,
    BigText,
    BigIcon,
    Temp,
    Description,
    Week,
    Propaganda,
} from "./Styles";



const Weather = ({ forecast: { name, list, timezone } }) => {
    const currentWeather = list.filter((day) => {
        const now = new Date().getTime() + Math.abs(timezone * 1000);
        const currentDate = new Date(day.dt * 1000);
        return isSameDay(now, currentDate);
    });

    const daysByHour = list.map((day) => {
        const dt = new Date(day.dt * 1000);
        return {
            date: dt,
            hour: dt.getHours(),
            name: format(dt, "EEEE"),
            temp: Math.round(day.main.temp),
            icon:
                imageDictionary[day.weather[0].icon] || imageDictionary["02d"],
        };
    });

    return (
        currentWeather.length > 0 && (
            <Container>
                <CurrentDay>
                    <City>{name}</City>
                    <BigText>{i18n.t('Today')}</BigText>
                    <BigIcon
                        source={
                            imageDictionary[
                                currentWeather[0].weather[0].icon
                            ] || imageDictionary["02d"]
                        }
                    />
                    <Temp>{Math.round(currentWeather[0].main.temp)}°C</Temp>
                    <Description>
                        {i18n.t(currentWeather[0].weather[0].description)}
                    </Description>
                </CurrentDay>
                <Week horizontal={true} showsHorizontalScrollIndicator={false}>
                    {daysByHour.map((day, index) => (
                        <Card
                            key={index}
                            icon={day.icon}
                            name={i18n.t(day.name).substring(0, 3).toUpperCase()}
                            temp={day.temp}
                            hour={day.hour}
                        />
                    ))}
                </Week>
                <Propaganda>
                    <AdMobBanner
                    bannerSize="fullBanner"
                    adUnitID="ca-app-pub-3072202765969173/2773847315" 
                    setTestDeviceIDAsync
                    servePersonalizedAds // true or false
                    onDidFailToReceiveAdWithError={erro => {console.log(erro)}} />
                </Propaganda>
            </Container>
        )
    );
};
export default Weather;
