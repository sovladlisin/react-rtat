import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'

export class ModelPanel extends Component {
    animate = () => {
        const $data = document.getElementById("notification-" + this.props.model_name + this.props.pk)
        console.log($data)
        $data.animate([
            // keyframes
            { opacity: '1' },
            { opacity: '0' }
        ], {
            // timing options
            duration: 1000,
        })

    }
    render() {
        return (
            <Fragment>
                <div className="model-panel">
                    <button onClick={() => { this.props.save(); this.animate() }}><i className="far fa-save"></i></button>
                    <button onClick={() => { this.props.delete(); this.props.closeWindow(this.props.window_id) }}><i className="far fa-trash-alt"></i></button>
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
