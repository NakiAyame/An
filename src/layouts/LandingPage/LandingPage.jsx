import Header from "../../components/Header/Header";
import CarouselComponent from "../../components/Carousel/Carousel";
import "./LandingPage.css";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";

function Home() {
  const images = [
    "https://c4.wallpaperflare.com/wallpaper/236/613/125/pixar-4k-hd-full-screen-wallpaper-preview.jpg",
    "https://w.forfun.com/fetch/fc/fc13571b3a332105b55ca9d43fe9400d.jpeg",
    "https://png.pngtree.com/background/20230525/original/pngtree-full-screen-wolf-illustration-wallpaper-picture-image_2735581.jpg",
    // Add more image URLs as needed
  ];

  return (
    <>
      <Header />
      <CarouselComponent images={images} />
      <div>
        <h1>OK</h1>
      </div>
      <div className="container">
        <div className="image-container">
          <img
            src="https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340"
            alt="Image"
          />
        </div>
        <div className="text-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            natus. Sequi earum error ut, veritatis nisi aspernatur voluptatem
            explicabo vel natus modi magni dolorum at voluptas dolorem cum
            officia praesentium.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="text-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            natus. Sequi earum error ut, veritatis nisi aspernatur voluptatem
            explicabo vel natus modi magni dolorum at voluptas dolorem cum
            officia praesentium.
          </p>
        </div>
        <div className="image-container">
          <img
            src="https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340"
            alt="Image"
          />
        </div>
      </div>
      <div className="container">
        <div className="image-container">
          <img
            src="https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340"
            alt="Image"
          />
        </div>
        <div className="text-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            natus. Sequi earum error ut, veritatis nisi aspernatur voluptatem
            explicabo vel natus modi magni dolorum at voluptas dolorem cum
            officia praesentium.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
