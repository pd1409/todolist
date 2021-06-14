import React from 'react';
import ListItem from "@material-ui/core/ListItem"
import Checkbox from "@material-ui/core/Checkbox"
import IconButton from "@material-ui/core/IconButton"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Grid from "@material-ui/core/Grid"
import Tooltip from "@material-ui/core/Tooltip"
import ArchiveIcon from '@material-ui/icons/Archive';
import UnarchiveIcon from '@material-ui/icons/Unarchive';

const TodoItem = React.memo(props => {
  const { data, changeStatus, deleteItem, archiveUnarchiveItem } = props;

  return (
    <ListItem key={data.id} button>
      <Grid container spacing={2} key={data.id}>
        <Grid item md={8} style={data.checked ? { textDecoration: "line-through" } : {}}>
        {data.text}
        {data.type === "Image" && <Grid container>
        <img src={data.imageData} alt="image" />
      </Grid>}
        </Grid>
        <Grid item md={4} align="right">
        {data.archived ? 
                <Tooltip title="Unarchive">
                <IconButton edge="end" aria-label="delete" onClick={() => archiveUnarchiveItem(data.id, false)}>
                  <UnarchiveIcon color="secondary" />
                </IconButton>
              </Tooltip>
              :
        <Tooltip title="Archive">
          <IconButton edge="end" aria-label="delete" onClick={() => archiveUnarchiveItem(data.id, true)}>
            <ArchiveIcon color="primary" />
          </IconButton>
        </Tooltip>}
        <Tooltip title="Complete">
          <Checkbox
            edge="end"
            onChange={(e) => changeStatus(data.id, e.target.checked)}
            checked={data.checked}
            color="primary"
          />
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton edge="end" aria-label="delete" onClick={() => deleteItem(data.id)}>
            <DeleteOutlineIcon color="primary" />
          </IconButton>
        </Tooltip>
          </Grid>
      </Grid>
    </ListItem>
  );
});
export default TodoItem;
