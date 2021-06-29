/** @format */
import GoogleMapReact, { Position } from "google-map-react";
import { useState } from "react";
import { useEffect } from "react";

interface ICoords {
  lat: number;
  lng: number;
}

interface IDriverProps {
  lat: number;
  lng: number;
  $hover?: any;
}

const Driver: React.FC<IDriverProps> = () => <div className="text-3xl">🚙</div>;

export const Dashboard = () => {
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
  const [map, setMap] = useState<google.maps.Map>();
  const [maps, setMaps] = useState<any>();

  //@ts-ignore
  const onSuccess = ({ coords: { latitude, longitude } }: Position) => {
    setDriverCoords({ lat: latitude, lng: longitude });
  };
  // @ts-ignore
  const onError = (error: PositionError) => {
    console.log(error);
  };

  useEffect(() => {
    // @ts-ignore
    navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });
  }, []);

  useEffect(() => {
    if (map && maps) {
      map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
      // const geocoder = new google.maps.Geocoder();
      // geocoder.geocode(
      //   {
      //     location: new google.maps.LatLng(driverCoords.lat, driverCoords.lng),
      //   },
      //   (results, status) => {
      //     console.log(status, results);
      //   }
      // );
    }
  }, [driverCoords.lat, driverCoords.lng]);

  const onApiLoaded = ({ map, maps }: { map: any; maps: any }) => {
    setMap(map);
    setMaps(maps);
    map.panTo(new google.maps.LatLng(driverCoords.lat, driverCoords.lng));
  };

  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "50vh" }}
      >
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={onApiLoaded}
          defaultCenter={{ lat: 21.95, lng: 86.09 }}
          defaultZoom={15}
          bootstrapURLKeys={{ key: "AIzaSyBpuPc7v92_lOY6aVoT8pqG-fpthbHN3Bc" }}
          draggable={false}
        >
          <Driver lat={driverCoords.lat} lng={driverCoords.lng} />
        </GoogleMapReact>
      </div>
    </div>
  );
};
