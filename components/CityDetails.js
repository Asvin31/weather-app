import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from '@mui/styles';
import Image from 'next/image';
import { directions } from './directions';
import { getDate } from './GetDate';
import SourceDetails from './SourceDetails';



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
        }))
        const classes = useStyles();
        const cssProp = 'rotate(' + directions[weatherDetail.wind_direction_compass] + ')'
        return (
            <Card variant="outlined">
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
                    <Typography variant="subtitle2">
                        Humidity : {weatherDetail.humidity.toFixed(0)}%
                    </Typography>
                    <Typography variant="subtitle2">
                        Visibility : {weatherDetail.visibility.toFixed(0)}miles
                    </Typography>
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