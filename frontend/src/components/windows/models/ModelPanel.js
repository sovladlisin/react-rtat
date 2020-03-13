import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'

export class ModelPanel extends Component {
    render() {
        return (
            <Fragment>
                <div className="model-panel">
                    <button onClick={this.props.save}><i className="far fa-save"></i></button>
                    {
                        this.props.model_name === 'resource' ? (
                            <Link
                                to={`/editor/text/${this.props.pk}`}
                                target="_blank">
                                <i className="far fa-folder-open"></i>
                            </Link>
                        ) : null
                    }
                </div>
            </Fragment >
        )
    }
}

export default ModelPanel
