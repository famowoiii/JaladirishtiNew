import React, { useState, useEffect } from "react";
import beritaData from "../data/dataBeritaNew.json"; // Import data JSON langsung
import "../style/BeritaStyle.css";

const MyBerita = () => {
  const [data, setData] = useState(beritaData); // Gunakan data langsung sebagai state awal

  return (
    <div className="berita">
      <div className="navbar"></div>
      <div className="berita-wrapper">
        <h1>Berita Banjir di Surabaya</h1>
        <p>berita terbaru </p>
        <div className="card-wrapper">
          {data.map((item) => (
            <div key={item.id} className="card-berita">
              <img src={item.download_url} alt={item.title} />
              <div className="keterangan">
                <h3 className="title">{item.title}</h3>
                <p className="deskripsi">{item.author}</p>
                <a
                  className="link-berita"
                  href={item.linkberita}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tautan
                </a>
                <p className="date">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="berita-side">
        <h3>Berita Populer</h3>
        <div className="berita-populer">
          {data.slice(0, 3).map((item) => (
            <div key={item.id}>
              <img src={item.download_url} alt={item.title} />
              <h4 className="title">{item.title}</h4>
              <p className="date">{item.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBerita;
