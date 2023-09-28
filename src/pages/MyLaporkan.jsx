import React, { useState, useEffect } from "react";
import "../style/LaporkanStyle.css";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { createClient } from "@supabase/supabase-js";

const MyLaporkan = () => {
  const apikey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeGNlcG9ybm9odnhmcXlnbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NTYwNjYsImV4cCI6MjAxMTIzMjA2Nn0.5Vgf8SPA2gb78BOXJhAUcqal-hGPuGDmKUG8zXwTZBw";
  const supabaseUrl = "https://tjxcepornohvxfqygmiq.supabase.co";
  const supabaseKey = apikey;
  // Perhatikan perubahan ini
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
      .from("tabel") // Ganti "nama_tabel" dengan nama tabel Anda
      .upsert([
        {
          // Data yang akan dimasukkan ke dalam tabel
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
        </div>
      </section>
      <section className="extend"></section>
    </div>
  );
};

export default MyLaporkan;
