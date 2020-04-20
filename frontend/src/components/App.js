import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header'
import Library from './test/Library'
import Container from './windows/Container'
import Login from './accounts/Login'
import Register from './accounts/Register'

import { Provider } from 'react-redux';
import store from '../store';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Editor from './layout/Editor';
import Info from './layout/Info';
import PrivateRoute from './layout/PrivateRoute';

import { loadUser } from '../actions/auth'

class App extends Component {

    constructor(props) {
        super(props)

        this.handler = this.handler.bind(this);
        this.createWindow = this.createWindow.bind(this);

    }

    state = {
        activeComponent: "",
    };

    handler() {
        if (this.state.activeComponent == "") {
            this.setState({
                activeComponent: 'Library'
            })
        }
        else {
            this.setState({
                activeComponent: ''
            })
        }
    };

    createWindow(id, name, model_name = null, pk = null) {
        this.refs.container.createWindow(id, name, model_name, pk)
    }

    componentDidMount() {
        store.dispatch(loadUser())
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header handler={this.handler} />
                        <Container ref="container" />

                        {this.state.activeComponent === 'Library' ? (<Library createWindow={this.createWindow} />) : null}
                        <Switch>
                            <Route exact path="/" component={Info} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/register" component={Register} />
                            <Route
                                exact path="/editor/text/:pk"
                                render={(props) => <Editor {...props} createWindow={this.createWindow} />} />
                        </Switch>

                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));