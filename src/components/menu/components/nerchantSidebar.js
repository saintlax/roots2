import { BiUser, BiUserPin } from 'react-icons/bi';
import { RiDashboardLine } from 'react-icons/ri';
import { BsWalletFill } from 'react-icons/bs';
import { ImArrowUpRight2 } from 'react-icons/im';
import { FiSettings } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { GiReceiveMoney } from 'react-icons/gi';

export const navLinks = [
  { title: 'Dashboard', icon: RiDashboardLine, to: 'dashboard' },
  { title: 'Profile', icon: BiUser, to: 'users' },
  { title: 'Products', icon: BsWalletFill, to: 'products' },
  { title: 'Orders', icon: ImArrowUpRight2, to: 'orders' },
  { title: 'Branches', icon: GiReceiveMoney, to: 'branches' },
  { title: 'Settings', icon: FiSettings, to: 'settings' },
  // { title: 'Roles', icon: BiUserPin, to: 'roles' },
  { title: 'Logout', icon: FiLogOut, to: '/' },
];
