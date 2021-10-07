import { useRouter } from 'next/router'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { constants } from '../../components/constants';
import CityDetails from '../../components/CityDetails';
import Header from '../../components/Header';
import theme from "../../theme"

export default function City() {
    const { backgroundImagePath } = constants;
    const router = useRouter();
    const { query: { cityId } } = router;
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
            })
        }
        else {
            setLoading(false)
            setErrorMessage("Please select a proper city.")
        }
    }, [])
    return (


        <Grid container item sm={12} xs={12} spacing={1}
            justifyContent="center" justifyItems="center" alignContent="center" align="center"
            style={{
                backgroundImage: "url(" + `${backgroundImagePath}` + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
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