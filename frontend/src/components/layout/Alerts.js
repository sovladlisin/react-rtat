import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired,
    };

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {

            if (error.status == "401" & error.custom_message != undefined) {
                alert.error(`У вас нет доступа к ресурсу  "${error.custom_message}"`);
            }
            if (error.status == "401" & error.custom_message == undefined) {
                alert.error(`Выполните вход с активированного аккаунта`);
            }

            if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
            if (error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join());
        }

        if (message !== prevProps.message) {
            if (message.deleteSuccess) alert.success(`${message.deleteSuccess} успешно удален`);
            if (message.loginNotActive) alert.success(message.loginNotActive);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));