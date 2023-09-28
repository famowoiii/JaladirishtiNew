import React from "react";
import { Link } from "react-router-dom";
import "../style/TentangStyle.css";

const MyTentang = () => {
  return (
    <div>
      <div className="navbar"></div>
      <div className="tentang-wrapper">
        <div className="title">
          <h1>Selamat datang di Situs Pelaporan Banjir Kota Surabaya</h1>
          <p>
            Kami bangga mempersembahkan layanan Sistem Informasi Banjir dan
            Pelaporan Banjir terkini di Kota Surabaya. Situs ini bertujuan untuk
            memberikan informasi yang berharga dan membantu mengatasi masalah
            banjir yang ada di wilayah kami. Di sini, Anda akan menemukan
            fitur-fitur berikut:
          </p>
        </div>
        <div>
          <h3>1. Pelaporan Banjir yang Mudah</h3>
          <p>
            Situs kami memungkinkan masyarakat Kota Surabaya untuk dengan cepat
            dan mudah melaporkan kejadian banjir. Dengan beberapa langkah
            sederhana, Anda dapat memberikan informasi penting yang dapat
            membantu dalam penanganan banjir.
          </p>
        </div>
        <div>
          <h3>2. Pemetaan Potensi Banjir</h3>
          <p>
            Kami menyediakan peta interaktif yang menunjukkan potensi banjir di
            tiap kelurahan di Kota Surabaya. Anda dapat menjelajahi peta ini
            untuk mengetahui wilayah-wilayah yang berisiko tinggi terhadap
            banjir. Informasi ini sangat berharga untuk perencanaan dan mitigasi
            bencana.
          </p>
        </div>

        <div>
          <h3>3. Statistik Laporan Banjir</h3>
          <p>
            Kami juga memberikan informasi statistik terkini mengenai jumlah
            laporan banjir yang telah kami terima. Data ini membantu kami dan
            pihak berwenang dalam memahami dampak banjir di kota kami dan
            merancang solusi yang lebih efektif.
          </p>
        </div>
        <p>
          Kami berkomitmen untuk terus meningkatkan layanan kami guna memberikan
          informasi yang lebih baik dan membantu masyarakat Surabaya dalam
          menghadapi tantangan banjir. Terima kasih telah menggunakan situs
          kami. Jika Anda memiliki pertanyaan, saran, atau masukan, jangan ragu
          untuk menghubungi tim kami. Bersama-sama, kita dapat menjadikan Kota
          Surabaya lebih tahan terhadap banjir.
        </p>
      </div>
    </div>
  );
};
export default MyTentang;
