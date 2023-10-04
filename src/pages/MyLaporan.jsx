import React, { useState, useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";
import "../style/LaporanStyle.css";
import MapPreview from "../components/MapPreview";
import daerahList from "../Data/DaerahList.json";
import { AiOutlineSend } from "react-icons/ai";
import ReactApexChart from "react-apexcharts";
import chartData from "../Data/chartDataBanjir.json";
import { Link, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tjxcepornohvxfqygmiq.supabase.co";
const supabaseApiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqeGNlcG9ybm9odnhmcXlnbWlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NTYwNjYsImV4cCI6MjAxMTIzMjA2Nn0.5Vgf8SPA2gb78BOXJhAUcqal-hGPuGDmKUG8zXwTZBw";

const MyLaporan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDaerah, setFilteredDaerah] = useState([]);
  const [currentChartData, setCurrentChartData] = useState(null);
  const [komentarValue, setKomentarValue] = useState("");
  const [komentarData, setKomentarData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const data = chartData.find((data) => parseInt(data.id) === parseInt(id));
    if (data) {
      setCurrentChartData(data);
    } else {
      setCurrentChartData(chartData.find((data) => data.id === "2"));
    }
    fetchKomentarData();
  }, [id]);

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

  const fetchKomentarData = async () => {
    const supabase = createClient(supabaseUrl, supabaseApiKey);
    const { data, error } = await supabase.from("Komentar").select("komentar");
    if (data) {
      setKomentarData(data);
    }
    if (error) {
      console.error("Error fetching komentar:", error);
    }
  };

  const handleKirimKomentar = async () => {
    const supabase = createClient(supabaseUrl, supabaseApiKey);
    const { data, error } = await supabase
      .from("Komentar")
      .insert([{ komentar: komentarValue }]);
    if (error) {
      console.error("Error adding komentar:", error);
    } else {
      setKomentarValue("");
      fetchKomentarData();
    }
  };

  const increaseVote = () => {
    if (window.confirm("Apakah Anda yakin daerah ini masih terjadi banjir?")) {
      // Logic to increase vote...
    }
  };

  const decreaseVote = () => {
    if (window.confirm("Apakah Anda yakin daerah ini tidak terjadi banjir?")) {
      // Logic to decrease vote...
    }
  };

  const chartOptions = {
    chart: {
      type: "area",
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Grafik Laporan Banjir",
      align: "left",
    },
    subtitle: {
      text: "Perhitungan Laporan",
      align: "left",
    },
    labels: currentChartData ? currentChartData.data.dates : [],
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  return (
    <div>
      <div className="navbar"></div>
      <div className="laporan-wrapper">
        <div className="search-bar">
          <div className="title">
            <h1>Laporan Banjir</h1>
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
                  <Link to={daerah.link}>{daerah.name}</Link>
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
                  placeholder="Tambah Komentar...."
                  className="input-komentar"
                  value={komentarValue}
                  onChange={(e) => setKomentarValue(e.target.value)}
                />
                <button className="kirim" onClick={handleKirimKomentar}>
                  <AiOutlineSend className="send-icon" />
                </button>
              </div>
            </div>
            <div className="komentar-title">
              <h3>Komentar</h3>
            </div>
            <div className="komentar">
              <div className="riwayat-laporan">
                {komentarData.slice(0, 5).map((komentar, index) => (
                  <div key={index}>
                    <BiUserCircle className="user-logo" size={40} />
                    <span className="komentar-text">{komentar.komentar}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="kanan">
            <div className="chart">
              <div className="chart-laporan">
                <ReactApexChart
                  options={chartOptions}
                  series={
                    currentChartData
                      ? [
                          {
                            name: "LAPORAN",
                            data: currentChartData.data.votes,
                          },
                        ]
                      : []
                  }
                  type="area"
                  height={350}
                />
              </div>
            </div>
            <div className="konfirmasi">
              <h2>Laporkan Kondisi Saat Ini</h2>
              <button className="masih" onClick={increaseVote}>
                Daerah ini masih terjadi banjir
              </button>
              <button className="tidak" onClick={decreaseVote}>
                Daerah ini tidak terjadi banjir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLaporan;
