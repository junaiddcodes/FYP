import React from 'react'
import './home.css'

const Home = () => {
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
                      <a href="#features">About</a>
                    </li>
                    {/* <li className="scroll-to-section">
                    <a href="#our-classes">Classes</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#schedule">Schedules</a>
                  </li> */}
                    <li className="scroll-to-section">
                      <a href="#trainers">Contact</a>
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

        <img src="HomeImage/front.jpg" />

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
                <p>
                  Training Studio is free CSS template for gyms and fitness
                  centers. You are allowed to use this layout for your business
                  website.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <ul className="features-items">
                <li className="feature-item">
                  <div className="left-icon">
                    <img
                      src="HomeImage/features-first-icon.png"
                      alt="First One"
                    />
                  </div>
                  <div className="right-content">
                    <h4>Basic Fitness</h4>
                    <p>
                      Please do not re-distribute this template ZIP file on any
                      template collection website. This is not allowed.
                    </p>
                    {/* <a href="#" className="text-button">
                      Discover More
                    </a> */}
                  </div>
                </li>
                <li className="feature-item">
                  <div className="left-icon">
                    <img
                      src="HomeImage/features-first-icon.png"
                      alt="second one"
                    />
                  </div>
                  <div className="right-content">
                    <h4>New Gym Training</h4>
                    <p>
                      If you wish to support TemplateMo website via PayPal,
                      please feel free to contact us. We appreciate it a lot.
                    </p>
                    {/* <a href="#" className="text-button">
                      Discover More
                    </a> */}
                  </div>
                </li>
                <li className="feature-item">
                  <div className="left-icon">
                    <img
                      src="HomeImage/features-first-icon.png"
                      alt="third gym training"
                    />
                  </div>
                  <div className="right-content">
                    <h4>Basic Muscle Course</h4>
                    <p>
                      Credit goes to{' '}
                      <a
                        rel="nofollow"
                        href="https://www.pexels.com"
                        target="_blank"
                      >
                        Pexels website
                      </a>{' '}
                      for images and video background used in this HTML
                      template.
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
                    <img
                      src="HomeImage/features-first-icon.png"
                      alt="fourth muscle"
                    />
                  </div>
                  <div className="right-content">
                    <h4>Advanced Muscle Course</h4>
                    <p>
                      You may want to browse through{' '}
                      <a
                        rel="nofollow"
                        href="https://templatemo.com/tag/digital-marketing"
                        target="_parent"
                      >
                        Digital Marketing
                      </a>{' '}
                      or{' '}
                      <a href="https://templatemo.com/tag/corporate">
                        Corporate
                      </a>{' '}
                      HTML CSS templates on our website.
                    </p>
                    {/* <a href="#" className="text-button">
                      Discover More
                    </a> */}
                  </div>
                </li>
                <li className="feature-item">
                  <div className="left-icon">
                    <img
                      src="HomeImage/features-first-icon.png"
                      alt="training fifth"
                    />
                  </div>
                  <div className="right-content">
                    <h4>Yoga Training</h4>
                    <p>
                      This template is built on Bootstrap v4.3.1 framework. It
                      is easy to adapt the columns and sections.
                    </p>
                    {/* <a href="#" className="text-button">
                      Discover More
                    </a> */}
                  </div>
                </li>
                <li className="feature-item">
                  <div className="left-icon">
                    <img
                      src="HomeImage/features-first-icon.png"
                      alt="gym training"
                    />
                  </div>
                  <div className="right-content">
                    <h4>Body Building Course</h4>
                    <p>
                      Suspendisse fringilla et nisi et mattis. Curabitur sed
                      finibus nisi. Integer nibh sapien, vehicula et auctor.
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
                  Ut consectetur, metus sit amet aliquet placerat, enim est
                  ultricies ligula, sit amet dapibus odio augue eget libero.
                  Morbi tempus mauris a nisi luctus imperdiet.
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
                  Expert <em>Trainers</em>
                </h2>
                <img src="HomeImage/line-dec.png" alt="" />
                <p>
                  Nunc urna sem, laoreet ut metus id, aliquet consequat magna.
                  Sed viverra ipsum dolor, ultricies fermentum massa consequat
                  eu.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="trainer-item">
                <div className="image-thumb">
                  <img src="HomeImage/first-trainer.jpg" alt="" />
                </div>
                <div className="down-content">
                  <span>Strength Trainer</span>
                  <h4>Bret D. Bowers</h4>
                  <p>
                    Bitters cliche tattooed 8-bit distillery mustache. Keytar
                    succulents gluten-free vegan church-key pour-over seitan
                    flannel.
                  </p>
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
                  <img src="HomeImage/second-trainer.jpg" alt="" />
                </div>
                <div className="down-content">
                  <span>Muscle Trainer</span>
                  <h4>Hector T. Daigl</h4>
                  <p>
                    Bitters cliche tattooed 8-bit distillery mustache. Keytar
                    succulents gluten-free vegan church-key pour-over seitan
                    flannel.
                  </p>
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
                  <img src="HomeImage/third-trainer.jpg" alt="" />
                </div>
                <div className="down-content">
                  <span>Power Trainer</span>
                  <h4>Paul D. Newman</h4>
                  <p>
                    Bitters cliche tattooed 8-bit distillery mustache. Keytar
                    succulents gluten-free vegan church-key pour-over seitan
                    flannel.
                  </p>
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

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p>
                Copyright &copy; 2022 Fitness Application - Designed by Evilcops
              </p>

              {/* <!-- You shall support us a little via PayPal to info@templatemo.com --> */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
