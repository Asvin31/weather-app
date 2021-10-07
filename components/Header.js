import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Image from 'next/image'
import Grid from '@mui/material/Grid'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.75),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 1),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const Header = () => {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Grid item sm={12} xs={12} container spacing={2} justifyContent="center">
                        <Grid item sm={9} xs={12} md={10} container justifyContent="center" align="center">
                            <Grid item sm={4} xs={12} md={3} container justifyContent="center" align="center">
                                <Image
                                    src="https://www.metaweather.com/static/img/weather/s.svg"
                                    width={35}
                                    height={35}
                                    quality={100}
                                />
                                <Typography variant="h5" style={{ marginLeft: '4%', marginTop: '2%' }}>
                                    Weather App
                                </Typography>
                            </Grid>
                            <Grid item sm={9} sx={{ display: { xs: 'none', sm: 'block' } }}>
                            </Grid>
                        </Grid>
                        <Grid item sm={3} md={2} xs={12} container justifyContent="center" align="center">
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
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