import React from "react";
import "./style/Membersihkan.css";
import AirSVG from "../assets-2/air.svg";

export const Step1 = () => {
  return (
    <div className="flex-container">
      <div className="svg-box">
        <img src={AirSVG} alt="Ilustrasi Air" />
      </div>
      <div className="content-box">
        <h2>Membersihkan Lingkungan & Saluran Air</h2>
        <p>
          Membersihkan lingkungan dan saluran air adalah langkah kunci dalam
          upaya pencegahan banjir di Kota Surabaya. Dengan menjaga kebersihan
          saluran drainase, seperti sungai dan selokan, serta mendorong perilaku
          yang bertanggung jawab dalam membuang sampah pada tempatnya, kami
          dapat mengurangi risiko banjir. Tindakan sederhana ini membantu air
          mengalir lancar, mencegah penyumbatan, dan meminimalkan banjir.
          Bersama-sama, kita dapat menjaga Kota Surabaya dari ancaman banjir dan
          menjaga keberlanjutannya.
        </p>
      </div>
    </div>
  );
};

export default Step1;
