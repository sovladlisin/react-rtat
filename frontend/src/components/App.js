import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header'
import Library from './test/Library'
import Container from './windows/Container'
import Login from './accounts/Login'
import Register from './accounts/Register'

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { Provider } from 'react-redux';
import store from '../store';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Editor from './layout/Editor';
import Info from './layout/Info';
import PrivateRoute from './layout/PrivateRoute';

import { loadUser } from '../actions/auth'
import Account from './layout/Account';
import LoadCheck from './test/LoadCheck';
import Ontology from './ontology/Ontology';
import Alerts from './layout/Alerts';
import CustomAlert from './layout/CustomAlert';

// Alert Options
const alertOptions = {
    timeout: 3000,
    position: 'bottom center',
};


class App extends Component {

    constructor(props) {
        super(props)

        this.handler = this.handler.bind(this);
        this.createWindow = this.createWindow.bind(this);

    }

    state = {
        account: false,
        library: false
    };

    handler(choice) {
        switch (choice) {
            case 'Library':
                this.setState({
                    library: !this.state.library
                })
                break;
            case 'Account':
                this.setState({
                    account: !this.state.account
                })
            default:
                break;
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
                <AlertProvider template={CustomAlert} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Header handler={this.handler} />
                            <Alerts />
                            <Container ref="container" />

                            {this.state.library ? (<Library createWindow={this.createWindow} />) : null}
                            {this.state.account ? (<Account handler={this.handler} />) : null}
                            <Switch>
                                <Route exact path="/" component={Info} />
                                <Route exact path="/login" component={Login} />
                                <Route exact path="/register" component={Register} />
                                <Route
                                    exact path="/ontology"
                                    render={(props) => <Ontology {...props} createWindow={this.createWindow} />} />
                                <Route exact path="/loaderio-dad475efde7ab1a335f97bc6bf875046" component={LoadCheck} />
                                <PrivateRoute exact path="/account" component={Account} />
                                <Route
                                    exact path="/editor/text/:pk"
                                    render={(props) => <Editor {...props} createWindow={this.createWindow} />} />
                            </Switch>

                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));