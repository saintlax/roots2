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
  Select,
} from '@chakra-ui/react';
import { BsThreeDots, BsTrash, BsCheckLg } from 'react-icons/bs';

import { AiOutlinePlus } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { FiEdit } from 'react-icons/fi';

const { REACT_APP_API_URL } = process.env;

export const EditProductModal = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const merchant = useSelector((state) => state.merchant);
  const products = useSelector((state) => state.products);
  const branch = useSelector((state) => state.userBranch);
  // console.log('merchant ===>', merchant);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Please wait..');
  const productCategories = useSelector((state) => state.productCategories);

  useEffect(() => {
    setName(product?.name);
    setPrice(product?.price);
    setQty(product?.qty);
    setStatus(product?.status);
    setCategory(product?.category);
    setDescription(product?.description);
    setImages(product?.images);

    setIsLoading(false);
  }, [product]);

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

  const editProduct = () => {
    if (!name || !price) {
      getToast(
        'Validation Error',
        'Name and price are required fields',
        'error'
      );
      return;
    }
    if (!category) {
      getToast('Validation Error', 'Category is required field', 'error');
      return;
    }
    const productt = {
      ...product,
      name,
      price,
      qty,
      status,
      images,
      description,
      category,
    };
    product = { ...product, productt };
    delete productt._id;
    delete productt._id;
    delete productt.updatedOn;
    delete productt.__v;
    delete productt.createdOn;
    delete productt.profileImage;
    if (productt.payload) {
      delete productt.payload;
    }
    putProduct(productt);
  };

  const clearFields = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImages([]);
    setQty('');
    setStatus('');
    setCategory('');
  };
  const putProduct = async (product) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.put(`${REACT_APP_API_URL}/products/${product.id}`, product)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          product = { ...product, payload };
          dispatch({ type: ActionTypes.EDIT_PRODUCT, payload: product });
          getToast('Success', 'Product updated successfully', 'success');
          setIsLoading(false);
          // clearFields();
          onClose();
          console.log('REDUX PRODUCTS', products);
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
        getToast('Product error', 'Product could not be updated', 'error');
        setIsLoading(false);
      });
  };

  const processImage = (e) => {
    uploadImage(e.target.files[0]);
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
        setImages([...images, payload]);
        //  setImage(null);
        setIsLoading(false);
        getToast('Success', 'File was uploaded successfully', 'success');
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        getToast('Error', 'File could not be uploaded', 'error');
      });
  };

  const ShowImage = ({ image }) => {
    const { name, path, extension, id } = image;
    return (
      <Box border={'none'} bg='#fff' p='5px' borderRadius='10px'>
        <Flex justifyContent={'flex-end'}>
          <BsThreeDots size={'16px'} cursor='pointer' />
        </Flex>
        <Box height={'120px'} w='160px'>
          <Image height={'100%'} w='100%' src={path} alt='' />
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
    //remove all isProfile
    const newArr = images.map(({ isProfile, ...rest }) => {
      return rest;
    });
    const mapped = newArr.map((img) => (img.id === image.id ? image : img));
    setImages(mapped);
  };

  const removeImage = (image) => {
    const filter = images.filter((imagee) => image.id !== imagee.id);
    setImages(filter);
  };

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        <FiEdit />
        <span style={{ marginLeft: '10px' }}>Edit</span>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody p='50px'>
            <HStack spacing='2px' overflowX='scroll'>
              {images.map((data, i) => {
                return <ShowImage key={i} image={data} />;
              })}
            </HStack>
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
              <Select
                size='sm'
                placeholder='Choose Category'
                border='none'
                _focus={{ border: 'none' }}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {productCategories.map((categoryy, i) => {
                  return (
                    <option value={categoryy.name}>{categoryy.name}</option>
                  );
                })}
              </Select>
            </FormControl>

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
                onClick={editProduct}
                isLoading={isLoading}
                loadingText={loadingText}
              >
                Edit
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
