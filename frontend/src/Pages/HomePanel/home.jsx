import adminService from "../../services/AdminService";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./home.css";

const Home = () => {
  const [inches, SetInches] = useState();
  const [feet, SetFeet] = useState();
  const [weight, SetWeight] = useState();
  const [bmi, setBmi] = useState();
  const [allQueries, setAllQueries] = useState([]);

  function calculateBMI() {
    if (inches && feet && weight) {
      var height = feet * 12 + parseInt(inches);
      console.log(inches);
      console.log(feet);
      console.log(height);
      var hMeter = height * 0.0254;
      console.log(hMeter);
      var bmix = weight / (hMeter * hMeter);
      console.log(bmix);
      var bmiA = Math.round(bmix * 100) / 100;
      setBmi(bmiA);
    } else {
      console.log("Input Missing");
    }
  }

  useEffect(() => {
    adminService
      .admin_message()
      .then((data) => {
        console.log(data);
        setAllQueries(data.crud);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {/* <!-- ***** Header Area Start ***** --> */}
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* <!-- ***** Logo Start ***** --> */}
                <a href="index.html" className="logo">
                  Fitness<em> Application</em>
                </a>
                {/* <!-- ***** Logo End ***** --> */}
                {/* <!-- ***** Menu Start ***** --> */}
                <div className="navDiv">
                  <ul className="nav">
                    <li className="scroll-to-section">
                      <a href="#top" className="active">
                        Home
                      </a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="#features">Features</a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="#bmi-calculator">BMI calculator</a>
                    </li>
                    {/* <li className="scroll-to-section">
                    <a href="#our-classes">Classes</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#schedule">Schedules</a>
                  </li> */}
                    <li className="scroll-to-section">
                      <a href="#trainers">Developers</a>
                    </li>
                    <li className="scroll-to-section">
                      <a href="/login">Login</a>
                    </li>
                    <li className="main-button">
                      <a href="/register">Sign Up</a>
                    </li>
                  </ul>
                </div>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
                {/* <!-- ***** Menu End ***** --> */}
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- ***** Header Area End ***** --> */}

      {/* <!-- ***** Main Banner Area Start ***** --> */}
      <div className="main-banner" id="top">
        {/* <img autoplay muted loop id="bg-video">
          <source src="HomeImage/gym-video.mp4" type="video/mp4" />
        </img> */}

        <img className="BannerImage" src="HomeImage/front.jpg" />

        <div className="video-overlay header-text">
          <div className="caption">
            <h6>work harder, get stronger</h6>
            <h2>
              easy with our <em>APP</em>
            </h2>
            <div className="main-button scroll-to-section">
              <a href="/register">Become a member</a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ***** Main Banner Area End ***** --> */}

      {/* //notification start here */}
      <div className="">
        <div className="row ">
          <div className="col-md-3 col-sm-6 card">
            <div className="serviceBox card">
              <div className="service-icon">
                <i class="bx bx-cheese"></i>
                {/* <span></span> */}
              </div>
              <h3 className="title">Notification from admin</h3>
              <p></p>
              <ul className="message">
                {allQueries.map((e) => {
                  return <li className="description">{e.message} </li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* //ends here */}

      {/* <!-- ***** Features Item Start ***** --> */}
      <section className="section" id="features">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading">
                <h2>
                  Choose <em>Program</em>
                </h2>
                <img src="HomeImage/line-dec.png" alt="waves" />
                {/* <p>
                  Training Studio is free CSS template for gyms and fitness
                  centers. You are allowed to use this layout for your business
                  website.
                </p> */}
              </div>
            </div>
            <div className="col-lg-6">
              <ul className="features-items">
                <li className="feature-item">
                  <div className="left-icon">
                    <img src="HomeImage/features-first-icon.png" alt="First One" />
                  </div>
                  <div className="right-content">
                    <h4>Basic Fitness</h4>
                    <p>
                      Physical fitness is a state of health and well-being and, more specifically,
                      the ability to perform aspects of sports, occupations and daily activities.
                    </p>
                    {/* <a href="#" className="text-button">
                      Discover More
                    </a> */}
                  </div>
                </li>
                <li className="feature-item">
                  <div className="left-icon">
                    <img src="HomeImage/features-first-icon.png" alt="second one" />
                  </div>
                  <div className="right-content">
                    <h4>New Gym </h4>
                    <p>You can find new and best gyms on your platform according to your needs.</p>
                    {/* <a href="#" className="text-button">
                      Discover More
                    </a> */}
                  </div>
                </li>
                <li className="feature-item">
                  <div className="left-icon">
                    <img src="HomeImage/features-first-icon.png" alt="third gym training" />
                  </div>
                  <div className="right-content">
                    <h4>Calorie Calculator</h4>
                    <p>
                      This calorie calculator estimates the number of calories needed each day to
                      maintain, lose, or gain weight. Learn the kinds of calories and their effects.
                    </p>
                    {/* <a href="#" className="text-button">
                      Discover More
                    </a> */}
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <ul className="features-items">
                <li className="feature-item">
                  <div className="left-icon">
                    <img src="HomeImage/features-first-icon.png" alt="fourth muscle" />
                  </div>
                  <div className="right-content">
                    <h4>Chat with Trainers</h4>
                    <p>Here you can chat with different trainers and buy there diet plans</p>
                    {/* <a href="#" className="text-button">
                      Discover More
                    </a> */}
                  </div>
                </li>
                <li className="feature-item">
                  <div className="left-icon">
                    <img src="HomeImage/features-first-icon.png" alt="training fifth" />
                  </div>
                  <div className="right-content">
                    <h4>Yoga Training</h4>
                    <p>Complete at least 200 hours of training with a qualifying yoga school</p>
                    {/* <a href="#" className="text-button">
                      Discover More
                    </a> */}
                  </div>
                </li>
                <li className="feature-item">
                  <div className="left-icon">
                    <img src="HomeImage/features-first-icon.png" alt="gym training" />
                  </div>
                  <div className="right-content">
                    <h4>Body Building Course</h4>
                    <p>
                      Bodybuilding, a regimen of exercises designed to enhance the human body's
                      muscular development. and promote general health and fitness.
                    </p>
                    {/* <a href="#" className="text-button">
                      Discover More
                    </a> */}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ***** Features Item End ***** --> */}
      {/* <!-- ***** Call to Action Start ***** --> */}
      <section className="section" id="call-to-action">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="cta-content">
                <h2>
                  Don’t <em>think</em>, begin <em>today</em>!
                </h2>
                <p>
                  The application of consistent, logical effort, over a prolonged period is the key
                  to reaching your physical muscular potential.
                </p>
                <div className="main-button scroll-to-section">
                  <a href="/register">Become a member</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ***** Call to Action End ***** --> */}
      {/* <!-- ***** Testimonials Starts ***** --> */}
      <section className="section" id="trainers">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="section-heading">
                <h2>
                  Developed <em>By</em>
                </h2>
                <img src="HomeImage/line-dec.png" alt="" />
                <p>
                  In the age of hectic work routines and busy schedules, we intend to build a
                  fitness app which will help people to keep track of their fitness goals. It will
                  also have the feature for its users to discover nearby suitable gyms and
                  appropriate trainer facilities according to their aims. This app will help people
                  improve their physical health by providing them all sorts of information on
                  working out, diet, gyms and trainers on a single platform.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="trainer-item">
                <div className="image-thumb">
                  <img src="HomeImage/junaid.jpg" alt="" />
                </div>
                <div className="down-content">
                  <span>FA18-BCS-085</span>
                  <h4>Junaid Asif</h4>
                  <p>fa18-bcs-085@cuilahore.edu.pk</p>
                  <ul className="social-icons">
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-behance"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="trainer-item">
                <div className="image-thumb">
                  <img src="HomeImage/abdullah.jpg" alt="" />
                </div>
                <div className="down-content">
                  <span>FA18-BCS-145</span>
                  <h4>Abdullah Bin Ikram</h4>
                  <p>fa18-bcs-145@cuilahore.edu.pk</p>
                  <ul className="social-icons">
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-behance"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="trainer-item">
                <div className="image-thumb">
                  <img src="HomeImage/hassan.jpg" alt="" />
                </div>
                <div className="down-content">
                  <span>FA18-BCS-013</span>
                  <h4>Hassan Iftikhar</h4>
                  <p>fa18-bcs-013@cuilahore.edu.pk</p>
                  <ul className="social-icons">
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-behance"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ***** Testimonials Ends ***** --> */}
      {/* <!-- ***** BMI Start ***** --> */}
      <section className="section bmi" id="bmi-calculator">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="cta-content">
                <h2>
                  BMI <em>Calculator</em>
                </h2>
                <div className="d-flex justify-content-center mt-4">
                  <div>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="mb-3 text-left  text-light">
                        Enter Weight in Kilograms
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Weight (Kgs)"
                        onChange={(e) => {
                          SetWeight(e.target.value);
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3 text-light" controlId="formBasicPassword">
                      <Form.Label>Enter Feets</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Height (Feets)"
                        min="0"
                        max="5"
                        onChange={(e) => {
                          SetFeet(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 text-light" controlId="formBasicPassword">
                      <Form.Label>Enter Inches</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Height (Inches)"
                        onChange={(e) => {
                          SetInches(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        calculateBMI();
                      }}
                    >
                      Submit
                    </Button>
                    {bmi ? (
                      <div>
                        {" "}
                        <h3 className="text-light mt-3">BMI : {bmi} </h3>{" "}
                        {bmi < 18.5 ? (
                          <p>Light weight</p>
                        ) : bmi > 25 ? (
                          <p>Over weight</p>
                        ) : bmi > 18.5 && bmi < 25 ? (
                          <p>Healthy Weight</p>
                        ) : null}{" "}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ***** BMI End ***** --> */}

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>Copyright &copy; 2022 Fitness Application - Designed by Evilcops</p>

              {/* <!-- You shall support us a little via PayPal to info@templatemo.com --> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
