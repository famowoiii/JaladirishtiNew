import React, { useState, useEffect } from "react";
import "../style/LaporkanStyle.css";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { createClient } from "@supabase/supabase-js";
import daerahList from "../Data/DaerahList.json";

const MyLaporkan = () => {
  const apikey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeGNlcG9ybm9odnhmcXlnbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NTYwNjYsImV4cCI6MjAxMTIzMjA2Nn0.5Vgf8SPA2gb78BOXJhAUcqal-hGPuGDmKUG8zXwTZBw";
  const supabaseUrl = "https://tjxcepornohvxfqygmiq.supabase.co";
  const supabaseKey = apikey;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [userLocation, setUserLocation] = useState({
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Gagal mendapatkan lokasi geolokasi:", error);
        }
      );
    } else {
      console.error("Geolokasi tidak didukung oleh browser Anda.");
    }
  }, []);

  const handleLaporkanClick = async () => {
    const { data, error } = await supabase
      .from("tabel") 
      .upsert([
        {
          data: [userLocation.latitude, userLocation.longitude],
        },
      ]);

    if (error) {
      console.error("Gagal menyimpan data ke Supabase:", error);
    } else {
      alert(
        `Laporan banjir di ${userLocation.latitude}, ${userLocation.longitude} telah dikirim!`
      );
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDaerah, setFilteredDaerah] = useState([]);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    if (!searchValue) {
      setFilteredDaerah([]); // buat ngilangin result kalo searchnya kosong
      return;
    }

    // Filter daerah berdasarkan input
    const results = daerahList
      .filter((daerah) =>
        daerah.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .slice(0, 5); // keluar top 5 result aja

    setFilteredDaerah(results);
  };

  return (
    <div className="laporkan-page">
      <section className="background-navbar"></section>
      <section className="background">
        <div className="card">
          <div className="img">
            <BsFillExclamationTriangleFill size={90} />
          </div>
          <div className="card-text">Laporkan Banjir di Daerahmu!</div>
          <input
            type="text"
            placeholder="Pilih daerah!"
            value={`${userLocation.latitude}, ${userLocation.longitude}`}
            readOnly
          />
          <button className="button-laporkan" onClick={handleLaporkanClick}>
            LAPORKAN
          </button>

          <div>
            <br />
            Lokasi anda bermasalah?
          </div>

          <div className="kiri">
            <div className="search-container">
              <div className="search-bar">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Cari Daerahmu!"
                />
              </div>

              <div className="laporan-section">
                {filteredDaerah.map((daerah) => (
                  <div key={daerah.id} className={`laporan-${daerah.id}`}>
                    <a href={daerah.link}>{daerah.name}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="extend"></section>
    </div>
  );
};

export default MyLaporkan;
