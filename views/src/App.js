import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./containers/login/Login";
import Register from "./containers/register/Register";

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={Login} />
                <Route path="/login" component={Login} />
                <Route path="/createUser" component={Register} />
            </Router>
        );
    }
}

export default App;
