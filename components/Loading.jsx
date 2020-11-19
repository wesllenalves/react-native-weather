import React from "react";
import imageDictionary from "../utils/imageDictionary.js";
import { Container, BigText, BigIcon, Description } from "./Styles";

const Loading = (props) => {
  return (
    <Container>
      <BigText>Bem-vindo!</BigText>
      <BigIcon source={imageDictionary["01d"]} />
      <Description>Carregando...</Description>
    </Container>
  );
};
export default Loading;
