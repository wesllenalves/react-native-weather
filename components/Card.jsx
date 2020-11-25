import React from "react";
import { Day, SmallIcon, SmallText } from "./Styles";
import EStyleSheet from 'react-native-extended-stylesheet';

export default function Card({ name, icon, temp, hour }) {
  return (
    <Day style={styles.day}>
      <SmallIcon style={styles.smallIcon} source={icon} />
      <SmallText style={styles.smallText}>{name}</SmallText>
      <SmallText style={styles.smallText}>{temp}°C</SmallText>
      <SmallText style={styles.smallText}>{hour}h</SmallText>
    </Day>
  );
}

const styles = EStyleSheet.create({
  day:{ 
    width: '4rem',
    height: '10rem',
  },
  smallIcon: {
    width: '2.5rem',
    height: '2.5rem',
  },
  smallText: {
    fontSize: '1.2rem',
    marginBottom: '0.1rem',
  },

});
