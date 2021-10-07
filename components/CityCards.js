import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Grid from "@mui/material/Grid";
import Link from 'next/link'


const CityCards = ({ city }) => {
    /**
     * Function to return the date and time
     * @returns Date and time
     */
    function GetContent() {
        Number.prototype.pad = function (size) {
            var s = String(this)
            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
        }
        var dateNow = new Date();
        var day = dateNow.getDate();
        var month = dateNow.getMonth() + 1;
        var year = dateNow.getFullYear();
        var time = dateNow.toLocaleTimeString().replace(/(.*)\D\d+/, '$1')
        var dateToDisplay = year + '-' + month.pad() + '-' + day.pad()
        return (
            <Grid item sm={12} xs={12} container>
                <Grid item sm={6} xs={12} container justifyContent="flex-start">
                    <Typography>Date - {dateToDisplay}</Typography>
                </Grid>
                <Grid item sm={6} xs={12} container justifyContent="flex-end">
                    <Typography>Updated At - {time}</Typography>
                </Grid>
            </Grid>
        )
    }
    return (
        <Link href={`/city/${city.woeid}`}>
            <Card variant="outlined" style={{ cursor: 'pointer' }}>
                <CardHeader
                    title={city.title}
                />
                <CardActions disableSpacing>
                    <GetContent />
                </CardActions>
            </Card>
        </Link>
    )
}
export default CityCards