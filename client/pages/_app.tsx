import { FC } from "react";
import "./map.css";

const CustomApp:FC<any> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
}

export default CustomApp;
