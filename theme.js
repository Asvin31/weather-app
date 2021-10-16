import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

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
            default: '#eaeaea',
            card: '#fff'
        },
        divider: {
            main: '#000',
            default: "#000"
        },
        text: {
            primary: grey[900],
            secondary: grey[800],
        },
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
            default: '#000',
            card: '#333333'
        },
        text: {
            primary: '#fff',
            secondary: grey[500],
        },
        divider: {
            main: '#fff',
            default: "#fff"
        }
    },

})