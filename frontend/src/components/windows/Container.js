import React, { Component, Fragment } from 'react'
import Window from './Window'


export class Container extends Component {

    constructor(props, className, id) {
        super(props)
        this.closeWindow = this.closeWindow.bind(this)
        this.renderWindows = this.renderWindows.bind(this)
        this.hideWindow = this.hideWindow.bind(this)
        this.showWindow = this.showWindow.bind(this)
    }


    state = {
        windows: {},
        n: 5,
        hidden_windows: []
    };

    createWindow(id, name, model_name = null, pk = null) {
        const { windows } = this.state

        if (windows.hasOwnProperty(id)) {
            if (windows[id] === undefined) {
                windows[id] = { id: id, name: name, model_name: model_name, pk: pk }
            }
        }
        else {
            windows[id] = { id: id, name: name, model_name: model_name, pk: pk }
        }

        this.setState({ windows });
    }

    closeWindow(id) {
        const { windows } = this.state;
        windows[id] = undefined;
        this.setState({ windows });
    }

    hideWindow(id) {
        document.getElementById(id).style.display = "none"

        this.setState({
            hidden_windows: [...this.state.hidden_windows, id]
        })
    }

    showWindow(id) {
        let hidden_windows = this.state.hidden_windows
        let index = hidden_windows.indexOf(id)

        hidden_windows.splice(index, 1)

        this.setState({ hidden_windows: hidden_windows })

        document.getElementById(id).style.display = "block"
    }

    renderWindows() {
        const { windows } = this.state;

        if (Object.keys(windows).length === 0) return;

        const content = Object.keys(windows).map((key, index) => {
            if (windows[key] != undefined) {
                return (
                    <Window
                        key={windows[key].id}
                        pk={windows[key].pk}
                        model_name={windows[key].model_name}
                        closeWindow={this.closeWindow}
                        hideWindow={this.hideWindow}
                        id={windows[key].id}
                        name={windows[key].name}
                    />

                )
            }
        });
        return content;
    }

    renderHiddenWindows() {
        const hidden_windows = this.state.hidden_windows;

        if (hidden_windows.length === 0) return;

        const content = hidden_windows.map((id) => {
            return (
                <div key={id}><button onClick={() => this.showWindow(id)}>{this.state.windows[id].name} </button></div>
            )
        });

        return content;
    }



    render() {
        return (
            <Fragment>
                <div id="window-container">
                    {this.renderWindows()}
                </div>
                <div className="hidden-window-container">
                    {this.renderHiddenWindows()}
                </div>
            </Fragment>

        )
    }
}

export default Container
