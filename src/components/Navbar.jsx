import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (
  <nav className="navbar navbar-inverse navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button
          aria-controls="navbar"
          aria-expanded="false"
          className="navbar-toggle collapsed"
          data-target="#navbar"
          data-toggle="collapse"
          type="button"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <Link className="navbar-brand" to="/">Filestack</Link>
      </div>
      <div className="navbar-collapse collapse" >
        <ul className="nav navbar-nav navbar-right">
          <li><a href="http://blog.filestack.com/" target="_blank">Blog</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
