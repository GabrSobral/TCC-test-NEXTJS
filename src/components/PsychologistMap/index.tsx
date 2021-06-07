import dynamic from "next/dynamic"
import ReactLoading from 'react-loading';

function LeafLetMapPsychologist({latitude, longitude, isChangeable, content}) {

  const Map = dynamic(
    () => import('./map'),
    { 
      loading: () => (
        <ReactLoading type={"spin"} color={"#1C74E9"} height={'20%'} width={'20%'} />
      ),
      ssr: false
    }
  )
  return (
    <Map 
      latitude={latitude} 
      longitude={longitude} 
      isChangeable={isChangeable} 
      content={content}
    />
  )
}

export default LeafLetMapPsychologist