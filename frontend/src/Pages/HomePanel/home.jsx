import React from 'react'

const Home = () => {
  return (
    <div>
      {/* <!-- ***** Preloader Start ***** --> */}
      <div id="js-preloader" className="js-preloader">
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      {/* <!-- ***** Preloader End ***** --> */}

      {/* <!-- ***** Header Area Start ***** --> */}
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* <!-- ***** Logo Start ***** --> */}
                <a href="index.html" className="logo">
                  Training<em> Studio</em>
                </a>
                {/* <!-- ***** Logo End ***** --> */}
                {/* <!-- ***** Menu Start ***** --> */}
                <ul className="nav">
                  <li className="scroll-to-section">
                    <a href="#top" className="active">
                      Home
                    </a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#features">About</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#our-classes">Classes</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#schedule">Schedules</a>
                  </li>
                  <li className="scroll-to-section">
                    <a href="#contact-us">Contact</a>
                  </li>
                  <li className="main-button">
                    <a href="#">Sign Up</a>
                  </li>
                </ul>
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
        <video autoplay muted loop id="bg-video">
          <source src="assets/images/gym-video.mp4" type="video/mp4" />
        </video>

        <div className="video-overlay header-text">
          <div className="caption">
            <h6>work harder, get stronger</h6>
            <h2>
              easy with our <em>gym</em>
            </h2>
            <div className="main-button scroll-to-section">
              <a href="#features">Become a member</a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ***** Main Banner Area End ***** --> */}
    </div>
  )
}

export default Home
