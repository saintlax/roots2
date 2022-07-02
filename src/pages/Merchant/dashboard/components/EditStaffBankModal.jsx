import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Button,
  HStack,
  ModalHeader,
  Select,
  Avatar,
  Input,
} from '@chakra-ui/react';

import { AiFillEdit, AiOutlineCalendar } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import IsMobile from '../../../../components/common/IsMobile';
import { useSelector } from 'react-redux';
const { REACT_APP_API_URL, REACT_APP_PAYSTACK_SECREET_KEY, REACT_APP_PAYSTACK_BASE_URL } = process.env;

export const EditStaffBankModal = ({
  staff,
  bankAccount,
  onBankAccountUpdate,
}) => {
  useEffect(() => {
    setNameOfBank(bankAccount?.nameOfBank);
    setAccountName(bankAccount?.accountName);
    setAccountNumber(bankAccount?.accountNumber);
    setBankCode(bankAccount?.bankCode);
    setIsLoading(false);
  }, [bankAccount]);

  const isMobile = IsMobile();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nameOfBank, setNameOfBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const user = useSelector((state) => state.user);
  const [allBanks, setAllBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState({});
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
          clearFields();
          onBankAccountUpdate(data);
          dispatch({ type: ActionTypes.ADD_BANK_ACCOUNT, payload: data });
          getToast('Success', 'Bank Account created successfully', 'success');
          setIsLoading(false);
          onClose();
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

  const handleAccountName = (e) =>{
    if(!bankCode || bankCode === ''){
      getToast('Error', 'Bank code not found', 'error');
      return;
    }
    let acctNumber = e.target.value;
    if(acctNumber.length > 9 && acctNumber.length < 11){
      setAccountNumber(acctNumber);
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
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        {isMobile ? (
          <AiFillEdit color='#fff' />
        ) : (
          <>
            <AiFillEdit color='#fff' />
            <span style={{ marginLeft: '10px' }}>Add Account</span>
          </>
        )}
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add an account</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='20px'>
            <Flex
              pl='3'
              bg='#fff'
              align={'center'}
              border='2px solid #eee '
              borderRadius={'5'}
            >
              {/* {selectedBank.id ? (
                <Avatar
                  size={'sm'}
                  name={selectedBank?.name}
                  src={selectedBank?.logo}
                />
              ) : (
                <AiOutlineCalendar size={26} />
              )} */}
              <AiOutlineCalendar size={26} />
              <Select
                border='none'
                onChange={(e) => handleBankSelection(e)}
                placeholder='Select a bank'
              >
                {allBanks.map((parameter, i) => {
                  return (
                    <option value={parameter.name}>{parameter.name}</option>
                  );
                })}
              </Select>
            </Flex>

            {/* <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => setNameOfBank(e.target.value)}
                value={nameOfBank}
              />
              <label htmlFor='name' className='label'>
                Name of Bank
              </label>
            </div> */}
            <div className='inputContainer'>
              <input
                type='text'
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

            {/* <div className='inputContainer'>
              <input
                type='text'
                className='input'
                onChange={(e) => setBankCode(e.target.value)}
                value={bankCode}
              />
              <label htmlFor='name' className='label'>
                Bank Code
              </label>
            </div> */}

            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={handleUpdate}
                isLoading={isLoading}
                loadingText={loadingText}
                isDisabled={disabled}
              >
                Add
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
const labelStyles = {
  fontSize: '14px',
  color: '#1E223E',
  mb: '5px',
  mt: '10px',
};
