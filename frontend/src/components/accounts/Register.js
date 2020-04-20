import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { register } from '../../actions/auth'

export class Register extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    }
    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (password !== password2) {
            console.log('Пароли не совпадают')
        } else {
            const newUser = {
                username,
                password,
                email,
            };
            this.props.register(newUser);
        }
    };
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
                        <p>Почта:</p>
                        <input name="email" type="text" onChange={this.onChange} value={this.state.email} />
                        <p>Пароль:</p>
                        <input name="password" type="password" onChange={this.onChange} value={this.state.password} />
                        <p>Подтверждение пароля:</p>
                        <input name="password2" type="password" onChange={this.onChange} value={this.state.password2} />
                        <button type="submit">Создать аккаунт</button>
                        <div><Link to="/login">У меня уже есть аккаунт</Link></div>
                    </form>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    register,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);
