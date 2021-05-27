import dynamic from "next/dynamic"
import ReactLoading from 'react-loading';

function LeafLetMap({latitude, longitude}) {

  const Map = dynamic(
    () => import('./map'),
    { 
      loading: () => (
        <ReactLoading type={"spin"} color={"#1C74E9"} height={'20%'} width={'20%'} />
      ),
      ssr: false
    }
  )
  return <Map latitude={latitude} longitude={longitude}/>
}

export default LeafLetMap