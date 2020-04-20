import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';

import { logout } from '../../actions/auth'

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
                <div style={style}><button onClick={this.props.logout}><p>Выход</p></button></div>
                <p>{user ? 'Текущий пользователь: ' + user.username : null}</p>
            </Fragment>
        )
        return (
            <div className="header">
                <div><Link to="/"><p>Главная</p></Link></div>
                <div><button onClick={this.props.handler}><p>Библиотека ресурсов</p></button></div>
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

