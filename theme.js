import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey, purple } from '@mui/material/colors';

let theme = createTheme({
    palette: {
        primary: {
            main: grey[300],
        },
        secondary: {
            main: purple[500],
        },
    },
});
theme = responsiveFontSizes(theme);

export default theme;