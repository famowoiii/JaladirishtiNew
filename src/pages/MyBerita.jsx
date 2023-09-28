import React from "react";
import { Link } from "react-router-dom";
import "../style/BeritaStyle.css";
const MyBerita = () => {
  //function yang bisa ambil data dari API
  return (
    <div className="berita">
      <div className="navbar"></div>
      <div className="berita-wrapper">
        <h1>Berita Banjir di Surabaya</h1>
        <p>berita terbaru </p>
        <div card-wrapper>
          <div className="card-berita">
            <img src="src\assets\react.svg" alt="" />
            <div className="keterangan">
              <p className="deskripsi">ini deskripsi</p>
              <p className="date">--ini tanggal--</p>
            </div>
          </div>
        </div>
      </div>
      <div className="berita-side">
        <h3>Berita Populer</h3>
        <div className="berita-populer">
          <div>
            <img src="src\assets\react.svg" alt="" />
            <div className="deskripsi">ini adalah deksripsi berita</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyBerita;
