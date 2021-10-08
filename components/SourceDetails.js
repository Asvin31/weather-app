import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Link from "next/link";

const SourceDetails = ({ weatherSource }) => {
    return (
        <List
            sx={{ width: '50%', bgcolor: 'background.paper', padding: '4%' }}
            component="nav"
            subheader={
                <ListSubheader id="nested-list-subheader">
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