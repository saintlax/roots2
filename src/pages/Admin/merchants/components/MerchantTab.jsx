import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  HStack,
  Text,
  FormLabel,
  Input,
  Circle,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import '../index.css';
import { BiLock } from 'react-icons/bi';
import FormInput from '../../../../components/common/FormInput';
import { BiStore } from 'react-icons/bi';
import Axios from 'axios';
const { REACT_APP_API_URL } = process.env;

export const MerchantTab = ({ merchant }) => {
  const [businessName, setBusinessName] = useState('');
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [businessAcountNumber, setBusinessAcountNumber] = useState('');
  const [nameOfBank, setNameOfBank] = useState('');
  const [CACDocumentPath, setCACDocumentPath] = useState('');
  const [CACDocument, setCACDocument] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setBusinessName(merchant?.businessName);
    setBusinessAcountNumber(merchant?.businessAcountNumber);
    setCompanyAddress(merchant?.companyAddress);
    setEmail(merchant?.email);
    setCompanyPhoneNumber(merchant?.companyPhoneNumber);
    setNameOfBank(merchant?.nameOfBank);
    setCACDocument(merchant?.CACDocument);
    getProducts();
  }, [merchant]);

  const ShowBranches = () => {
    return merchant?.branches.map((branch, i) => {
      return (
        <>
          <Flex
            my={'20px'}
            justifyContent={'space-between'}
            alignItems='center'
            fontWeight={'normal'}
          >
            <Flex
              width={'70%'}
              justifyContent={'space-between'}
              alignItems='center'
            >
              <BiStore size={35} color='#E73152' />
              <Box>
                <Text>Name: {branch?.name}</Text>
                <Text>Address: {branch?.address}</Text>
              </Box>
            </Flex>
            <Text color={'green'}>{branch?.users?.length} user(s)</Text>
          </Flex>
        </>
      );
    });
  };

  const getProducts = async () => {
    const query = `merchantId=${merchant.id}`;
    await Axios.get(`${REACT_APP_API_URL}/products/filter/filter?${query}`)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          const payload = response.data.payload;
          setProducts(payload);
          // dispatch({ type: ActionTypes.REFRESH_PRODUCTS, payload });
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Tabs width={['100%', '100%', '90%']} isFitted>
      <TabList>
        <Tab fontSize={['12px', '14px']} _focus={{ boxShadow: 'none' }}>
          Profile
        </Tab>
        <Tab fontSize={['12px', '14px']} _focus={{ boxShadow: 'none' }}>
          Branches
        </Tab>
        <Tab fontSize={['12px', '14px']} _focus={{ boxShadow: 'none' }}>
          Products
        </Tab>
        <Tab fontSize={['12px', '14px']} _focus={{ boxShadow: 'none' }}>
          Transaction History
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Box width={'100%'}>
            {/* <FormControl
              variant="floating"
              id="first-name"
              isRequired
              isInvalid
            > */}
            <Flex
              direction={['column', 'column', 'row']}
              justifyContent={'space-between'}
              width='100%'
            >
              <div class='inputContainer business-email'>
                <input type='text' class='input' value={businessName} />
                <label htmlFor='businessName' class='label'>
                  Business Name
                </label>
              </div>

              <div class='inputContainer'>
                <input type='email' class='input' value={email} />
                <label htmlFor='email' class='label'>
                  Email
                </label>
              </div>
            </Flex>
            <div class='inputContainer'>
              <input type='text' class='input' value={companyAddress} />
              <label htmlFor='address' class='label'>
                Headquarter Address
              </label>
            </div>

            <Box pos='relative'>
              <FormInput
                icon={<BiLock />}
                label='CAC Document'
                placeholder={'CAC Document Name'}
                value={CACDocument}
              />
              <HStack pos='absolute' top='-5px' bottom='0' right='50px'>
                <Text fontSize={'12px'}>View</Text>
                <FormLabel cursor='pointer' htmlFor='CACDocumentPath'>
                  <Text as='small'>
                    Download
                    <Input id='CACDocumentPath' display={'none'} type='file' />
                  </Text>
                </FormLabel>
              </HStack>
            </Box>
          </Box>
        </TabPanel>
        <TabPanel>
          <ShowBranches />
        </TabPanel>
        <TabPanel>
          <p>Products</p>
        </TabPanel>
        <TabPanel>
          <p>Transaction History</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
