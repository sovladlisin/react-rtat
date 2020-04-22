import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';

import { logout } from '../../actions/auth'
import PrivateRoute from './PrivateRoute';

export class Header extends Component {


    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    render() {
        const { isAuthenticated, user } = this.props.auth
        const style = {
            float: "right"
        }
        const guestLinks = (
            <div style={style}><Link to="/login"><p>Вход</p></Link></div>
        )
        const authLinks = (
            <Fragment>
                <div><button onClick={() => { this.props.handler('Account') }}>{user ? 'Личный кабинет: ' + user.username : null}</button></div>
            </Fragment>
        )
        return (
            <div className="header">
                <div><Link to="/"><p>Главная</p></Link></div>
                <div><button onClick={() => { this.props.handler('Library') }}><p>Библиотека ресурсов</p></button></div>
                {isAuthenticated ? authLinks : guestLinks}

                {/* <div><Link to="/"><p>Главная</p></Link></div>
                <div><Link to="/resources"><p>Библиотека ресурсов</p></Link></div>
                <div><Link to="/"><p>Онтология</p></Link></div> */}
            </div>
        )
    }
}

const mapDispatchToProps = {
    logout,
};

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

