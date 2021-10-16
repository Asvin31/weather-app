import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from "react";
import { ThemeContext } from '../context/ThemeContext';
import cities from '../data/cities.json';



const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

const Header = () => {
    const { currentTheme, storeTheme } = useContext(ThemeContext);
    const router = useRouter()
    async function searchLocation(city) {
        try {
            const { name } = city;
            const res = await fetch("/api/searchCity?name=" + name);
            const data = res.status == 200 && await res.json();
            const { result } = data;
            router.push("/city/" + result[0]?.woeid);

        }
        catch (err) {
            console.error(err)
        }
    }

    const changeTheme = () => {
        currentTheme != undefined && currentTheme == "light" ? storeTheme("dark") : storeTheme("light")
    }
    const useStyles = makeStyles((theme) => ({
        card: {
            backgroundColor: theme.palette.background.card
        },
        box: {
            backgroundColor: theme.palette.background.card
        }
    }))
    const classes = useStyles();
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid item sm={12} xs={12} container spacing={2} justifyContent="center">
                        <Grid item sm={8} xs={12} md={9} container justifyContent="center" align="center">
                            <Grid item sm={4} xs={12} md={3} container justifyContent="center" align="center">
                                <Link href="/">
                                    <Image
                                        src="https://www.metaweather.com/static/img/weather/s.svg"
                                        width={35}
                                        height={35}
                                        quality={100}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Link>
                                <Link href="/">
                                    <Typography variant="h5" style={{ marginLeft: '4%', marginTop: '7%', cursor: 'pointer' }}>
                                        Weather App
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item sm={9} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            </Grid>
                        </Grid>
                        <Grid item sm={3} md={2} xs={12} container justifyContent="center" align="center">
                            <Autocomplete
                                id="country-select-demo"
                                sx={{ width: 300 }}
                                options={cities}
                                onChange={(event, newValue) => {
                                    newValue != null && searchLocation(newValue)
                                }}
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Box {...props} className={classes.box}>
                                        {option.name},{option.state}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className={classes.card}
                                        placeholder="Choose a City"
                                        inputProps={{
                                            ...params.inputProps,
                                            //autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                        margin="dense"
                                        color="primary"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item sm={1} md={1} xs={1} container justifyContent="center" align="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <MaterialUISwitch
                                    sx={{ m: 1 }}
                                    checked={currentTheme == "dark"}
                                    onChange={changeTheme}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Offset sx={{ display: { md: 'none', sm: 'block', xs: 'block' } }} />
            <Offset />
        </>
    )

}
export default Header