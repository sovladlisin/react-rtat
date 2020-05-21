import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlace, updatePlace } from '../../../actions/place';
import ModelPanel from './ModelPanel';

export class Place extends Component {


    static propTypes = {
        selected: PropTypes.object.isRequired,
        getPlace: PropTypes.func.isRequired,
    };

    state = {
        name: 'Не указано',
        location: 'Не указано'
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selected.id === this.props.pk) { return true }
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected.id === this.props.pk) { this.setState(nextProps.selected) }
    }

    componentDidMount() {
        this.props.getPlace(this.props.pk)
    }

    save = () => {
        const obj = this.state
        this.props.updatePlace(this.props.pk, obj)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderForm = () => {
        if (Object.keys(this.props.selected).length != 0) {
            return (
                <Fragment>
                    <label>Название</label><input onChange={this.onChange} type="text" name="name" value={this.state.name} />
                    <label>Координаты</label><input onChange={this.onChange} type="text" name="location" value={this.state.location} />
                </Fragment>
            )
        }
        return null;
    }

    render() {
        return (
            <Fragment>
                <ModelPanel save={this.save} model_name='place' pk={this.props.pk} />
                <form action="">
                    {this.renderForm()}
                </form>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getPlace,
    updatePlace
};

const mapStateToProps = state => ({
    selected: state.places.selected
})

export default connect(mapStateToProps, mapDispatchToProps)(Place);
