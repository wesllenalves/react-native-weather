import React from "react";
import { isSameDay, format } from "date-fns";
import imageDictionary from "../utils/imageDictionary.js";
import Card from "./Card";
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import {
    Container,
    CurrentDay,
    City,
    BigText,
    BigIcon,
    Temp,
    Description,
    Week,
} from "./Styles";


// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
    en: { 
        Today: 'Hoje',
        Sunday: 'Domingo',
        Monday: 'Segunda-feira',
        Tuesday: 'Terça-feira',
        Wednesday: 'Quarta-feira',
        Thursday: 'Quinta-feira',
        Friday: 'Sexta-feira',
        Saturday: 'Sábado',

    },
  };
  // Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
  // When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;

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
                        {currentWeather[0].weather[0].description}
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
            </Container>
        )
    );
};
export default Weather;
