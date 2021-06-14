import React from 'react';

import { authenticationService } from '../server/services';
import Alert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }
    login = (username, password) => {
        authenticationService.login(username, password)
            .then(user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
            }).catch(err => alert(err));
    };

    render() {
        const { username, password } = this.state;
        const { login } = this;
        return (
            <Grid container data-testid = "login-1">
                <Grid item md={2}></Grid>
                <Grid item md={8}>
                    <Alert severity="info">Username: test<br />
                        Password: test</Alert>
                    <Typography variant="h6" gutterBottom>Login</Typography>
                    <TextField
                        placeholder="Username"
                        id="filled-start-adornment"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        variant="outlined"
                        value={username}
                        onChange={e => this.setState({username: e.target.value})}
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            autoComplete: "off",
                        }}
                    />
                    <br />
                    <br />
                    <TextField
                        placeholder="Password"
                        id="filled-start-adornment"
                        inputProps={{
                            'aria-label': 'weight',
                        }}
                        variant="outlined"
                        value={password}
                        onChange={e => this.setState({password: e.target.value})}
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            autoComplete: "off",
                        }}
                    />
                    <br />
                    <br />
                    <Button disabled={!username || !password} className="button1"
                     variant="contained" color="primary" onClick={() => login(username, password)}>Submit</Button>
                </Grid>
                <Grid item md={2}></Grid>
            </Grid>
        )
    }
}

export default LoginPage;