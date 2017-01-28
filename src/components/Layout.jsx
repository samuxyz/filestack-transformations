import React from 'react';
import { Navbar } from 'components';

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <div>{children}</div>
  </div>
);

export default Layout;
