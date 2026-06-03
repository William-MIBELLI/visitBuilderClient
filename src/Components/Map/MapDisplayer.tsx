import { Map } from "@vis.gl/react-google-maps"

const MapDisplayer = () => {

  return (
    <div className="size-full">
      <Map defaultZoom={13} defaultCenter={{ lat: 43.60426, lng: 1.44367}}>

      </Map>
    </div>
  )
}

export default MapDisplayer