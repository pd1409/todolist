import React from 'react';
import data from "../../../config.json";
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    selectedTab: {
     background: "#bee5eb",
     cursor: "pointer",
     border: "1px solid black"
    },
    tab: {
        background: "none",
        cursor: "pointer"
    }
}));

 const Footer = React.memo(props => {
    const {filter, changeFilter} = props;
    const classes = useStyles();
    return (
        <footer className="clearfix">
            <List className={classes.root}>
            {data.filters.map(key => (
                <ListItem onClick={() => changeFilter(key)} key={key} 
                className={key===filter ? classes.selectedTab : classes.tab}>
                        {key}
                </ListItem>
            ))}
        </List>
        </footer>
    );
});

export default Footer;

