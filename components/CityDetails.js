import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Grid from "@mui/material/Grid";
import Image from 'next/image'
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { getDate } from './GetDate';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import { directions } from './directions';
import { makeStyles } from '@mui/styles';

const CityDetails = ({ weather, weatherSource, title, sunDetails, parent }) => {

    const WeatherDetails = ({ weatherDetail }) => {
        const cssProp = 'rotate(' + directions[weatherDetail.wind_direction_compass] + ')'
        const useStyles = makeStyles({
            iconStyle: {
                transform: cssProp,
                marginRight: '1%',
                margin: '-5%'
            }
        })
        const classes = useStyles();
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
                </CardContent>
                <CardActions disableSpacing>
                    {/* <GetContent /> */}
                </CardActions>
            </Card>
        )
    }
    return (
        <Grid item sm={12} xs={12} container spacing={3}>
            <Grid item sm={12} xs={12} container spacing={3} justifyContent="space-evenly"
                alignItems="center">
                <Grid item sm={12} xs={12}>
                    <Typography variant="h4" style={{ display: 'flex' }}>{title},
                        <Typography variant="subtitle1" style={{ marginTop: '1%' }}>{parent?.title}</Typography>
                    </Typography>
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
        </Grid>
    )
}
export default CityDetails