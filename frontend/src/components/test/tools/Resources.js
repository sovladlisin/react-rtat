import React, { Component, Fragment } from 'react'
import { getResources, getResource, getResourceTypes } from '../../../actions/resources';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Pin from '../../pins/Pin'

export class Resources extends Component {

    constructor(props) {
        super(props)
        this.choiceHandler = this.choiceHandler.bind(this)
    }

    state = {
        selected_data: [],
    }

    static propTypes = {
        resources: PropTypes.array.isRequired,
        resource_types: PropTypes.array.isRequired,
        getResourceTypes: PropTypes.func.isRequired,
        getResources: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getResources();
        this.props.getResourceTypes();
    }

    choiceHandler(value) {
        this.setState({
            selected_data: this.props.resources.filter(item => item.resource_type == value)
        })
    }


    render() {
        return (
            <Fragment>
                <div className="column">
                    {this.props.resource_types.map(item => (
                        <div className="item" key={item.id}><button onClick={() => this.choiceHandler(item.id)}><p>{item.name}</p></button></div>
                    ))}
                </div>
                <div className="column">
                    {this.state.selected_data.map(item => (
                        <Pin key={item.id} model_name='resource' pk={item.id} createWindow={this.props.createWindow} name={item.name} />
                    ))}
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getResources,
    getResourceTypes,
};

const mapStateToProps = state => ({
    resources: state.resources.all,
    resource_types: state.resources.types
})

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
