/** @format */
import GoogleMapReact from "google-map-react";

export const Dashboard = () => {
  return (
    <div>
      <div
        className="overflow-hidden"
        style={{ width: window.innerWidth, height: "95vh" }}
      >
        <GoogleMapReact
          defaultCenter={{ lat: 59.95, lng: 30.33 }}
          defaultZoom={20}
          bootstrapURLKeys={{ key: "AIzaSyBpuPc7v92_lOY6aVoT8pqG-fpthbHN3Bc" }}
        >
          <h1>Hello</h1>
        </GoogleMapReact>
      </div>
    </div>
  );
};
