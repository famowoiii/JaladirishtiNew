import React from "react";
import "./style/Membersihkan.css";
import ecoSVG from "../assets-2/eco.svg";

export const Step4 = () => {
  return (
    <div className="flex-container">
      <div className="svg-box">
        <img src={ecoSVG} alt="Ilustrasi Eco friendly" />
      </div>
      <div className="content-box">
        <h2>Mengurangi Penggunaan Plastik</h2>
        <p>
          Mengurangi penggunaan plastik adalah langkah penting dalam upaya
          pencegahan banjir di Kota Surabaya. Plastik yang dibuang sembarangan
          dapat menyumbat saluran air, menghambat aliran air hujan, dan
          menyebabkan genangan air. Dengan meminimalkan penggunaan plastik
          sekali pakai, kita dapat mengurangi sampah plastik yang mencemari
          lingkungan dan saluran air. Tindakan sederhana ini berdampak positif
          pada kelancaran aliran air, mengurangi risiko banjir, dan menjaga
          kebersihan Kota Surabaya. Dalam mendukung penggunaan alternatif ramah
          lingkungan, kita ikut menjaga kota kita dari ancaman banjir.
        </p>
      </div>
    </div>
  );
};

export default Step4;
