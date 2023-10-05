import React from "react";
import "./style/Membersihkan.css";
import pohonSVG from "../assets-2/pohon.svg";

export const Step3 = () => {
  return (
    <div className="flex-container">
      <div className="svg-box">
        <img src={pohonSVG} alt="Ilustrasi menanam pohon" />
      </div>
      <div className="content-box">
        <h2>Menanam Pohon di Sekitar Rumah</h2>
        <p>
          Menanam pohon di sekitar rumah adalah salah satu tindakan efektif
          dalam pencegahan banjir di Kota Surabaya. Pohon-pohon yang tumbuh di
          sekitar lingkungan dapat menyerap air hujan berlebih, mengurangi
          aliran air ke saluran drainase, dan meminimalkan risiko banjir. Selain
          itu, pohon-pohon memberikan manfaat tambahan berupa peningkatan
          kualitas udara, perlindungan dari panas, dan keindahan alam. Dengan
          menanam pohon di sekitar rumah, kita berkontribusi dalam menjaga
          lingkungan yang hijau, sekaligus mengurangi risiko banjir di Kota
          Surabaya.
        </p>
      </div>
    </div>
  );
};

export default Step3;
