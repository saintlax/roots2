import React from 'react';
import { Box, Stack } from '@chakra-ui/react';
import FilterParameter from './components/FilterParameter';
import Card from './components/Card';
// import { cardData } from './components/cardData';
import './merchantDashboard.css';
import BranchPerRevenue from './components/BranchPerRevenue';
import ProductAnalytics from './components/ProductAnalytics';
import { useEffect } from 'react';
import { ActionTypes } from '../../../redux/constants/action-types';
import Axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
const { REACT_APP_API_URL } = process.env;

export const Dashboard = () => {
  const cardData = useSelector((state) => state.merchantCards);
  const merchant = useSelector((state) => state.merchant);
  const dispatch = useDispatch();
  const [branchesReports, setBranchesReports] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    getCardData();
  }, []);
  const sortCards = (data) => {
    const {
      amountGenerated,
      percentageGenerated,
      amountPending,
      percentagePending,
      amountCancelled,
      percentageCancelled,
      amountApproved,
      percentageApproved,
    } = data;
    let payload = [
      {
        title: 'Amount Generated',
        amount: ' N' + amountGenerated,
        percentage: '' + Math.round(percentageGenerated),
        className: 'card-one',
      },
      {
        title: 'Pending Orders',
        amount: ' N' + amountPending,
        percentage: '' + Math.round(percentagePending),
        className: 'card-two',
      },
      {
        title: 'Cancelled Orders',
        amount: ' N' + amountCancelled,
        percentage: '' + Math.round(percentageCancelled),
        className: 'card-one',
      },
      {
        title: 'Approved Orders',
        amount: ' N' + amountApproved,
        percentage: '' + Math.round(percentageApproved),
        className: 'card-two',
      },
    ];
    dispatch({ type: ActionTypes.REFRESH_MERCHANT_CARD, payload });
  };
  const sortBranchesReport = (data) => {
    const { branchesReport, totalBranchesRevenue } = data;
    let arr = [];
    for (const branch in branchesReport) {
      const amount = branchesReport[branch];
      const percent =
        amount > 0 && totalBranchesRevenue > 0
          ? Math.round((amount / totalBranchesRevenue) * 100)
          : 0;
      const row = {
        branch,
        amount,
        percent,
      };
      arr = [...arr, row];
    }
    setBranchesReports(arr);
  };
  const getCardData = async () => {
    //&branchId=${this.branch.id
    await Axios.get(
      `${REACT_APP_API_URL}/products/merchantSummary/${merchant.id}`
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;

          console.log('card data......', payload);
          sortCards(payload);
          sortBranchesReport(payload);
          setSummary(payload);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack py='5' w='100%' h='100%' spacing='30px !important'>
      <FilterParameter />

      <Box className='merchant-dashboard-grid'>
        {cardData.map((data, index) => (
          <Card key={index} {...data} />
        ))}

        <Box className='branch-per-revenue-wrapper'>
          <BranchPerRevenue branchesReports={branchesReports} />
        </Box>
        <Box className='product-analytics'>
          <ProductAnalytics summary={summary} />
        </Box>
      </Box>
    </Stack>
  );
};
