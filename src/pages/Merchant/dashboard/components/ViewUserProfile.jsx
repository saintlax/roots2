import {
  Box,
  Img,
  Stack,
  Text,
  HStack,
  FormControl,
  Input,
  FormLabel,
  Button,
} from '@chakra-ui/react';
//import profileBg from '../../../../assets/images/profile background.svg';
//import profilePic from '../../../../assets/images/profile-pic.svg';
import FormInput from '../../../../components/common/FormInput';
import { BiLock, BiPencil } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionTypes } from '../../../../redux/constants/action-types';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';

const { REACT_APP_API_URL } = process.env;

const ViewUserProfile = ({ onClose, user }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Please wait..');
  const [profileImage, setProfileImage] = useState('');

  const toast = useToast();
  const dispatch = useDispatch();
  useEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setMiddleName(user?.middleName);
    setEmail(user?.email);
    setPhoneNumber(user?.phoneNumber);
    setAddress(user?.address);
    setProfileImage(user?.profileImage);
  }, [user]);

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

  const updateUser = () => {
    if (firstName && lastName && phoneNumber) {
      setIsLoading(true);
      let payload = {
        ...user,
        firstName,
        lastName,
        phoneNumber,
        address,
        middleName,
        profileImage,
      };
      delete payload.branches;
      delete payload.merchant;
      delete payload.createdOn;
      delete payload.__v;
      delete payload._id;
      delete payload.updatedOn;
      delete payload.password;
      delete payload.isActive;
      delete payload.isAdmin;
      delete payload.accountId;
      delete payload.isDeleted;
      putUser(payload);
    } else {
      getToast(
        'Validation Error',
        'First name, Last name and phoe are required',
        'error'
      );
    }
  };

  const putUser = async (payload) => {
    setIsLoading(true);
    setLoadingText('please wait..');
    await Axios.put(`${REACT_APP_API_URL}/users/${payload.id}`, payload)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payloadd = response.data.payload;
          const updatedUser = {
            ...user,
            firstName,
            lastName,
            phoneNumber,
            address,
            middleName,
            profileImage,
          };
          dispatch({ type: ActionTypes.EDIT_USER, payload: updatedUser });
          getToast('Success', 'Updated successfully', 'success');
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
        getToast('Updtae error', error?.response?.data?.error, 'error');
        setIsLoading(false);
      });
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
        setProfileImage(path);

        getToast('Success', 'Image was uploaded successfully', 'success');
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        getToast('Error', 'File could not be uploaded', 'error');
      });
  };
  return (
    <Stack h='100%' px={[0, 2, 5]} w='100%'>
      <Box px={[null, null, '0.2%']} pos='relative'>
        <FormControl mt='10px'>
          <Stack
            spacing={[null, null, '2']}
            direction={['column', 'column', 'row']}
          >
            <FormInput
              icon={<BiPencil />}
              label='First Name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormInput
              icon={<BiPencil />}
              label='Middle Name'
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
            <FormInput
              icon={<BiPencil />}
              label='Last Name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Stack>
          <Stack
            spacing={[null, null, '5']}
            direction={['column', 'column', 'row']}
          >
            <FormInput
              icon={<BiPencil />}
              label='Phone'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <FormInput
              icon={<BiLock />}
              label='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={true}
            />
          </Stack>
          <FormInput
            icon={<BiPencil />}
            label='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <FormControl>
            <FormLabel htmlFor='name' {...labelStyles}>
              Profile Image
            </FormLabel>
            <Input
              id='profileImage'
              type='file'
              onChange={(e) => uploadImage(e.target.files[0])}
            />
          </FormControl>
          <Box pos='relative'>
            <HStack mt='8' justify={['space-between', 'flex-end']}>
              <Button
                bg='primary'
                px='30px'
                color='#fff'
                onClick={updateUser}
                isLoading={isLoading}
                loadingText={loadingText}
              >
                Update
              </Button>
            </HStack>
          </Box>
        </FormControl>
      </Box>
    </Stack>
  );
};

export default ViewUserProfile;
const labelStyles = {
  fontSize: '14px',
  color: '#1E223E',
  mb: '5px',
  mt: '10px',
};
