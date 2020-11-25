import React from "react";
import imageDictionary from "../utils/imageDictionary.js";
import { Container, BigText, BigIcon, Description } from "./Styles";
import { i18n } from "../utils/i18n";
import EStyleSheet from 'react-native-extended-stylesheet';

const Loading = (props) => {
  return (
    <Container>
      <BigText style={styles.bigText}>{i18n.t('Welcome')}!</BigText>
      <BigIcon style={styles.bigIcon} source={imageDictionary["01d"]} />
      <Description style={styles.description}>{i18n.t('Loading')}...</Description>
    </Container>
  );
};
export default Loading;

const styles = EStyleSheet.create({
  bigIcon: {
    width: '10rem',
        height: '10rem',
        paddingBottom: '0.8rem',
  },
  bigText: {
    fontSize: '2.2rem',
    paddingBottom: '0.8rem',
  },
  description: {
    fontSize: '1.6rem',
    paddingTop: '0.6rem',
  },
});
