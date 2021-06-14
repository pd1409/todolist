import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { authenticationService } from './server/services';
import { PrivateRoute } from './routes/privateRoutes';
import HomePage from './HomePage';
import LoginPage from './LoginPage';



class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={this.props.history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark" style={{display: "flex", justifyContent: "flex-end"}}>
                            <div className="navbar-nav">
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron" style={{height: "100vh"}}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <PrivateRoute exact path="/" component={HomePage} />
                                    <Route path="/login" component={LoginPage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App; 