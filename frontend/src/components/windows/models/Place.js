import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlace } from '../../../actions/place';
import ModelPanel from './ModelPanel';

export class Place extends Component {


    static propTypes = {
        selected: PropTypes.object.isRequired,
        getPlace: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selected.id === this.props.pk) { return true }
        return false
    }

    componentDidMount() {
        this.props.getPlace(this.props.pk)
    }

    save = () => {
    }

    renderForm = () => {

        if (Object.keys(this.props.selected).length != 0) {
            return (
                <Fragment>
                    <label>Название</label><input type="text" name="name" value={this.props.selected['name']} />
                    <label>Координаты</label><input type="text" name="language" value={this.props.selected['location']} />
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
    getPlace
};

const mapStateToProps = state => ({
    selected: state.places.selected
})

export default connect(mapStateToProps, mapDispatchToProps)(Place);
