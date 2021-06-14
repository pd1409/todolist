import React from 'react';
import Item from '../Item';
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List"

const useStyles = makeStyles((theme) => ({
    root: {
        background: "#eae8e8",
        height: "250px",
        overflowY: "scroll"
    }
}));

const FilteredList = React.memo(props => {
    const {items, changeStatus, deleteItem, archiveUnarchiveItem} = props;
    const classes = useStyles();
    if (items.length === 0) {
        return (
            <p className="alert alert-info">There are no items.</p>
        );
    }

    return (
        <List className={classes.root}>
            {items.map(item => (
                <Item key={item.id} data={item} changeStatus={changeStatus} deleteItem={deleteItem} archiveUnarchiveItem={archiveUnarchiveItem}/>
            ))}
    </List>
    );
});
export default FilteredList;
