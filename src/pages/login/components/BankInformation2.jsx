import {
  Box,
  Heading,
  Input,
  Text,
  Flex,
  Button,
  Select,
  
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/toast';
import Axios from 'axios';
import { BiLock, BiPencil, BiUpload } from 'react-icons/bi';
import FormInput from '../../../components/common/FormInput';
const { REACT_APP_API_URL, REACT_APP_USER, REACT_APP_PAYSTACK_SECREET_KEY, REACT_APP_PAYSTACK_BASE_URL } = process.env;

export const BankInformation2 = ({ bankInformationData, user, merchant }) => {
  const NO_SHADOW = { _focus: { boxShadow: 'none' } };
  const BTN_STYLE = {
    _hover: { bg: 'rgba(20, 89, 223, 0.7)' },
    bg: 'primary',
    color: '#fff',
  };

  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisabled] = useState(true);
  const toast = useToast();
  const [nameOfBank, setNameOfBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [allBanks, setAllBanks] = useState([]);
  const [loadingText, setLoadingText] = useState('Please wait..');

  const getToast = (title, description, status) => {
    const color = status === 'success' ? 'blue' : 'red';
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      // variant: 'left-accent',
      position: 'top-right',
      containerStyle: {
        border: '10px solid ' + color,
        backgroundColor: color,
      },
    });
  };

  const handleUpdate = () => {
    let code = '';
    if (!nameOfBank) {
      getToast('Validation Error', 'You have not selected a bank', 'error');
      return;
    }

    if (!accountNumber || !accountName) {
      getToast(
        'Validation Error',
        'Account number and account name are required fields',
        'error'
      );
      return;
    }
    allBanks.forEach((bank) => {
      if (nameOfBank === bank.name) {
        code = bank.code;
      }
    });

    const payload = {
      nameOfBank,
      accountName,
      accountNumber,
      bankCode: code,
      userId: user?.id,
    };

    postAccount(payload);
  };

  const clearFields = () => {
    setNameOfBank('');
    setAccountName('');
    setAccountNumber('');
  };
  const postAccount = async (payload) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.post(`${REACT_APP_API_URL}/bankAccounts`, payload)
      .then((response) => {
        if (response.status == 200) {
          const data = response.data.payload;

          bankInformationData(data);
          getToast('Success', 'Bank Account created successfully', 'success');
          setIsLoading(false);
        } else {
          getToast(
            'Unknown',
            'Server replied with: ' + response.status,
            'error'
          );
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        getToast('Error', error?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllBanks();
  }, []);

  useEffect(() => {
    !accountName || !accountNumber || !nameOfBank
      ? setDisabled(true)
      : setDisabled(false);
  }, [accountName, accountNumber, nameOfBank]);

  const getAllBanks = async () => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.get(`${REACT_APP_API_URL}/banks`)
      .then((response) => {
        if (response.status == 200) {
          const data = response.data.payload;
          setAllBanks(data);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        getToast('Error', error?.response?.data?.error, 'error');
        setIsLoading(false);
      });
  };

  const skip = () => {
    const data = { id: -1 };
    bankInformationData(data);
  };

  const handleBankSelection = (e) =>{
    let bankName = e.target.value;
    let code = '';
    allBanks.forEach((bank) => {
      if (bankName === bank.name) {
        code = bank.code;
      }
    });
    setBankCode(code);
    setNameOfBank(bankName);
  }

  const handleAccountName = (e) =>{
    
    let acctNumber = e.target.value;
    setAccountNumber(acctNumber);
    if(!bankCode || bankCode === ''){
      getToast('Error', 'Bank code not found', 'error');
      return;
    }
    if(acctNumber.length > 9 && acctNumber.length < 11){
      
      verifyAccount(acctNumber, bankCode);
    }
  }

  const verifyAccount = async (acctNumber, bankCode) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    //0001234567
    //058
    await Axios.get(`${REACT_APP_PAYSTACK_BASE_URL}/bank/resolve?account_number=${acctNumber}&bank_code=${bankCode}`,
    { headers: { Authorization: REACT_APP_PAYSTACK_SECREET_KEY } })
      .then((response) => {
        const data = response.data.data;
        setAccountName(data.account_name); 
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        getToast('Error', 'Account number could not be resolved', 'error');
        setIsLoading(false);
      });
  };

  return (
    <Box width={'100%'} px={['3%', '5%', '5%']}>
      <Heading textAlign={['center']} as={'h2'} fontSize={'30px'} mb='50px'>
        Bank Information
      </Heading>

      <Box>
        <div className='inputContainer'>
          <Flex
            pl='3'
            bg='#fff'
            align={'center'}
            border='2px solid #eee '
            borderRadius={'5'}
          >
            {/* <AiOutlineCalendar size={26} /> */}
            <Select
              border='none'
              onChange={(e) => handleBankSelection(e)}
              placeholder='Select a bank'
            >
              {allBanks.map((parameter, i) => {
                return <option value={parameter.name}>{parameter.name}</option>;
              })}
            </Select>
          </Flex>
        </div>
        <div className='inputContainer'>
          <input
            type='number'
            className='input'
            
            onChange={(e) => handleAccountName(e)}
            value={accountNumber}
          />
          <label htmlFor='name' className='label'>
            Account Number
          </label>
        </div>
        <div className='inputContainer'>
          <Input
            type='text'
            className='input'
            
            value={accountName}
            isDisabled={true}
          />
          <label htmlFor='name' className='label'>
            Account Name
          </label>
        </div>
      </Box>
      <Button
        width={'100%'}
        my={['10px', '10px', '30px']}
        // isDisabled={disable}
        {...NO_SHADOW}
        {...BTN_STYLE}
        onClick={handleUpdate}
        isLoading={isLoading}
        loadingText='Please wait'
        isDisabled={disable}
      >
        Proceed
      </Button>
      <Text cursor={'pointer'} textAlign={'center'} onClick={skip}>
        Skip for Now
      </Text>
      {/* <Text
        textAlign={'center'}
        _hover={{ textDecoration: 'underline' }}
        fontSize='1rem'
        mb='30px'
      >
        Have an account?
        <Link to='/'> Sign in</Link>
      </Text> */}
      {/* </VStack> */}
    </Box>
  );
};
