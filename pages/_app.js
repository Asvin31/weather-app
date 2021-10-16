import CssBaseline from '@mui/material/CssBaseline';
import WrapperComp from '../components/WrapperComp';
import ThemeContextProvider from '../context/ThemeContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <WrapperComp>
        <CssBaseline />
        <Component {...pageProps} />
      </WrapperComp>
    </ThemeContextProvider>
  )
}

export default MyApp
