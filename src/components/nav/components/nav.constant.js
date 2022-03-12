// import dashboard from "../../../../assets/icons/Group 112.svg"
// import visitorsIcon from "../../../../assets/icons/Group 113.svg"
// import DeaprtmentIcon from "../../../../assets/icons/Group 162.svg"
// import emergencyIcon from "../../../../assets/icons/emergency.svg"
// import locationIcon from "../../../../assets/icons/location.svg"
// import MeetingsIcon from "../../../../assets/icons/Group 114.svg"
// import reviewIocn from "../../../../assets/icons/review.svg"
// import notificationsIcon from "../../../../assets/icons/Group 115.svg"
// import staffIcon from "../../../../assets/icons/staff-user.svg"
// import settingsIcon from "../../../../assets/icons/settings.svg"
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { MdOutlineDashboard } from 'react-icons/md';
import { GiHandBag } from 'react-icons/gi';

import { PROTECTED_PATHS } from '../../../app/merchantConstants';

const { DASHBOARD, ORDERS, BRANCHES, PRODUCTS, NOTIFICATIONS } =
  PROTECTED_PATHS;

export const MERCHANT_NAV_ITEMS = [
  {
    title: 'Dashboard',
    to: DASHBOARD,
    icon: <MdOutlineDashboard />,
  },
  {
    title: 'Orders',
    to: ORDERS,
  },

  {
    title: 'Products',
    to: PRODUCTS,
    icon: <AiOutlineShoppingCart />,
  },

  {
    title: 'Branches',
    to: BRANCHES,
    icon: <GiHandBag />,
  },
];
