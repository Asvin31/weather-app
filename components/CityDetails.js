import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { directions } from './directions';
import { getDate } from './GetDate';
import SourceDetails from './SourceDetails';

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary"
                    style={{ fontWeight: 'bold' }}>
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
};

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    boxShadow: 'none !important',
    backgroundColor: theme.palette.background.card
}));

const CityDetails = ({ weather, weatherSource, title, sunDetails, parent }) => {
    const useStyles = makeStyles((theme) => ({
        divider: {
            background: theme.palette.divider,
            height: '1%'
        }
    }))
    const classes = useStyles();
    /**
     * Common Component to display cards of weather data
     * @param {weather details} param0 
     * @returns 
     */
    const WeatherDetails = ({ weatherDetail }) => {
        const useStyles = makeStyles((theme) => ({
            iconStyle: {
                transform: cssProp,
                marginRight: '1%',
                margin: '-5%'
            },
            card: {
                backgroundColor: theme.palette.background.card
            }
        }))
        const classes = useStyles();
        const cssProp = 'rotate(' + directions[weatherDetail.wind_direction_compass] + ')'
        return (
            <Card variant="outlined" className={classes.card}>
                <CardHeader
                    title={getDate(weatherDetail.applicable_date)}
                />
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <Image
                            src={`https://www.metaweather.com/static/img/weather/${weatherDetail.weather_state_abbr}.svg`}
                            width={25}
                            height={25}
                            quality={100}
                        />
                        <Typography variant="subtitle1" style={{ marginLeft: '4%', marginTop: '2%' }}>
                            {weatherDetail.weather_state_name}
                        </Typography>
                    </Box>
                    <Divider />
                    <Typography variant="subtitle2">
                        Min : {weatherDetail.min_temp.toFixed(0)}&deg;C
                    </Typography>
                    <Typography variant="subtitle2">
                        Max : {weatherDetail.max_temp.toFixed(0)}&deg;C
                    </Typography>
                    <Divider />
                    <Typography variant="subtitle2" style={{ margin: '2% 0%' }}>
                        <ArrowUpwardSharpIcon className={classes.iconStyle} />
                        {weatherDetail.wind_speed.toFixed(0)}mph
                    </Typography>
                    <Divider />
                    <Stack direction="row" spacing={2}>
                        <Item>
                            <Typography variant="subtitle2">
                                Humidity :
                            </Typography>
                        </Item>
                        <Item>
                            <CircularProgressWithLabel variant="determinate" value={weatherDetail.humidity.toFixed(0)} />
                        </Item>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Item>
                            <Typography variant="subtitle2">
                                Visibility :
                            </Typography>
                        </Item>
                        <Item>
                            <CircularProgressWithLabel variant="determinate" value={weatherDetail.visibility.toFixed(0)} />
                        </Item>
                    </Stack>
                    <Divider />
                    <Typography variant="subtitle2">
                        Pressure : {weatherDetail.air_pressure.toFixed(0)}mb
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Typography variant="subtitle2">
                        Confidence : {weatherDetail.predictability.toFixed(0)}%
                    </Typography>
                </CardActions>
            </Card>
        )
    }

    /**
     * Resuable function to display sun details for the city
     * source value pair to render dynamic data
     * @param {source, value} param0 
     * @returns 
     */
    const SunContent = ({ source, value }) => {
        return (
            <>
                <Grid container item sm={6} xs={6} justifyContent="flex-start">
                    <Typography variant="subtitle2">{source}</Typography>
                </Grid>
                <Grid container item sm={6} xs={6} justifyContent="flex-end">
                    <Typography variant="subtitle2">{value}</Typography>
                </Grid>
            </>
        )
    }

    function returnTime(time) {
        var timeToReturn = new Date(time);
        return timeToReturn.toLocaleTimeString().replace(/(.*)\D\d+/, '$1')
    }

    return (
        <Grid item sm={12} xs={12} container spacing={3}>
            <Grid item sm={12} xs={12} container spacing={3} justifyContent="space-evenly"
                alignItems="center">
                <Grid item sm={10} xs={12}>
                    <Typography variant="h4" style={{ display: 'flex' }}>{title}
                        <Typography variant="subtitle1" style={{ marginTop: '1%' }}>,{parent?.title}</Typography>
                    </Typography>
                </Grid>
                <Grid item sm={2} xs={12} container spacing={1}>
                    <SunContent source="Sunrise" value={returnTime(sunDetails?.rise)} />
                    <SunContent source="Sunset" value={returnTime(sunDetails?.set)} />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Divider className={{ root: classes.divider }} />
                </Grid>
            </Grid>
            <Grid item sm={12} xs={12} md={12} container spacing={1} justifyContent="space-evenly"
                alignItems="center">
                {weather.map((eachWeather) => (
                    <Grid item sm={2} xs={6} md={2} key={eachWeather.id}>
                        <WeatherDetails weatherDetail={eachWeather} />
                    </Grid>
                ))}
            </Grid>
            <Grid item sm={12} xs={12} container spacing={1} justifyContent="flex-start">
                <Grid item sm={6} xs={12} container justifyContent="flex-start" alignSelf="flex-start">
                    <SourceDetails weatherSource={weatherSource} />
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Divider className={{ root: classes.divider }} />
                </Grid>
            </Grid>
        </Grid>
    )
}
export default CityDetails