import React from 'react';
import { Link } from 'react-router';

const Jumbotron = () => (
  <div className="jumbotron">
    <div className="container text-center">
      <h1>Filestack's Tranformations</h1>
      <p>Customize your favorite pictures by adding a watermark, borders and save them as zip files!</p>
      <p>
        <Link
          className="btn btn-filestack btn-lg btn-main"
          role="button"
          to="/add"
        >
          Start Now
        </Link>
      </p>
    </div>
  </div>
);

export default Jumbotron;
