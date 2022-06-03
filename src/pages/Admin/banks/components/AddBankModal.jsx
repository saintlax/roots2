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

export const AddBankModal = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [logo, setLogo] = useState('');
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
  const postBank = async (payload) => {
    await Axios.post(`${REACT_APP_API_URL}/banks`, payload)
      .then((response) => {
        if (response.status === 200 && response.data.payload) {
          console.log('Bank Data', response.data.payload);
          getToast('Successful', 'New bank created', 'success');
          const payload = response.data.payload;
          dispatch({
            type: ActionTypes.ADD_BANK,
            payload,
          });
          setIsLoading(false);
          setName('');
          setCode('');
          onClose();
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', 'Something went wrong', 'error');
        setIsLoading(false);
      });
  };

  const addBank = () => {
    if (!name && !code) {
      getToast('Validation', 'Name and code are required', 'error');
      return;
    }
    setIsLoading(true);
    const payload = {
      name,
      code,
      logo,
    };
    postBank(payload);
  };

  const uploadImage = (image) => {
    let form = new FormData();
    form.append('file', image);
    setIsLoading(true);
    Axios.post(`${REACT_APP_API_URL}/upload`, form, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        const payload = response.data.payload;
        const { path } = payload;
        setIsLoading(false);
        setLogo(path);

        getToast('Success', 'LOGO was uploaded successfully', 'success');
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        getToast('Error', 'File could not be uploaded', 'error');
      });
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
                Add Bank
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
                  placeholder='Zenith bank'
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Code</FormLabel>
                <Input
                  placeholder='064'
                  onChange={(e) => setCode(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Logo</FormLabel>
                <Input
                  id='CACDocumentPath'
                  type='file'
                  onChange={(e) => uploadImage(e.target.files[0])}
                />
              </FormControl>

              <Button
                mt={4}
                fontWeight={'normal'}
                color={'#fff'}
                bg='#1459df'
                _hover={{ bg: '#1459df' }}
                onClick={addBank}
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
