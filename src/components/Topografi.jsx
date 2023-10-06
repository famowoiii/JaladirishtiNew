import Carousel from "react-bootstrap/Carousel";
import "./TopografiStyle.css";

function DarkVariantExample() {
  return (
    <div className="Topografi-wrapper">
      <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src\assets\Kelerengan.png"
            alt="First slide"
          />
          <Carousel.Caption>
            <h5></h5>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src\assets\Kelerengan.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5></h5>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="src\assets\Kelerengan.png"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5></h5>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default DarkVariantExample;
