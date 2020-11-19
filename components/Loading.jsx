import React from "react";
import imageDictionary from "../utils/imageDictionary.js";
import { Container, BigText, BigIcon, Description } from "./Styles";
import { i18n } from "../utils/i18n";

const Loading = (props) => {
  return (
    <Container>
      <BigText>{i18n.t('Welcome')}!</BigText>
      <BigIcon source={imageDictionary["01d"]} />
      <Description>{i18n.t('Loading')}...</Description>
    </Container>
  );
};
export default Loading;
