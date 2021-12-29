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
      {/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/> */}
        <link
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          rel="stylesheet"
        />
      </Head>
      <DynamicMapWithNoSSR />
      {/* <Suspense fallback={`loading`}>
        <DynamicLazyComponent />
      </Suspense> */}
      <ul>
        <li>
          <Link href="/a" as="/a">
            <a>a</a>
          </Link>
        </li>
        <li>
          <Link href="/b" as="/b">
            <a>b</a>
          </Link>
        </li>
      </ul>
    </>
  );
}
