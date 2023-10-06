import React, { useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import "./MapPreviewStyle.css";

export const MapPreview2 = () => {
  useEffect(() => {
    const map = new Map({
      target: "map2",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([112.745596, -7.263907]),
        zoom: 11.4,
      }),
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div>
      <div id="map2"></div>
    </div>
  );
};
