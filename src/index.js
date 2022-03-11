import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import UserTypeContextProvider from './context/userAuthContext/userTypeContext';

const theme = extendTheme({
  colors: {
    primary: '#1459DF',
    green: '#009A49',
    darkGray: '#4A4C4F',
    lightGray: '#C4C4C4',
    extraLightGray: '#B7B7B8',
    red: '#FF1A1A',
    whiteBg: '#E8EAF5',
    yellow: '#FFC529',
  },
  styles: {
    global: {
      body: {
        fontSize: '14px',
        fontWeight: 400,
        color: '#4A4C4F',
        fontFamily: 'FilsonPro-Regular, FilsonPro-Medium !important',
      },
      h1: {
        fontSize: '25px',
        fontWeight: 600,
        color: '#35373A',
      },
      h2: {
        fontSize: '20px',
        fontWeight: 600,
        color: '#4A4C4F',
        fontFamily: 'Circular Std Medium',
      },
      h3: {
        fontSize: '18px',
        fontWeight: 500,
        color: '#4A4C4F',
        fontFamily: 'Circular Std Medium',
      },
      h4: {
        // dark small header
        fontSize: '16px',
        fontWeight: 500,
        // color: '#4A4C4F' dark gray
      },
      h5: {
        // light small title
        fontSize: '16px',
        fontWeight: 400,
        // color:'#4A4C4F'
      },
      small: {
        color: ' #C4C4C4',
        fontSize: '12px',
        // fontWeight: 400,
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <UserTypeContextProvider>
          <App />
        </UserTypeContextProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
