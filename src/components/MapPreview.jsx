import React, { useEffect, useState } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Style, Circle, Fill, Stroke } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";

import "./MapPreview2Style.css";

const MapPreview = () => {
  const [redCircleSource, setRedCircleSource] = useState(new VectorSource());

  useEffect(() => {
    const redCircleStyle = new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: "red" }),
        stroke: new Stroke({ color: "black", width: 0.5 }),
      }),
    });

    const redCircleLayer = new VectorLayer({
      source: redCircleSource,
      style: redCircleStyle,
    });

    const map = new Map({
      target: "map1",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        redCircleLayer,
      ],
      view: new View({
        center: fromLonLat([112.745596, -7.263907]),
        zoom: 11.4,
      }),
    });

    // Ambil data lokasi dari database atau sumber data eksternal lainnya
    fetch("URL_DATABASE_ATAU_API")
      .then((response) => response.json())
      .then((data) => {
        if (data.latitude && data.longitude) {
          // Buat redCircleFeature berdasarkan data dari database
          const redCircleFeature = new Feature({
            geometry: new Point(fromLonLat([data.longitude, data.latitude])),
          });
          redCircleSource.addFeature(redCircleFeature);

          // Set center view peta berdasarkan data dari database
          map.getView().setCenter(fromLonLat([data.longitude, data.latitude]));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    const geojsonSource = new VectorSource({
      url: "./ADMINISTRASIDESA_AR_25K_Feat.json",
      format: new GeoJSON(),
    });

    const geojsonLayer = new VectorLayer({
      source: geojsonSource,
      // Customize styles and properties as needed
    });

    map.addLayer(geojsonLayer);

    return () => {
      map.setTarget(null);
    };
  }, [redCircleSource]);

  return (
    <div className="map-preview">
      <div id="map1" className="map-container"></div>
    </div>
  );
};

export default MapPreview;
