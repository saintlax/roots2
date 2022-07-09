import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
    Box,
    Flex,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react';
  import { AiOutlinePlus } from 'react-icons/ai';
  import { useState } from 'react';
  import { useSelector, useDispatch } from 'react-redux';
  import { ActionTypes } from '../../../../redux/constants/action-types';
  import Axios from 'axios';
  import { useToast } from '@chakra-ui/toast';
  const { REACT_APP_API_URL } = process.env;
  
  export const AddCategoryModal = ({}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState('');
  
    const dispatch = useDispatch();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
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
    const postCategory = async (payload) => {
      await Axios.post(`${REACT_APP_API_URL}/productCategories`, payload)
        .then((response) => {
          if (response.status === 200 && response.data.payload) {
            console.log('Bank Data', response.data.payload);
            getToast('Successful', 'New bank created', 'success');
            const payload = response.data.payload;
            dispatch({
              type: ActionTypes.ADD_ADMIN_PRODUCT_CATEGORY,
              payload,
            });
            setIsLoading(false);
            setName('');
            onClose();
          }
        })
        .catch((err) => {
          console.log(err);
          getToast('Error', err?.response?.data?.error, 'error');
          setIsLoading(false);
        });
    };
  
    const addCategory = () => {
      if (!name) {
        getToast('Validation', 'Name is required', 'error');
        return;
      }
      setIsLoading(true);
      const payload = {
        name,
        merchantId: -1,
      };
      postCategory(payload);
    };
  
    return (
      <>
        <Flex
          onClick={onOpen}
          alignItems='center'
          width={'100%'}
          justifyContent='center'
        >
          <Button fontWeight={'normal'} _hover={{ bg: '#1459df' }} bg='primary'>
            <AiOutlinePlus color='#fff' size={26} />
          </Button>
        </Flex>
  
        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {/* <ModalHeader>Modal Title</ModalHeader> */}
            <ModalCloseButton />
            <ModalBody p='50px'>
              <Flex
                width={'100%'}
                direction='column'
                // justifyContent="center"
                alignItems={'center'}
              >
                {/* <Avatar size="lg" name={data?.name} src={data?.imageUrl} /> */}
                <Text my='5px' fontSize={'20px'} fontWeight={'bold'}>
                  Add a product category
                </Text>
                {/* <Text>Account created {data?.dateCreated}</Text> */}
              </Flex>
              <Flex
                direction={['column']}
                my={'20px'}
                justifyContent={'space-between'}
                // alignItems="center"
                fontWeight={'semibold'}
              >
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder='Example Electronics'
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
  
  
                <Button
                  mt={4}
                  fontWeight={'normal'}
                  color={'#fff'}
                  bg='#1459df'
                  _hover={{ bg: '#1459df' }}
                  onClick={addCategory}
                  isLoading={isLoading}
                  loadingText='please wait...'
                >
                  Add
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };
  