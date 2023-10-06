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
      .slice(0, 1);
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
      // BE
    }
  };

  const decreaseVote = () => {
    if (window.confirm("Apakah Anda yakin daerah ini tidak terjadi banjir?")) {
      // BE
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
    <div className="full-cover">
      <div className="navbar"></div>

      {/* Bagian header */}
      <header className="pb-0 mb-0 border-bottom transparent-bg d-flex justify-content-between align-items-center">
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
          <div className="search-results">
            {filteredDaerah.map((daerah) => (
              <div key={daerah.id}>
                <Link to={daerah.link}>{daerah.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="p-0 mb-0 bg-body-tertiary rounded-3">
        <div className="container-fluid py-3">
          <h1 className="display-10 fw-bold">Peta Lokasi Banjir Surabaya</h1>
          <div className="map">
            <MapPreview />
          </div>
        </div>
      </div>

      {/* Konten utama */}
      <div className="container-fluid py-0">
        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-bg-dark rounded-3">
              {/* Bagian konfirmasi */}
              <div className="konfirmasi mb-0">
                <h2>Laporkan Kondisi Saat Ini</h2>
                <button className="masih" onClick={increaseVote}>
                  Daerah ini masih terjadi banjir
                </button>
                <button className="tidak" onClick={decreaseVote}>
                  Daerah ini tidak terjadi banjir
                </button>
              </div>

              {/* Bagian komentar */}
              <div className="komentar">
                <div className="riwayat-laporan">
                  {komentarData.slice().map((komentar, index) => (
                    <div key={index}>
                      <BiUserCircle className="user-logo" size={40} />
                      <span className="komentar-text">{komentar.komentar}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bagian submit komentar */}
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
          </div>

          <div className="col-md-6">
            <div className="h-100 p-5 bg-body-tertiaryy border rounded-3">
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
                    height={450}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLaporan;
