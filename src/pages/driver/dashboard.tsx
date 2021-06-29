/** @format */
import { useState, useEffect } from "react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import GoogleMapReact, { Position } from "google-map-react";
import { FULL_ORDER_FRAGMENT } from "../../fragments";
import { cookedOrders } from "../../__generated__/cookedOrders";
import { Link, useHistory } from "react-router-dom";
import { takeOrder, takeOrderVariables } from "../../__generated__/takeOrder";

const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrders {
    cookedOrders {
      ...FullOrderParts
    }
  }
  ${FULL_ORDER_FRAGMENT}
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      ok
      error
    }
  }
`;

interface ICoords {
  lat: number;
  lng: number;
}

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

  const { data: cookedOrdersData } = useSubscription<cookedOrders>(
    COOKED_ORDERS_SUBSCRIPTION
  );

  const makeRoute = () => {
    if (map) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        polylineOptions: {
          strokeColor: "#000",
          strokeOpacity: 1,
          strokeWeight: 3,
        },
      });

      directionsRenderer.setMap(map);
      directionsService.route(
        {
          origin: {
            location: new google.maps.LatLng(
              driverCoords.lat,
              driverCoords.lng
            ),
          },
          destination: {
            location: new google.maps.LatLng(
              driverCoords.lat + 0.02,
              driverCoords.lng + 0.02
            ),
          },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result) => {
          directionsRenderer.setDirections(result);
        }
      );
    }
  };
  useEffect(() => {
    if (cookedOrdersData?.cookedOrders.id) {
      makeRoute();
    }
  }, [cookedOrdersData]);

  const history = useHistory();
  const onCompleted = (data: takeOrder) => {
    if (data.takeOrder.ok) {
      history.push(`/orders/${cookedOrdersData?.cookedOrders.id}`);
    }
  };
  const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
    TAKE_ORDER_MUTATION,
    { onCompleted }
  );

  const triggerMutation = (orderId: number) => {
    takeOrderMutation({ variables: { input: { id: orderId } } });
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
        ></GoogleMapReact>
      </div>
      <div className="max-w-screen-sm mx-auto bg-white relative -top-10 shadow-lg py-8 px-5">
        {cookedOrdersData?.cookedOrders ? (
          <>
            <h1 className="text-center text-3xl font-medium">New Order</h1>
            <h1 className="text-center my-3 text-2xl font-medium">
              Pickup soon from @{" "}
              {cookedOrdersData.cookedOrders.restaurant?.name}
            </h1>

            <button
              onClick={() => triggerMutation(cookedOrdersData.cookedOrders.id)}
              className="btn w-full block text-center mt-5"
            >
              Accept Order &rarr;
            </button>
          </>
        ) : (
          <h2 className="text-center text-3xl font-medium">No orders yet</h2>
        )}
      </div>
    </div>
  );
};
