
import { ThemeProvider } from '@mui/material/styles';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { darkTheme, theme } from '../theme';

const WrapperComp = ({ children }) => {
    const { currentTheme } = useContext(ThemeContext);
    return (
        <ThemeProvider theme={currentTheme == "light" ? theme : darkTheme}>
            {children}
        </ThemeProvider>
    )
}

export default WrapperComp