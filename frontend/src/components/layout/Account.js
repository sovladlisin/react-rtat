import React, { Component, Fragment } from 'react'

import { logout } from '../../actions/auth'
import PrivateRoute from './PrivateRoute';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Account extends Component {


    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    logout = () => {
        this.props.handler('Account')
        this.props.logout()
    }
    render() {
        const { isAuthenticated, user } = this.props.auth
        const active = this.props.auth.active == false ? (<p>Ваш аккаунт не активирован</p>) :
            (<Fragment><p>Ваш аккаунт активирован</p><button onClick={this.logout}>Выход</button></Fragment>)

        const username = user ? user.username : null
        const email = user ? user.email : null
        return (
            <div className="user-info">
                <p>Логин:</p>
                <p>{username}</p>
                <p>Почта:</p>
                <p>{email}</p>
                <p>Статус:</p>
                {active}

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

export default connect(mapStateToProps, mapDispatchToProps)(Account);

