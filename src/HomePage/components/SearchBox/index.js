import React from 'react';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: "8px 0px",
    display: "flex",
    alignItems: "center"
  }
}));

const SearchBox = React.memo(props => {
  const { query, setSearchQuery } = props;
  const classes = useStyles();

  return (
    <Grid container className={classes.grid}>
      <Grid item md={12}>
        <TextField
          autoFocus
          placeholder="Search"
          id="filled-start-adornment"
          inputProps={{
            'aria-label': 'weight',
          }}
          value={query}
          onChange={e => setSearchQuery(e.target.value)}
          fullWidth
          inputProps={{
            autoComplete: "off",

          }}
        />
      </Grid>
    </Grid>
  );
});
export default SearchBox;