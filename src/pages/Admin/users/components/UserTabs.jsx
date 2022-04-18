import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Select,
  Circle,
  Text,
} from '@chakra-ui/react';
import '../../../../index.css';
import {
  BsArrowDownRight,
  BsArrowUpRight,
  BsBagCheck,
  BsEye,
} from 'react-icons/bs';
import { useEffect, useState } from 'react';

export const UserTabs = ({ data }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [name, setName] = useState('');
  const [BVN, setBVN] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  useEffect(() => {
    setName(data?.firstName + ' ' + data?.lastName + ' ' + data?.middleName);
    setFirstName(data?.firstName);
    setLastName(data?.lastName);
    setMiddleName(data?.middleName);
    setBVN(data?.BVN);
    setPhoneNumber(data?.phoneNumber);
    setAddress(data?.address);
    setEmail(data?.email);
    setGender(data?.gender);
  }, []);

  const ShowLoans = () => {
    return data?.loans.map((loan, i) => {
      return (
        <>
          <Flex
            my={'20px'}
            justifyContent={'space-between'}
            alignItems='center'
            fontWeight={'normal'}
          >
            <Flex
              width={'70%'}
              justifyContent={'space-between'}
              alignItems='center'
            >
              <Circle size={'30px'} bg='#1459DF'>
                {loan?.status?.toUpperCase() === 'COMPLETED' ? (
                  <BsArrowUpRight color='#fff' />
                ) : (
                  <BsArrowDownRight color='#fff' />
                )}
              </Circle>
              <Box>
                <Text>
                  {loan?.status?.toUpperCase() === 'COMPLETED'
                    ? 'Loan Paid'
                    : loan?.status}
                </Text>
                <Text>{loan?.createdOn}</Text>
              </Box>
            </Flex>
            <Text
              color={
                loan?.status?.toUpperCase() === 'COMPLETED' ? 'green' : 'red'
              }
            >
              {loan?.status?.toUpperCase() === 'COMPLETED'
                ? loan?.amount
                : '-#' + loan?.amount}{' '}
            </Text>
          </Flex>
        </>
      );
    });
  };

  const ShowPayments = () => {
    return data?.payments.map((loan, i) => {
      return (
        <>
          <Flex
            my={'20px'}
            justifyContent={'space-between'}
            alignItems='center'
            fontWeight={'normal'}
          >
            <Flex
              width={'70%'}
              justifyContent={'space-between'}
              alignItems='center'
            >
              <Circle size={'30px'} bg='#1459DF'>
                {loan?.status?.toUpperCase() === 'PAID' ? (
                  <BsArrowUpRight color='#fff' />
                ) : (
                  <BsArrowDownRight color='#fff' />
                )}
              </Circle>
              <Box>
                <Text>
                  {loan?.status?.toUpperCase() === 'PAID'
                    ? 'Loan Paid'
                    : loan?.status}
                </Text>
                <Text>{loan?.createdOn}</Text>
              </Box>
            </Flex>
            <Text
              color={loan?.status?.toUpperCase() === 'PAID' ? 'green' : 'red'}
            >
              {loan?.status?.toUpperCase() === 'PAID'
                ? '#' + loan?.amount
                : '-#' + loan?.amount}{' '}
            </Text>
          </Flex>
        </>
      );
    });
  };
  return (
    <Tabs width={['100%', '100%', '90%']} isFitted>
      <TabList>
        <Tab fontSize={['12px', '14px']} _focus={{ boxShadow: 'none' }}>
          Profile
        </Tab>
        <Tab fontSize={['12px', '14px']} _focus={{ boxShadow: 'none' }}>
          Loans
        </Tab>
        <Tab fontSize={['12px', '14px']} _focus={{ boxShadow: 'none' }}>
          Payments
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Box width={'100%'}>
            {/* <FormControl
              variant="floating"
              id="first-name"
              isRequired
              isInvalid
            > */}
            <Flex
              direction={['column', 'column', 'row']}
              justifyContent={'space-between'}
              width='100%'
            >
              <div class='inputContainer business-email'>
                <input type='text' class='input' value={name} />
                <label HTMLFor='name' class='label'>
                  Name
                </label>
              </div>

              <div class='inputContainer'>
                <input type='email' class='input' value={email} />
                <label HTMLFor='email' class='label'>
                  Email
                </label>
              </div>
            </Flex>
            <Flex
              direction={['column', 'column', 'row']}
              justifyContent={'space-between'}
              width='100%'
            >
              <div class='inputContainer business-email'>
                <input type='text' class='input' value={phoneNumber} />
                <label HTMLFor='name' class='label'>
                  Phone
                </label>
              </div>

              <div class='inputContainer'>
                <input type='email' class='input' value={gender} />
                <label HTMLFor='email' class='label'>
                  Gender
                </label>
              </div>
            </Flex>
            <div class='inputContainer'>
              <input type='text' class='input' value={address} />
              <label HTMLFor='address' class='label'>
                Address
              </label>
            </div>

            <div class='inputContainer inputContainer__cac'>
              <input type='text' class='input' value={BVN} />
              <label HTMLFor='BVN' class='label'>
                BVN
              </label>
            </div>
          </Box>
        </TabPanel>
        <TabPanel>
          <ShowLoans />
        </TabPanel>
        <TabPanel>
          <ShowPayments />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
