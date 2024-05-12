import { FaCrown } from "react-icons/fa6";
import "../css/aboutus.css";
import cp from '../assets/save.jpg'

function AboutUs() {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="row clearfix" style={{ display: "flex" }}>
          <div
            className="content-column col-md-6 col-sm-12 col-xs-12"
            style={{ width: "50%" }}>
            <div className="inner-column">
              <div className="sec-title">
                <div className="title">About Us</div>
                <h2>
                Experience the Future <br />of  Text Sharing 
                </h2>
              </div>
              <div className="text">
                ClippyAsst revolutionizes text sharing between devices. No more
                emailing or messaging yourself to transfer text. Effortlessly
                sync your clipboard across multiple devices instantly. Whether
                you're working, browsing, or texting, ClippyAsst ensures seamless
                sharing for everyone.
              </div>
              {/* <div className="email">
                Request Quote:{" "}
                <span className="theme_color">freequote@gmail.com</span>
              </div> */}
              <a href="/register" className="theme-btn btn-style-three">
                Get Started
              </a>
            </div>
          </div>

          <div className="image-column col-md-6 col-sm-12 col-xs-12">
            <div
              className="inner-column "
              data-wow-delay="0ms"
              data-wow-duration="1500ms">
              <div className="image">
                <img src={"https://i.ibb.co/vQbkKj7/about.jpg" }alt="" />
                <div className="overlay-box">
                  <div className="year-box">
                    <span className="number"><FaCrown color=" #d7a247"/></span>Enjoy <br /> Maximum{" "}
                    <br /> Experience
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
