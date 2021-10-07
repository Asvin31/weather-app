import CityCards from "./CityCards"
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

const NearByCities = ({ cities }) => {
    return (
        <Grid item sm={12} xs={12} container spacing={3}>
            <Grid item sm={12} xs={12} container spacing={3} justifyContent="space-evenly"
                alignItems="center">
                <Grid item sm={12} xs={12}>
                    <Typography variant="h4">Cities Near you!</Typography>
                </Grid>
                <Grid item sm={4} xs={6}>
                    <CityCards city={cities[0]} />
                </Grid>
            </Grid>
            <Grid item sm={12} xs={12} container spacing={3} justifyContent="space-between"
                alignItems="center">
                {cities.slice(1, cities.length).map((city, index) => (
                    <Grid item sm={4} xs={6} key={city.title}>
                        <CityCards city={city} />
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}
export default NearByCities