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
  ModalHeader,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { BsThreeDots, BsTrash, BsCheckLg } from 'react-icons/bs';
import { BsBagCheck } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { BranchesDropdown } from './BranchesDropdown';

const { REACT_APP_API_URL } = process.env;

export const AddProductModal = ({ isMobile, userMerchant }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const merchant = useSelector((state) => state.merchant);
  const products = useSelector((state) => state.products.products);
  const branch = useSelector((state) => state.userBranch);
  const [selectedBranch, setSelectedBranch] = useState({});
  // console.log('merchant ===>', merchant);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Please wait..');
  const productCategories = useSelector((state) => state.productCategories);
  const [profileImage, setProfileImage] = useState('');
  const parse = (val) => val.replace(/^\$/, '');

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

  const addProduct = () => {
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
    if (Object.keys(selectedBranch) === 0 && Object.keys(branch)) {
      getToast('Branch Error', 'Staff branch was not selected', 'error');
      return;
    }
    let product = {
      name,
      price,
      qty,
      status,
      images,
      description,
      profileImage,
      //merchant,
      //merchantId: merchant.id,
      //branch,
      //branchId: branch.id,
      category,
    };
    if (userMerchant && Object.keys(userMerchant).length > 0) {
      product = {
        ...product,
        merchant: userMerchant,
        merchantId: userMerchant.id,
      };
    }
    if (merchant && Object.keys(merchant).length > 0) {
      product = { ...product, merchant, merchantId: merchant.id };
    }

    if (selectedBranch) {
      product = {
        ...product,
        branch: selectedBranch,
        branchId: selectedBranch.id,
      };
    }

    if (branch && branch.id) {
      product = { ...product, branch, branchId: branch.id };
    }

    let filter = products.filter(
      (prod) => prod.name === product.name && prod.price === product.price
    );
    if (filter.length == 0) {
      postProduct(product);
    } else {
      getToast('Duplicate', 'This product already exist', 'error');
    }
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
  const postProduct = async (product) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.post(`${REACT_APP_API_URL}/products`, product)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          dispatch({ type: ActionTypes.ADD_PRODUCT, payload: payload });
          getToast('Success', 'Product created successfully', 'success');
          setIsLoading(false);
          clearFields();
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
        getToast('Product error', error?.response?.data?.error, 'error');
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
        getToast('Error', error?.response?.data?.error, 'error');
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
    setProfileImage(image?.path);
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

  const onBranchIdSelected = (value) => {
    setSelectedBranch(value);
  };

  const productStatuses = ['In stock', 'Out of Stock'];

  return (
    <>
      <Flex onClick={onOpen} alignItems='center' width={'100%'}>
        {isMobile ? (
          <AiOutlinePlus color='#fff' />
        ) : (
          <>
            <AiOutlinePlus color='#fff' />
            <span style={{ marginLeft: '10px' }}>product</span>
          </>
        )}
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
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
                  <Input
                    type='number'
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
                {/* <div className='inputContainer'>
                  <input
                    type='text'
                    className='input'
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  />
                  <label htmlFor='business-name' className='label'>
                    Status
                  </label>
                </div> */}
                Product Status
                <Flex
                  // width={'160px'}
                  justifyContent='center'
                  alignItems={'center'}
                  bg='#fff'
                  borderRadius={'5px'}
                >
                  {/* <BsBagCheck size={26} /> */}
                  
                  <Select
                    size='sm'
                    placeholder='Select status'
                    border='none'
                    _focus={{ border: 'none' }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {productStatuses.map((stat, i) => {
                      return (
                        <option key={i} value={stat}>{stat}</option>
                      );
                    })}
                  </Select>
                </Flex>
              </GridItem>

              <GridItem colSpan={1}>
                {/* <div className='inputContainer'> */}
                  {/* <Input
                    type='number'
                    className='input'
                    onChange={(e) => setQty(e.target.value)}
                    value={qty}
                  /> */}
                  Quantity
                  <NumberInput 
                  defaultValue={1} 
                  min={10} max={10000}
                  onChange={(valueString) => setQty(parse(valueString))}
                  placeholder='Quantity'
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  {/* <label htmlFor='business-name' className='label'>
                    Qty
                  </label> */}
                {/* </div> */}
              </GridItem>
            </SimpleGrid>

            <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
              <GridItem colSpan={1}>
                <Flex
                  // width={'160px'}
                  justifyContent='center'
                  alignItems={'center'}
                  bg='#fff'
                  borderRadius={'5px'}
                >
                  {/* <BsBagCheck size={26} /> */}
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
                </Flex>
              </GridItem>
              <GridItem colSpan={1}>
                <BranchesDropdown onBranchIdSelected={onBranchIdSelected} />
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
            <FormControl>
            <label className='label'>
              Choose a product image(s)
            </label>
                  <br/>
            </FormControl>
            <SimpleGrid columns={1} columnGap={3} rowGap={6} w='full'>
              <GridItem colSpan={1}>
                <div className='inputContainer'>
                  <input
                    type='file'
                    className='input'
                    onChange={(e) => processImage(e)}
                  />
                  {/* <label htmlFor='business-logo' className='label'>
                    Choose a product image
                  </label> */}
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
