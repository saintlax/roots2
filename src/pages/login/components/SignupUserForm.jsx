import { useState } from 'react';
import { PhoneForm } from './phoneForm';
import { OTPForm } from './OTPForm';
import { BVNForm } from './BVNForm';
import Axios from 'axios';
import { useToast } from '@chakra-ui/toast';
import { ConfirmUserForm } from './ConfirmUserForm';
const { REACT_APP_API_URL } = process.env;

export const SignupUserForm = ({ onVerifyPhone }) => {
  const [hasPhone, setHasPhone] = useState(false);
  const [hasOTP, setHasOTP] = useState(false);
  const [hasBVN, setHasBVN] = useState(false);
  const [otpId, setOtpId] = useState(0);
  const toast = useToast();
  const [userphone, setUserphone] = useState('');
  const [userData, setUserData] = useState({});

  const onPhoneButtonClick = (data) => {
    setUserphone(data.phone);
    getOTP(data.phone);
  };

  const getOTP = async (phone) => {
    await Axios.post(`${REACT_APP_API_URL}/otp`, {
      phoneNumber: phone,
    })
      .then((response) => {
        if (response.status == 200 && response.data.payload.otp) {
          getToast(
            'Confirm Phone',
            'An OTP has been sent to your phone',
            'success'
          );
          setHasPhone(true);
          setOtpId(response.data.payload.id);
          onVerifyPhone(response);
        }
      })
      .catch((err) => {
        console.log('AXIOs error', err);
      });
  };

  const verifyOTP = async (id, payload) => {
    await Axios.put(`${REACT_APP_API_URL}/otp/${id}`, payload)
      .then((response) => {
        if (response.status == 200 && response.data.payload) {
          setHasOTP(true);
          getToast(
            'Successful',
            'Your phone number has been confirmed',
            'success'
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onOTPButtonClick = (data) => {
    const payload = {
      otp: data.otp,
      isUsed: true,
      phoneNumber: userphone,
    };
    verifyOTP(otpId, payload);
  };

  const getToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 5000,
      isClosable: true,
      variant: 'left-accent',
      position: 'top-right',
      containerStyle: {
        // border: '10px solid blue',
        // backgroundColor: 'blue',
      },
    });
  };

  const onBVNButtonClick = (data) => {
    const payload = {
      BVN: data.bvn,
    };
    verifyBVN(payload);
  };

  const verifyBVN = async (payload) => {
    await Axios.post(`${REACT_APP_API_URL}/flutterwave`, payload)
      .then((response) => {
        if (response.status == 200 && response.data.payload) {
          setHasBVN(true);
          console.log('User Data', response.data.payload);
          setUserData(response.data.payload);
          getToast('Successful', 'Your BVN has been confirmed', 'success');
        }
      })
      .catch((err) => {
        console.log(err);
        getToast('Error', 'Something went wrong', 'error');
      });
  };
  const onRegisterButtonClick = (data) => {
    console.log('Completed: ', data);
  };

  const UserReg = () => {
    if (!hasPhone && !hasOTP) {
      return <PhoneForm onButtonClick={onPhoneButtonClick} />;
    } else if (hasPhone && !hasOTP) {
      return <OTPForm onButtonClick={onOTPButtonClick} />;
    } else if (hasPhone && hasOTP && !hasBVN) {
      return <BVNForm onButtonClick={onBVNButtonClick} />;
    } else if (hasPhone && hasOTP && hasBVN) {
      return (
        <ConfirmUserForm
          onButtonClick={onRegisterButtonClick}
          userData={userData}
        />
      );
    }
  };
  return <UserReg />;
};
