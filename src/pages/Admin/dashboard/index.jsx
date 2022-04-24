import { Box, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import Card from './components/Card';
//import { cardData } from './components/cardData';
import GraphChart from './components/GraphChart';
import RecentActivities from './components/RecentActivities';
import './dashboard.css';
import { ActionTypes } from '../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiWalletAlt, BiUser, BiStore } from 'react-icons/bi';
import withdraw from '../../../assets/icons/withdraw.svg';
import { formatCurrency } from '../../../constants/constants';

const { REACT_APP_API_URL } = process.env;

const Dashboard = () => {
  const adminSummary = useSelector((state) => state.adminSummary);
  const dispatch = useDispatch();
  const cardData = [
    {
      id: 1,
      amount: ' 83457',
      title: 'Wallet Balance',
      percentage: 48,
      iconBg: '#eaf1ff',
      icon: <BiWalletAlt size={35} color='#1459DF' />,
      className: 'card-one',
    },
    {
      id: 2,
      amount: ' ' + formatCurrency(adminSummary?.commissions),
      title: 'Comissions Made',
      percentage: 73,
      iconBg: '#fef4e8',
      icon: <img src={withdraw} alt='withdraw' height='35px' width='35px' />,
      className: 'card-two',
    },
    {
      id: 3,
      amount: ' ' + adminSummary?.totalUsers,
      title: 'Total Users',
      percentage: 70,
      iconBg: '#e8f9ee',
      icon: <BiUser size={35} color='#14C25A' />,
      className: 'card-three',
    },
    {
      id: 4,
      amount: ' ' + adminSummary?.totalMerchants,
      title: 'Total Merchants',
      percentage: 12,
      iconBg: '#fdeaee',
      icon: <BiStore size={35} color='#E73152' />,
      className: 'card-four',
    },
    {
      id: 5,
      amount: ' ' + formatCurrency(adminSummary?.approvedLoans),
      title: 'Approved Loans',
      percentage: 55,
      iconBg: '#eaf1ff',
      icon: <BiWalletAlt size={35} color='#1459DF' />,
      className: 'card-one',
    },
    {
      id: 6,
      amount: ' ' + formatCurrency(adminSummary?.pendingLoans),
      title: 'Pending Loans',
      percentage: 33,
      iconBg: '#eaf1ff',
      icon: <BiWalletAlt size={35} color='#1459DF' />,
      className: 'card-two',
    },
    {
      id: 7,
      amount: ' ' + formatCurrency(adminSummary?.declinedLoans),
      title: 'Declined Loans',
      percentage: 0,
      iconBg: '#eaf1ff',
      icon: <BiWalletAlt size={35} color='#1459DF' />,
      className: 'card-three',
    },
    {
      id: 1,
      amount: ' ' + formatCurrency(adminSummary?.totalPayments),
      title: 'Total Payments',
      percentage: 0,
      iconBg: '#eaf1ff',
      icon: <BiWalletAlt size={35} color='#1459DF' />,
      className: 'card-four',
    },
  ];

  useEffect(() => {
    getSummary();
  }, []);

  const getSummary = async () => {
    await Axios.get(`${REACT_APP_API_URL}/loans/admin/summary`)
      .then((response) => {
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({
            type: ActionTypes.ADD_ADMIN_SUMMARY,
            payload,
          });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box className='dashboard-grid'>
      {cardData.map((card) => (
        <Card key={card.id} {...card} />
      ))}

      <Stack className='graph-chart'>
        <Text as='h3'>Transactions Overview</Text>
        <GraphChart />
      </Stack>
      <Stack className='recent-activities' color='#fff'>
        <Text as='h3'>Recent Activities</Text>
        <RecentActivities />
      </Stack>
    </Box>
  );
};

export default Dashboard;
