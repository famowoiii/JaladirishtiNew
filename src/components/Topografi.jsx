import Carousel from "react-bootstrap/Carousel";
import "./TopografiStyle.css";

function DarkVariantExample() {
  return (
    <div className="Topografi-wrapper">
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src\assets\Raster Potensi Banjir.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>Potensi Banjir</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src\assets\ketinggian.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>Ketinggian Permukaan</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src\assets\Kelerengan.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>Kelerengan</h5>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src\assets\sungai.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>Sungai</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default DarkVariantExample;
