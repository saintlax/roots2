import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  SimpleGrid,
  GridItem,
  Button,
  HStack,
  ModalHeader,
} from '@chakra-ui/react';

import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';

const { REACT_APP_API_URL } = process.env;

export const AddCategoryModal = ({ isMobile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');

  const merchant = useSelector((state) => state.merchant);
  const productCategories = useSelector((state) => state.productCategories);
  const branch = useSelector((state) => state.userBranch);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Please wait..');
  const userBranch = useSelector((state) => state.userBranch);
  console.log('user branch', userBranch);

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

  const addCategory = () => {
    if (!name) {
      getToast(
        'Validation Error',
        'Name and price are required fields',
        'error'
      );
      return;
    }
    let merchantId = 0;
    //let branchId = 0;
    if (userBranch && Object.keys(userBranch).length > 0) {
      merchantId = userBranch.merchantId;
      //branchId = userBranch.id;
    } else if (merchant && Object.keys(merchant).length > 0) {
      merchantId = merchant.id;
      //branchId = userBranch.id;
    }
    const category = {
      name,
      //merchant,
      merchantId: merchantId,
      //branch,
      //branchId: branchId,
    };

    let filter = productCategories.filter((cat) => cat.name === category.name);
    if (filter.length === 0) {
      postCategory(category);
    } else {
      getToast('Duplicate', 'This category already exist', 'error');
    }
  };

  const clearFields = () => {
    setName('');
  };
  const postCategory = async (category) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.post(`${REACT_APP_API_URL}/productCategories`, category)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({
            type: ActionTypes.ADD_PRODUCT_CATEGORY,
            payload: payload,
          });
          getToast('Success', 'Category created successfully', 'success');
          setIsLoading(false);
          clearFields();
          onClose();
          console.log('REDUX CATEGORIES', productCategories);
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
        getToast('CATEGORY error', 'CATEGORY could not be created', 'error');
        setIsLoading(false);
      });
  };

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        {isMobile ? (
          <AiOutlinePlus color='#fff' />
        ) : (
          <>
            <AiOutlinePlus color='#fff' />
            <span style={{ marginLeft: '10px' }}>Create category</span>
          </>
        )}
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product category</ModalHeader>
          <ModalCloseButton />
          <ModalBody p='50px'>
            <SimpleGrid columns={1} columnGap={3} rowGap={6} w='full'>
              <GridItem colSpan={1}>
                <div className='inputContainer'>
                  <input
                    type='text'
                    className='input'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <label htmlFor='name' className='label'>
                    Name
                  </label>
                </div>
              </GridItem>
            </SimpleGrid>

            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={addCategory}
                isLoading={isLoading}
                loadingText={loadingText}
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
