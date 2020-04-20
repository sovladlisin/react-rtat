import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import { login } from '../../actions/auth'

export class Login extends Component {

    state = {
        username: '',
        password: '',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }
    onSubmit = e => {
        e.preventDefault()
        console.log(this.state)
        this.props.login(this.state.username, this.state.password)
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <Fragment>
                <div className="auth-box">
                    <form onSubmit={this.onSubmit}>
                        <p>Логин:</p>
                        <input name="username" type="text" onChange={this.onChange} value={this.state.username} />
                        <p>Пароль:</p>
                        <input name="password" type="password" onChange={this.onChange} value={this.state.password} />
                        <button type="submit">Войти</button>
                        <div><Link to="/register">У меня нет аккаунта</Link></div>
                    </form>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    login,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
