import { BiWalletAlt, BiUser, BiStore } from 'react-icons/bi';
import withdraw from '../../../assets/icons/withdraw.svg';

export const cardData = [
  {
    id: 1,
    amount: ' 83457',
    title: 'Wallet Balance',
    percentage: 48,
    iconBg: '#eaf1ff',
    icon: <BiWalletAlt size={30} color='#1459DF' />,
  },
  {
    id: 2,
    amount: ' 21457',
    title: 'Comissions Made',
    percentage: 48,
    iconBg: '#fef4e8',
    icon: <img src={withdraw} alt='withdraw' height='25px' width='25px' />,
  },
  {
    id: 3,
    amount: ' 31457',
    title: 'Total Users',
    percentage: 48,
    iconBg: '#e8f9ee',
    icon: <BiUser size={30} color='#14C25A' />,
  },
  {
    id: 4,
    amount: ' 23419',
    title: 'Total Merchants',
    percentage: 48,
    iconBg: '#fdeaee',
    icon: <BiStore size={30} color='#E73152' />,
  },
];
