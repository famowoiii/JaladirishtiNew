import React from "react";
import "../style/BerandaStyle.css";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import { BeritaSlider } from "../components/BeritaSlider";
import MapPotensi from "../function/MapPotensi";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import DarkVariantExample from "../components/Topografi";
import "../Data/DataBerita.json";
import { MapPreview2 } from "../components/MapPreview2";
import { Modal, Button } from "react-bootstrap";
import "react-bootstrap/dist/react-bootstrap";
//Ini buat map search sementara
import daerahList from "../Data/DaerahList.json";

import MapPreview from "../components/MapPreview";

//import component yang berisikan keterangan untnuk button pada section 7
import { Step1 } from "../PagesTutorial/Membersihkan";
import { Step2 } from "../PagesTutorial/Membuang";
import { Step3 } from "../PagesTutorial/Menanam";
import { Step4 } from "../PagesTutorial/Mengurangi";
import { useState } from "react";

const MyBeranda = (props) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    // Tambahkan kode untuk menampilkan modal di sini
    if (showModal) {
      handleShowModal();
    }
  }, [showModal]);

  const handleShowModal = () => {
    // Logika untuk menampilkan modal
  };

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      const locationData = JSON.parse(storedLocation);
      setUserLocation(locationData);
    }
  }, []);

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      const locationData = JSON.parse(storedLocation);
      setUserLocation(locationData);
    }
  }, []);
  const [userLocation, setUserLocation] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const requestLocationPermission = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const userLocationData = {
            latitude: latitude,
            longitude: longitude,
          };
          // Menyalin data lokasi pengguna sebelumnya dari state
          const existingData = [...userLocation];
          // Menambahkan lokasi baru ke dalam array
          existingData.push(userLocationData);
          // Simpan lokasi pengguna ke localStorage
          localStorage.setItem("userLocation", JSON.stringify(existingData));
          // Perbarui state userLocation dengan data yang sudah ada
          setUserLocation(existingData);
          setInputValue(`${latitude}, ${longitude}`);
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation tidak didukung oleh browser Anda.");
    }
  };

  const [Active, setActive] = useState(null);

  const handleButton = (step) => {
    setActive(step);
  };

  //INI BUAT SEARCH
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDaerah, setFilteredDaerah] = useState([]);

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    if (!searchValue) {
      setFilteredDaerah([]); // Kosongkan daftar jika input kosong
      return;
    }

    // Filter daerah berdasarkan input
    const results = daerahList
      .filter((daerah) =>
        daerah.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .slice(0, 5); // Memotong hasil agar hanya menampilkan 5 pertama

    setFilteredDaerah(results);
  };

  return (
    <div>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Large Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Isi konten modal di sini */}
          <Button variant="danger">Daerah ini masih terjadi banjir</Button>
          <Button variant="primary">Daerah ini Sudah Tidak Banjir</Button>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      {/* Section-1 Start */}
      <section className="section-1">
        <div className="section-1-text">
          <h1>Jaladirishti</h1>
          <p>
            Layanan Sistem Informasi Banjir dan Pelaporan Banjir di Kota
            Surabaya
          </p>

          <button id="btn-laporkan-banjir" onClick={requestLocationPermission}>
            <Link to="/laporkan" className="btn-laporkan-banjir">
              Laporkan Banjir!
            </Link>
          </button>
        </div>
        <svg viewBox="0 0 1440 320" className="svg-1">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,192L80,202.7C160,213,320,235,480,229.3C640,224,800,192,960,186.7C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* Section-2 Start */}
      <section className="section-2">
        <div className="section-2-wrapper">
          <div className="section-2-text">
            <h2>
              Tentang
              <br />
              Banjir di Surabaya
            </h2>
            <p>
              kota Surabaya dengan luas daerah daratan sebesar 33.048 Hektar
              menjadikannya salah satu kota besar di Pulau Jawa. Secara
              topografi subaya memiliki ketinggian 3-6 meter di atas permukaan
              air laut. Secara geografis, Kota Surabaya terletak di hilir daerah
              aliran sungai (DAS) Brantas yang bermuara di selat Madura.
              Terdapat beberapa sungai yang mengaliran air banjir dari hulu
              melewati Kota Surabaya sehingga Kota Surabaya memiliki
              potensi bencana banjir.
            </p>
          </div>
          <div>
            <img
              src="src\assets\Aset - Tentang Surabaya.png"
              alt=""
              className="img-tentang-surabaya"
            />
          </div>
        </div>
      </section>

      {/*SVG pemisah TARUH SINI*/}

      {/* Section-3 Start*/}

      <section className="section-3">
        <svg viewBox="0 0 1440 320" className="svg-1 svg-flip-pertama">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,192L80,202.7C160,213,320,235,480,229.3C640,224,800,192,960,186.7C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>

        <div className="section-3-wrapper">
          <div className="kiri">
            <div className="search-bar">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Cari Daerahmu!"
              />
              <button id="button-search">Cari</button>
            </div>

            <div className="laporan-section">
              {filteredDaerah.map((daerah) => (
                <div key={daerah.id} className={`laporan-${daerah.id}`}>
                  <a href={daerah.link}>{daerah.name}</a>
                </div>
              ))}
            </div>
          </div>

          <div className="kanan">
            <MapPreview />
          </div>
        </div>

        <svg viewBox="0 0 1440 320" className="svg-1">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,192L80,202.7C160,213,320,235,480,229.3C640,224,800,192,960,186.7C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* section-4*/}
      <section className="section-4">
        <div className="section-4-wrapper">
          <h2>Peta Potensi Banjir di Surabaya</h2>

          <MapPotensi />

          <div className="map-text">
            <BsFillExclamationCircleFill className="" />
            silahkan pilih daerah di area Peta Kota Surabaya untuk melihat
            tingkat resiko banjir
          </div>
        </div>
      </section>

      {/* section-5*/}
      <section className="section-5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,64L80,90.7C160,117,320,171,480,165.3C640,160,800,96,960,69.3C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
        <div className="section-5-wrapper">
          <div className="img">
            <DarkVariantExample />
          </div>
          <div className="section-5-text">
            <h3>
              Topografi Wilayah
              <br />
              Data Raster Overlay Potensi Banjir
            </h3>
            <p>
              Secara tpografi Surabaya memiliki ketinggian 3-6 meter di atas
              permukaan laut. Secara geografis, Kota Surabaya terletak di hilir
              daerah aliran sungai (DAS) Brantas yang bermuara di Selat Madura
            </p>
            <div className="legenda">
              <div className="aman"></div>
              <div className="berpotensi"></div>
              <div className="sangat berpotensi"></div>
            </div>
          </div>
        </div>
        <svg viewBox="0 0 1440 320" className="svg-1">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,192L80,202.7C160,213,320,235,480,229.3C640,224,800,192,960,186.7C1120,181,1280,203,1360,213.3L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </section>

      {/* section-6*/}
      <section className="section-6">
        <div className="section-6-wrapper">
          <div className="section-6-text">Berita Banjir di Surabaya</div>
          <div>
            <BeritaSlider deviceType={props.deviceType} />
          </div>
        </div>
      </section>

      {/* section-7*/}
      <section className="section-7">
        <div className="section-7-wrapper">
          <div className="section-7-title">
            <h2>UPAYA UPAYA MENCEGAH BANJIR</h2>
          </div>
          <div className="section-7-content">
            <div className="tutorial">
              <button
                className="tutorial-1"
                onClick={() => handleButton("Step1")}
              >
                <p>1</p>
                <p>Membersihkan Lingkungan & Saluran Air</p>
              </button>
              <button
                className="tutorial-2"
                onClick={() => handleButton("Step2")}
              >
                <p>2</p>
                <p>Membuang Sampah Pada Tempatnya</p>
              </button>
              <button
                className="tutorial-3"
                onClick={() => handleButton("Step3")}
              >
                <p>3</p>
                <p>Menanam Pohon di Sekitar Area Rumah</p>
              </button>
              <button
                className="tutorial-4"
                onClick={() => handleButton("Step4")}
              >
                <p>4</p>
                <p>Mengurangi Penggunaan Plastik</p>
              </button>
            </div>
            <div className="section-7-img">
              <p>
                {Active === "Step1" && <Step1 />}
                {Active === "Step2" && <Step2 />}
                {Active === "Step3" && <Step3 />}
                {Active === "Step4" && <Step4 />}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section-8*/}
      <section className="section-8">
        <div className="section-8-wrapper">
          <div className="footer-title">
            <h4>Jaladirishti</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
              earum sed doloremque blanditiis! Architecto nesciunt minus ex
              incidunt, minima perferendis neque atque provident, aut error
              repellat voluptates sint dolor ea.
            </p>
          </div>
          <div className="footer-menu">
            <div className="Beranda-button">
              <h4>Beranda</h4>{" "}
              <Link to="/" className="link">
                Beranda
              </Link>
            </div>
            <div className="laporan-button">
              <h4>Laporan</h4>{" "}
              <Link to="/laporan" className="link">
                Laporan
              </Link>
            </div>
            <div className="berita-button">
              <h4>Berita</h4>{" "}
              <Link to="/berita" className="link">
                berita
              </Link>
            </div>
            <div className="tentang-button">
              <h4>Tentang</h4>{" "}
              <Link to="/tentang" className="link" s>
                tentang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyBeranda;
