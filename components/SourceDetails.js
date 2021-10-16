import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { makeStyles } from '@mui/styles';
import Link from "next/link";


const SourceDetails = ({ weatherSource }) => {
    const useStyles = makeStyles((theme) => ({
        card: {
            backgroundColor: theme.palette.background.card
        }
    }))
    const classes = useStyles();
    return (
        <List
            className={classes.card}
            sx={{ width: '50%', padding: '4%' }}
            component="nav"
            subheader={
                <ListSubheader id="nested-list-subheader" className={classes.card}>
                    Sources
                </ListSubheader>
            }
        >
            {weatherSource.map((source) => (
                <Link href={source.url} >
                    <ListItem disablePadding alignItems="flex-start" style={{ cursor: 'pointer' }}>
                        <ListItemText primary={source.title} />
                    </ListItem>
                </Link>
            ))
            }
        </List >
    )
}

export default SourceDetails