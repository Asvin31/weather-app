import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import CityDetails from '../../components/CityDetails';
import { constants } from '../../components/constants';
import Header from '../../components/Header';
import Spinner from "../../components/Spinner";

export default function City() {
    const { backgroundImagePath } = constants;
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [weather, setWeather] = useState([]);
    const [weatherSource, setWeatherSource] = useState([]);
    const [parent, setParent] = useState(null);
    const [title, setTitle] = useState(null);
    const [sunDetails, setSunDetails] = useState({
        "rise": null,
        "set": null
    })

    useEffect(() => {
        const { query: { cityId } } = router;
        if (cityId) {
            fetch("/api/city?woeid=" + cityId, {
                method: 'GET'
            }).then(function (response) {
                if (response.status == 200) {
                    response.json().then(function (result) {
                        const { consolidated_weather, sources } = result?.result;
                        setWeather(consolidated_weather);
                        setWeatherSource(sources);
                        setTitle(result.result.title)
                        setParent(result.result.parent)
                        setSunDetails((prevState) => ({
                            ...prevState,
                            "rise": result.result.sun_rise,
                            "set": result.result.sun_set
                        }))
                        setLoading(false)
                        setErrorMessage('')
                    })
                }
                else {
                    setLoading(false)
                    setErrorMessage("Not able to get details for your location")
                }
            }).catch(function (err) {
                setLoading(false)
                setErrorMessage(err)
            })
        }
        else {
            setLoading(false)
            setErrorMessage("Please select a proper city.")
        }
    }, [router])
    return (


        <Grid container item sm={12} xs={12} spacing={1}
            justifyContent="center" justifyItems="center" alignContent="center" align="center"
            style={{
                paddingBottom: '10%'
            }}
        >
            <Grid item sm={12} md={12} xs={12}>
                <Header />
            </Grid>
            <Grid item sm={12} md={12} xs={12} >
                <Container>
                    {loading && <Spinner message={"Pouring your city details soon.."} />}
                    {!loading && weather?.length > 0 &&
                        <CityDetails weather={weather} weatherSource={weatherSource} title={title}
                            sunDetails={sunDetails} parent={parent} />}
                    {!loading && errorMessage && <p>{errorMessage}</p>}
                </Container>
            </Grid >
        </Grid >
    )
}