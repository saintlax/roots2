import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
} from '@chakra-ui/react';
import '../index.css';

export const MerchantTab = () => {
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
                <input type='text' class='input' placeholder='' />
                <label for='' class='label'>
                  Business Name
                </label>
              </div>

              <div class='inputContainer'>
                <input type='email' class='input' placeholder='' />
                <label for='' class='label'>
                  Email
                </label>
              </div>
            </Flex>
            <div class='inputContainer'>
              <input type='text' class='input' placeholder='' />
              <label for='' class='label'>
                Headquarter Address
              </label>
            </div>

            <div class='inputContainer inputContainer__cac'>
              <input type='text' class='input' placeholder='' />
              <label for='' class='label'>
                CAC Documents
              </label>
            </div>
          </Box>
        </TabPanel>
        <TabPanel>
          <p>Branches</p>
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
