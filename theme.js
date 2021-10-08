import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: '#84ffff',
        },
        secondary: {
            main: '#00acc1',
        },
        background: {
            default: '#eaeaea'
        },
        divider: {
            main: '#000',
            default: "#000"
        }
    },
});

export const darkTheme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: '#00b8d4',
        },
        secondary: {
            main: '#84ffff',
        },
        background: {
            default: '#eaeaea'
        }
    },

})