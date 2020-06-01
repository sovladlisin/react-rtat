import React, { Component } from 'react'



export class Pin extends Component {

    state = {
        style: {

        }
    }

    transfer = (e) => {
        e.dataTransfer.setData('pk', this.props.pk)
        e.dataTransfer.setData('model_name', this.props.model_name)
        e.dataTransfer.setData('name', this.props.name)
    }

    render() {
        return (
            <div
                className="pin"
                onDragStart={(e) => this.transfer(e)}
                draggable
            >
                <p>{this.props.name} #{this.props.pk}</p>
                <button onClick={() => this.props.createWindow(
                    this.props.model_name + this.props.pk, //window-id
                    this.props.name, //window-header
                    this.props.model_name,
                    this.props.pk
                )}>
                    <i className="far fa-folder-open"></i>
                </button>
            </div>
        )
    }
}


export default Pin;
