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
  FormControl,
  FormLabel,
  Textarea,
  Button,
  HStack,
  Box,
  Image,
  Text,
} from '@chakra-ui/react';
import { BsThreeDots, BsTrash, BsCheckLg } from 'react-icons/bs';

import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { addBranch } from '../../../../redux/actions/branchActions';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';

const { REACT_APP_API_URL, REACT_APP_USER, REACT_APP_MERCHANT } = process.env;

export const AddProductModal = ({ isMobile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const merchant = useSelector((state) => state.merchant);
  // console.log('merchant ===>', merchant);
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

  const addProduct = () => {};

  const processImage = (e) => {
    //setImage(e.target.files[0]);
    //if (image !== null) {
    uploadImage(e.target.files[0]);
    //}
  };

  const uploadImage = (image) => {
    let form = new FormData();
    form.append('file', image);
    setIsLoading(true);
    setLoadingText('Uploading...');
    Axios.post(`${REACT_APP_API_URL}/upload`, form, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        const payload = response.data.payload;
        setImageList([...imageList, payload]);
        //  setImage(null);
        setIsLoading(false);
        getToast('Success', 'File was uploaded successfully', 'success');
        console.log('===>image list<=====', imageList);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        getToast('Error', 'File could not be uploaded', 'error');
      });
  };

  const ShowImage = ({ image }) => {
    console.log('Image Route: ', image);
    const { name, path, extension, id } = image;
    return (
      <Box border={'none'} bg='#fff' p='20px' borderRadius='10px'>
        <Flex justifyContent={'flex-end'}>
          <BsThreeDots size={'16px'} cursor='pointer' />
        </Flex>
        <Box height={'100%'}>
          <Image src={`${REACT_APP_API_URL}/upload/file/${name}`} alt='' />
        </Box>
        <Box mt='20px'>
          <HStack mt='8' justify={['space-between', 'flex-end']}>
            <BsTrash cursor='pointer' onClick={() => removeImage(image)} />
            <Text>
              {image.isProfile ? (
                <BsCheckLg />
              ) : (
                <Text cursor='pointer' onClick={() => makeProfileImage(image)}>
                  default image?
                </Text>
              )}
            </Text>
          </HStack>
        </Box>
      </Box>
    );
  };

  const makeProfileImage = (image) => {
    image.isProfile = true;
    const mapped = imageList.map((img) => (img.id === image.id ? image : img));
    setImageList(mapped);
  };

  const removeImage = (image) => {
    const filter = imageList.filter((imagee) => image.id !== imagee.id);
    setImageList(filter);
  };

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        {isMobile ? (
          <AiOutlinePlus color='#fff' />
        ) : (
          <>
            <AiOutlinePlus color='#fff' />
            <span style={{ marginLeft: '10px' }}>Create new</span>
          </>
        )}
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody p='50px'>
            {imageList.map((data, i) => {
              return <ShowImage key={i} image={data} />;
            })}
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
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
              <GridItem colSpan={1}>
                <div className='inputContainer'>
                  <input
                    type='text'
                    className='input'
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                  <label htmlFor='business-name' className='label'>
                    Price
                  </label>
                </div>
              </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
              <GridItem colSpan={1}>
                <div className='inputContainer'>
                  <input
                    type='text'
                    className='input'
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  />
                  <label htmlFor='business-name' className='label'>
                    Status
                  </label>
                </div>
              </GridItem>

              <GridItem colSpan={1}>
                <div className='inputContainer'>
                  <input
                    type='text'
                    className='input'
                    onChange={(e) => setQty(e.target.value)}
                    value={qty}
                  />
                  <label htmlFor='business-name' className='label'>
                    Qty
                  </label>
                </div>
              </GridItem>
            </SimpleGrid>

            <FormControl>
              <FormLabel htmlFor='description' {...labelStyles}>
                Description
              </FormLabel>
              <Textarea
                id='description'
                name='description'
                type='text'
                rows='2'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <SimpleGrid columns={1} columnGap={3} rowGap={6} w='full'>
              <GridItem colSpan={1}>
                <div className='inputContainer'>
                  <input
                    type='file'
                    className='input'
                    onChange={(e) => processImage(e)}
                  />
                  <label htmlFor='business-logo' className='label'>
                    Choose a product image
                  </label>
                </div>
              </GridItem>
            </SimpleGrid>

            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={addProduct}
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
