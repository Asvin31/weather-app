import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

/**
 * Common Component for spinner
 * @param {String} param0 message(optional)
 * @returns progress element
 */
const Spinner = ({ message }) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant="indeterminate"
                disableShrink
                size={40}
                thickness={3}
            />
            <Box
                sx={{
                    top: { sm: '150%', xs: '200%' },
                    left: { sm: '-350%', xs: '-275%' },
                    width: 'max-content',
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h5" component="div" color="text.primary">
                    {message}
                </Typography>
            </Box>
        </Box>
    );
}

/**
 * Default props for the Spinner  component
 */
Spinner.defaultProps = {
    message: 'Loading...'
}

export default Spinner