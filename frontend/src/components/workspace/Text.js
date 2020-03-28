import React, { Component } from 'react'

import { getResourceWorkspace } from '../../actions/resources';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Text extends Component {



    componentDidMount() {

        // this.props.getResourceWorkspace(this)
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

const mapDispatchToProps = {
    getResourceWorkspace,
};

const mapStateToProps = state => ({
    texts: state.resources.workspace_texts,
})

export default connect(mapStateToProps, mapDispatchToProps)(Text);
