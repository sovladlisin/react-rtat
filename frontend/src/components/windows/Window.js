import React, { Component, Fragment } from 'react'

import { getPinWindow } from '../../actions/pins';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import Resource from './models/Resource';
import Corpus from './models/Corpus';
import Place from './models/Place';
import Author from './models/Author';
import ClassObject from './models/ClassObject';
import Class from './models/Class';


export class Window extends Component {

    constructor(props) {
        super(props)
        this.handleStart = this.handleStart.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.fill = this.fill.bind(this)
    }

    state = {
        data: {},
    }

    componentDidMount() {
    }

    handleStart() {
        var windows = document.getElementsByClassName("window");
        for (var i = 0; i < windows.length; i++) {
            windows[i].style.zIndex = "99"
        }
        document.getElementById(this.props.id).style.zIndex = "100";

    }

    handleStop() {
    }

    fill() {
        switch (this.props.model_name) {
            case 'resource':
                return <Resource pk={this.props.pk} />

            case 'corpus':
                return <Corpus pk={this.props.pk} />

            case 'place':
                return <Place pk={this.props.pk} />

            case 'author':
                return <Author pk={this.props.pk} />

            case 'object':
                return <ClassObject pk={this.props.pk} />

            case 'class':
                return <Class pk={this.props.pk} />

            default:
                return "Empty window"
        }
    }


    render() {
        return (
            <Fragment>
                < Draggable
                    handle=".window-header"
                    onStart={this.handleStart}
                    onStop={this.handleStop}>
                    <div className="window" id={this.props.id} >
                        <div className="window-header">
                            <p>{this.props.name}</p>
                            <button onClick={() => this.props.closeWindow(this.props.id)}><i className="fas fa-times"></i></button>
                            <button onClick={() => this.props.hideWindow(this.props.id)}><i className="far fa-eye"></i></button>
                        </div>
                        <div className="window-content" id={this.props.pk + this.props.model_name}>
                            {this.fill()}
                        </div>
                    </div>
                </Draggable >
            </Fragment>
        )
    }
}


export default Window;