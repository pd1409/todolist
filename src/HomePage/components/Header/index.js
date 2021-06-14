import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GoogleMap from '../GoogleMap';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
    grid: {
        margin: "8px 0px",
    },
    container: {
        display: "flex",
        alignItems: "center"
    }
}));

const Header = React.memo(props => {
    const classes = useStyles();
    const { noteType, selectFile, currentFile, text, changeText, addItem, handleRadioChange, mapData, getCoordinates,
        handleChangeMapData} = props;

    return (
        <Grid container className={classes.grid}>
            <Grid item md={12}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Choose note type</FormLabel>
                    <RadioGroup color="primary" style={{display: "block"}} value={noteType} onChange={handleRadioChange}>
                        <FormControlLabel value="Text" control={<Radio />} label="Text" />
                        <FormControlLabel value="Image" control={<Radio />} label="Image" />
                        <FormControlLabel value="Location" control={<Radio />} label="Location" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item md={12}>
                <Grid container spacing={2} className={classes.container}>
                    <Grid item md={10} className={classes.container}>
                        {noteType === "Text" ?
                            <TextField
                                autoFocus
                                placeholder="Enter a text"
                                id="filled-start-adornment"
                                inputProps={{
                                    'aria-label': 'weight',
                                }}
                                variant="outlined"
                                value={text}
                                onChange={e => changeText(e.target.value)}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}
                                inputProps={{
                                    autoComplete: "off",
                        
                                  }}
                            />

                            : noteType === "Image" ?
                                <>
                                    <Button
                                        variant="outlined"
                                        component="label"
                                    >
                                        Choose File
                                        <input
                                            style={{ display: "none" }}
                                            type="file"
                                            onChange={selectFile}
                                            onClick={event => {
                                                event.target.value = null;
                                            }}
                                            accept="image/*"
                                        />
                                    </Button>
                                    <div>
                                        {currentFile ? currentFile.name : null}
                                    </div></>
                                :
                                <GoogleMap
                                 mapData={mapData}
                                 getCoordinates={getCoordinates}
                                 handleChangeMapData={handleChangeMapData}
                                 />

                        }
                    </Grid>
                    <Grid item md={2}>
                        <Button size="small" variant="contained" color="primary" 
                        onClick={() => addItem(noteType)}
                        disabled={noteType==="Text" ? !text : noteType=== "Image" ? !currentFile : !mapData.address}
                        >Add</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
})
export default Header;
