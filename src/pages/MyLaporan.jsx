import React, { useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import "../style/LaporanStyle.css";
import MapPreview from "../components/MapPreview";
import daerahList from "../Data/DaerahList.json";
import { AiOutlineSend } from "react-icons/ai";

const MyLaporan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDaerah, setFilteredDaerah] = useState([]);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    if (!searchValue) {
      setFilteredDaerah([]);
      return;
    }

    const results = daerahList
      .filter((daerah) =>
        daerah.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .slice(0, 3);

    setFilteredDaerah(results);
  };

  return (
    <div>
      <div className="navbar"></div>
      <div className="laporan-wrapper">
        <div className="search-bar">
          <div className="title">
            <h1>Laporan Kelurahan </h1>
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="Cari Derahmu"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button>Cari</button>
            <div className="search-results">
              {filteredDaerah.map((daerah) => (
                <div key={daerah.id}>
                  <a href={daerah.link}>{daerah.name}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="kiri">
            <div className="kiri-content">
              <div className="map">
                <MapPreview />
              </div>
              <div className="submit-komentar">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Tambah Komentar...."
                  className="input-komentar"
                />
                <button className="kirim">
                  <AiOutlineSend className="send-icon" />
                </button>
              </div>
            </div>
            <div className="komentar-title">
              <h3>Komentar</h3>
            </div>
            <div className="komentar">
              <div className="riwayat-laporan">
                <div className="riwayat-laporan-1">
                  <BiUserCircle className="user-logo" size={40} />
                  <span>{"User 1"}</span>
                </div>
                <div className="riwayat-laporan-2">
                  <BiUserCircle className="user-logo" size={40} />
                  <span>{"User 2"}</span>
                </div>
                <div className="riwayat-laporan-3">
                  <BiUserCircle className="user-logo" size={40} />
                  <span>{"User 3"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="kanan">
            <div className="chart">
              <div className="chart-laporan">
                ini adalah grafik, kayanya harus pake API chart ya
              </div>
              <div className="laporan-kelurahan">
                `${"laporan per-"}Kelurahan`
              </div>
              <div className="laporan-keseluruhan">
                `${"laporan"} keseluruhan`
              </div>
            </div>
            <div className="konfirmasi">
              <h2>Laporkan Kondisi Saat Ini</h2>
              <button className="masih">Daerah ini masih terjadi banjir</button>
              <button className="tidak">Daerah ini tidak terjadi banjir</button>
              <button className="surut">Banjir Sudah Mulai Surut</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLaporan;
