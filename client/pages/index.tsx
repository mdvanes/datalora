import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
// import Map from "../components/Map";
import dynamic from 'next/dynamic'
// import "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
import Head from 'next/head'

const DynamicMapWithNoSSR = dynamic(
  () => import('../components/Map'),
  { ssr: false }
)

// const DynamicLazyComponent = dynamic(() => import('../components/Map'), {
//   suspense: true,
// })

export default function Home() {
  // TODO see https://github.com/PaulLeCam/react-leaflet/issues/45
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <>
    <Head>
        <link
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          rel="stylesheet"
        />
      </Head>
      <DynamicMapWithNoSSR />
    </>
  );
}
