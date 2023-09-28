import React from "react";
import "./style/Membersihkan.css";
import sampahSVG from "../assets-2/sampah.svg";

export const Step2 = () => {
  return (
    <div className="flex-container">
      <div className="svg-box">
        <img src={sampahSVG} alt="Ilustrasi membuang sampah" />
      </div>
      <div className="content-box">
        <h2>Membuang Sampah Pada Tempatnya</h2>
        <p>
          Membuang sampah pada tempatnya adalah langkah penting dalam melindungi
          Kota Surabaya dari banjir. Dengan memastikan sampah dibuang ke tempat
          yang sesuai, kita dapat mencegah penyumbatan saluran air yang dapat
          menyebabkan banjir. Dalam mendukung lingkungan yang bersih, kita juga
          mendukung kelancaran aliran air, mengurangi risiko banjir, dan menjaga
          keberlanjutan kota kita. Melakukan tindakan sederhana ini adalah
          kontribusi berharga dalam menjaga Kota Surabaya tetap aman dan nyaman
          untuk semua warganya.
        </p>
      </div>
    </div>
  );
};
export default Step2;
