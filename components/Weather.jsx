import React, {useEffect, useState} from "react";
import { isSameDay, format } from "date-fns";
import imageDictionary from "../utils/imageDictionary.js";
import Card from "./Card";
import { i18n } from "../utils/i18n";
import { Text, Dimensions, } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    AdMobBanner,
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
                <CurrentDay style={styles.currentDay}>
                    <City style={styles.city}>{name}</City>
                    <BigText style={styles.bigText}>{i18n.t('Today')}</BigText>
                    <BigIcon style={styles.bigIcone}
                        source={
                            imageDictionary[
                                currentWeather[0].weather[0].icon
                            ] || imageDictionary["02d"]
                        }
                    />
                    <Temp style={styles.temp}>{Math.round(currentWeather[0].main.temp)}°C</Temp>
                    <Description style={styles.description}>
                        {i18n.t(currentWeather[0].weather[0].description)}
                    </Description>
                </CurrentDay>
                <Week style={styles.week} horizontal={true} showsHorizontalScrollIndicator={false}>
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
                    bannerSize="smartBannerPortrait"
                    adUnitID="ca-app-pub-3072202765969173/2773847315" 
                    servePersonalizedAds // true or false
                    onDidFailToReceiveAdWithError={erro => {console.log(erro)}} />
                </Propaganda>
            </Container>
        )
    );
};
export default Weather;

  const styles = EStyleSheet.create({
    currentDay: {
        marginTop: '2rem'
    },
    city: {
        fontSize: '1.2rem',
        paddingBottom: '0.5rem',
    },
    bigText: {
        fontSize: '2.2rem',
        paddingBottom: '0.8rem',
    },
    bigIcone: { 
        width: '10rem',
        height: '10rem',
        paddingBottom: '0.8rem',
    },
    temp: {
        fontSize: '3rem',
    },
    description: {
        fontSize: '1.6rem',
        paddingTop: '0.6rem',
     },
    week: {
        paddingTop: '0.01rem',
        height: '10.5rem',
        marginTop: '1.5rem',
        marginBottom: '6rem',
    },
  });
