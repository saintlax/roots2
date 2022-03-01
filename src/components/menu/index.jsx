import React from 'react';
import IsMobile from '../common/IsMobile';
import MobileMenu from './components/MobileMenu';
import Sidebar from './components/Sidebar';

const Menu = () => {
  const isMobileScreen = IsMobile();

  return isMobileScreen ? <MobileMenu /> : <Sidebar />;
};

export default Menu;
