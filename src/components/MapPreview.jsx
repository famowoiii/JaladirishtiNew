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
        radius: 20,
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

    // Tentukan lokasi tiga daerah
    const locations = [
      [112.745596, -7.263907], // Lokasi 1
      [112.7156860800001, -7.3016159899999407], // Lokasi 2
      [112.71433788000002, -7.2561140099999939],
      [112.66010473546623, -7.2446924516217166],
    ];

    // Buat titik merah untuk masing-masing lokasi
    locations.forEach((loc) => {
      const redCircleFeature = new Feature({
        geometry: new Point(fromLonLat(loc)),
      });
      redCircleSource.addFeature(redCircleFeature);
    });

    const geojsonSource = new VectorSource({
      url: "./ADMINISTRASIDESA_AR_25K_Feat.json",
      format: new GeoJSON(),
    });

    const geojsonLayer = new VectorLayer({
      source: geojsonSource,
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
