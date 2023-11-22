"use client";
import { Map, NavigationControl, MapProvider, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MapPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <MapProvider>
        <Map
          id="quizMap"
          mapboxAccessToken="pk.eyJ1IjoibWFyY29lc2NhbGVpcmFkbXUiLCJhIjoiY2xwN29ldHIwMG16bjJxbXJhZXc5dXUxOSJ9.ZP0gYeYBB-nL5py2RANUOw"
          initialViewState={{
            longitude: 5,
            latitude: 46,
            zoom: 4,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
        >
          <NavigationControl position="bottom-right" showCompass />
        </Map>
      </MapProvider>
    </div>
  );
}
