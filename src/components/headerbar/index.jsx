import IsMobile from '../common/IsMobile';
import HeaderbarMobile from './components/HeaderbarMobile';
import HeaderbarDesktop from './components/HeaderbarDesktop';

const Headerbar = () => {
  const isMobileScreen = IsMobile();

  return isMobileScreen ? <HeaderbarMobile /> : <HeaderbarDesktop />;
};

export default Headerbar;
