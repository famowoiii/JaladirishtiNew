import React, { useEffect, useState } from "react";
import "../style/MapPotensiStyle.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { fromLonLat } from "ol/proj";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import Overlay from "ol/Overlay";

const MapPotensi = () => {
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    // Cleanup function to destroy the map when the component unmounts
    return () => {
      if (popup) {
        popup.setMap(null); // Remove the overlay from the map
      }
    };
  }, [popup]);

  useEffect(() => {
    const map = new Map({
      target: "map",
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

    const popupElement = document.createElement("div");
    popupElement.className = "ol-popup";
    const popup = new Overlay({
      element: popupElement,
      autoPan: true,
      autoPanAnimation: {
        duration: 400,
      },
    });
    map.addOverlay(popup);
    setPopup(popup);

    const style = new Style({
      fill: new Fill({
        color: "aqua",
        opacity: 0.7,
      }),
      stroke: new Stroke({
        color: "black",
      }),
    });

    const surabaya = new VectorLayer({
      source: new VectorSource({
        url: "./ADMINISTRASIDESA_AR_25K_Feat.json",
        format: new GeoJSON(),
      }),
      style: style,
    });

    map.addLayer(surabaya);

    // Fetch 'sheet001.json'
    fetch("./sheet001.json")
      .then((response) => response.json())
      .then((sheetData) => {
        map.on("click", (event) => {
          map.forEachFeatureAtPixel(event.pixel, (feature) => {
            const properties = feature.getProperties();
            const idFromGeoJSON = properties.FID; // ID from 'ADMINISTRASIDESA_AR_25K_Feat.json'

            // Find the corresponding object in 'sheet001.json' based on id
            const matchingObject = sheetData.find(
              (sheetItem) => sheetItem.OBJECTID === idFromGeoJSON
            );

            if (matchingObject) {
              const aveGridcode = matchingObject.Ave_gridcode;
              console.log("ave_gridcode:", aveGridcode);

              const kecamatan = properties.WADMKC;
              const kelurahan = properties.NAMOBJ;
              const potensi = () => {
                if (aveGridcode < 1.5) {
                  return "aman";
                } else if (aveGridcode < 3) {
                  return "sedang";
                } else {
                  return "bahaya";
                }
              };

              const content = `<p>Kecamatan: ${kecamatan}</p>
                                <p>Kelurahan: ${kelurahan}</p>
                                <p>Potensi: ${potensi()}</p>`;

              popupElement.innerHTML = content;
              popup.setPosition(event.coordinate);
            }
          });
        });
      })
      .catch((error) => {
        console.error("Error fetching 'sheet001.json':", error);
      });

    // Return a cleanup function to destroy the map when the component unmounts
    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div className="map1">
      <div className="map-wrapper">
        <div id="map"> </div>
      </div>
    </div>
  );
};

export default MapPotensi;
