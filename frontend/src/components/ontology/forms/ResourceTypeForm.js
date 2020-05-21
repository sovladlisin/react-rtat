import React, { Component, Fragment } from 'react'


import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createResourceType } from '../../../actions/resources';


export class ResourceTypeForm extends Component {

    static propTypes = {
        createResourceType: PropTypes.func.isRequired,
    };

    state = {
        name: 'Не указано',
    }


    save = () => {
        const obj = this.state
        this.props.createResourceType(obj)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderForm = () => {
        return (
            <Fragment>
                <label>Название</label><input onChange={this.onChange} type="text" name="name" value={this.state.name} />
            </Fragment>
        )
    }


    render() {
        return (
            <Fragment>
                <div className="content-form">
                    <form className="main-form" action="">
                        {this.renderForm()}
                    </form>
                    <button onClick={this.save}>Добавить новый тип ресурса</button>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    createResourceType
};

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourceTypeForm);

