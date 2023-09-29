import React, { useState, useEffect } from "react";
import { BiUserCircle } from "react-icons/bi";
import "../style/LaporanStyle.css";
import MapPreview from "../components/MapPreview";
import daerahList from "../Data/DaerahList.json";
import { AiOutlineSend } from "react-icons/ai";
import ReactApexChart from "react-apexcharts";
import chartData from "../Data/chartDataBanjir.json";
import { Link, useParams } from "react-router-dom";

const MyLaporan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDaerah, setFilteredDaerah] = useState([]);
  const [currentChartData, setCurrentChartData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const data = chartData.find((data) => parseInt(data.id) === parseInt(id));

    if (data) {
      setCurrentChartData(data);
    } else {
      setCurrentChartData(chartData.find((data) => data.id === "2"));
    }
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

  const increaseVote = () => {
    if (window.confirm("Apakah Anda yakin daerah ini masih terjadi banjir?")) {
      // Kode untuk menambah vote...
      if (currentChartData) {
        const today = new Date().toISOString().split("T")[0];
        const index = currentChartData.data.dates.findIndex(
          (date) => date === today
        );

        if (index !== -1) {
          const updatedVotes = [...currentChartData.data.votes];
          updatedVotes[index]++;
          setCurrentChartData({
            ...currentChartData,
            data: {
              ...currentChartData.data,
              votes: updatedVotes,
            },
          });
        }
      }
    }
  };

  const decreaseVote = () => {
    if (window.confirm("Apakah Anda yakin daerah ini tidak terjadi banjir?")) {
      // Kode untuk mengurangi vote...
      if (currentChartData) {
        const today = new Date().toISOString().split("T")[0];
        const index = currentChartData.data.dates.findIndex(
          (date) => date === today
        );

        if (index !== -1) {
          const updatedVotes = [...currentChartData.data.votes];
          updatedVotes[index]--;
          setCurrentChartData({
            ...currentChartData,
            data: {
              ...currentChartData.data,
              votes: updatedVotes,
            },
          });
        }
      }
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
                  <span>User 1</span>
                </div>
                <div className="riwayat-laporan-2">
                  <BiUserCircle className="user-logo" size={40} />
                  <span>User 2</span>
                </div>
                <div className="riwayat-laporan-3">
                  <BiUserCircle className="user-logo" size={40} />
                  <span>User 3</span>
                </div>
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
