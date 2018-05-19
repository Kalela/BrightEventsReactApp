import React from 'react';

import LandingPic from '../../img/landing.jpg';
import EducationalPic from '../../img/educational.jpg';
import BottlePic from '../../img/barbottle.jpg';

const ContactUs = (props) => (
  <div id="brightEventsCarousel" className="carousel slide" data-ride="carousel">
    <ol className="carousel-indicators">
      <li data-target="#brightEventsCarousel" data-slide-to="0" className="active"></li>
      <li data-target="#brightEventsCarousel" data-slide-to="1"></li>
      <li data-target="#brightEventsCarousel" data-slide-to="2"></li>
    </ol>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className="d-block w-100" src={LandingPic} alt="First slide" />
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={EducationalPic} alt="Second slide" />
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={BottlePic} alt="Third slide" />
      </div>
    </div>
    <a className="carousel-control-prev" href="#brightEventsCarousel" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#brightEventsCarousel" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
);
