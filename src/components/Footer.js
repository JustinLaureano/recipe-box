import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__content">
      <Link className="footer__title" to="/dashboard">
        RecipeBox
      </Link>
      <p>&copy;2018 RecipeBox. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;