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
import { formatCurrency } from '../../../constants/constants';
const { REACT_APP_API_URL } = process.env;

export const Dashboard = () => {
  const cardData = useSelector((state) => state.merchantCards);
  const merchant = useSelector((state) => state.merchant);
  const dispatch = useDispatch();
  const [branchesReports, setBranchesReports] = useState([]);
  const [summary, setSummary] = useState({});
  const userBranch = useSelector((state) => state.userBranch);
  const user = useSelector((state) => state.user);

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
      wallet,
    } = data;
    let payload = [
      {
        title: 'Amount Generated',
        amount: formatCurrency(amountGenerated),
        percentage: '' + Math.round(percentageGenerated),
        className: 'card-one',
      },
      {
        title: 'Pending Orders',
        amount: formatCurrency(amountPending),
        percentage: '' + Math.round(percentagePending),
        className: 'card-two',
      },
      {
        title: 'Wallet',
        amount: formatCurrency(wallet),
        percentage: '0',
        className: 'card-three',
      },
      {
        title: 'Cancelled Orders',
        amount: formatCurrency(amountCancelled),
        percentage: '' + Math.round(percentageCancelled),
        className: 'card-one',
      },
      {
        title: 'Approved Orders',
        amount: formatCurrency(amountApproved),
        percentage: '' + Math.round(percentageApproved),
        className: 'card-two',
      },
      {
        title: 'Withdrawals',
        amount: ' 0.00',
        percentage: '0',
        className: 'card-three',
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
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      query = `${userBranch.merchantId}/${user.id}`;
    } else if (merchant && Object.keys(merchant).length > 0) {
      query = `${merchant.id}/${user.id}`;
    }
    await Axios.get(`${REACT_APP_API_URL}/products/merchantSummary/${query}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;

          dispatch({ type: ActionTypes.ADD_MERCHANT_SUMMARY, payload });
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

  const onFilter = (data) => {
    let d = new Date();
    switch (data) {
      case 'Last 7 days':
        d.setDate(d.getDate() - 7);
        console.log(d);
        break;
      case 'Today':
        console.log(d);
        break;
      case 'Yesterday':
        d.setDate(d.getDate() - 1);
        break;
      case 'Last month':
        d = new Date(d.getFullYear(), d.getMonth() - 1, d.getDate());
        console.log(d);
        break;

      case 'Last 6 months':
        d = new Date(d.getFullYear(), d.getMonth() - 6, d.getDate());
        console.log(d);
        break;
      case 'Last Year':
        d = new Date(d.getFullYear(), d.getMonth() - 12, d.getDate());
        console.log(d);
        break;
      case 'Last 2 Years':
        d = new Date(d.getFullYear(), d.getMonth() - 24, d.getDate());
        console.log(d);
        break;
      case 'Last 5 Years':
        d = new Date(d.getFullYear(), d.getMonth() - 12 * 5, d.getDate());
        console.log(d);
        break;
    }
    postFilter(d, new Date());
  };

  const postFilter = async (startDate, endDate) => {
    let query = ``;
    if (userBranch && Object.keys(userBranch).length > 0) {
      query = `merchantId=${userBranch.merchantId}&userId=${user.id}`;
    } else if (merchant && Object.keys(merchant).length > 0) {
      query = `merchantId=${merchant.id}&userId=${user.id}`;
    }
    query += `&startDate=${startDate}&endDate=${endDate}`;
    await Axios.get(
      `${REACT_APP_API_URL}/products/filterReportByDate/filter?${query}`
    )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;

          dispatch({ type: ActionTypes.EDIT_MERCHANT_SUMMARY, payload });
          console.log('filter response data......', payload);
          sortCards(payload);
          sortBranchesReport(payload);
          setSummary(payload);
          console.log('filter data', payload);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack py='5' w='100%' h='100%' spacing='30px !important'>
      <FilterParameter onFilter={onFilter} />

      <Box className='merchant-dashboard-grid'>
        {cardData.map((data, index) => (
          <Card key={index} {...data} />
        ))}

        {branchesReports.length > 0 ? (
          <>
            <Box className='branch-per-revenue-wrapper'>
              <BranchPerRevenue branchesReports={branchesReports} />
            </Box>
          </>
        ) : (
          <></>
        )}
        <Box className='product-analytics'>
          <ProductAnalytics summary={summary} />
        </Box>
      </Box>
    </Stack>
  );
};
