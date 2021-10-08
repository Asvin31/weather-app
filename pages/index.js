import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import NearByCities from "../components/NearByCities";
import Spinner from "../components/Spinner";
import { constants } from "../components/constants";
import Header from "../components/Header";

export default function Home() {
  /**
   * Declaration of states and const 
   */
  const { backgroundImagePath } = constants;
  const weatherApi = "https://www.metaweather.com/api/location/"
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [cities, setCities] = useState([]);

  /**
   * Inital call for the page
   */
  useEffect(() => {
    window?.navigator?.geolocation?.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        callLocationBasedInfo(position.coords.latitude, position.coords.longitude)
      },
      err => {
        setErrorMessage(err.message)
        setLoading(false);
      }
    );
  }, [])

  /**
   * Function to get the locations based on the
   * given lat and lang
   * @param {int} lat 
   * @param {int} long 
   */
  function callLocationBasedInfo(lat, long) {
    fetch("/api/location/?lat=" + lat + "&long=" + long, {
      method: 'GET'
    }).then(function (response) {
      if (response.status == 200) {
        response.json().then(function (result) {
          setCities(result.result);
          setLoading(false);
        })
      }
      else {
        setLoading(false);
        setErrorMessage("Not able to get details for your location")
      }
    })
      .catch(function (err) {
        setLoading(false);
        setErrorMessage(err)
      })
  }

  /**
   * Return the html
   */
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
      <Grid item sm={12} md={12} xs={12}>
        <Container>
          {loading && <Spinner message={"Please Accept Location Request"} />}
          {!loading && cities && cities.length > 0 && <NearByCities cities={cities} />}
          {!loading && errorMessage && <p>{errorMessage}</p>}
        </Container>
      </Grid>
    </Grid>
  )
}
