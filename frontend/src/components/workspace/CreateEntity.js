import React, { Component, Fragment } from 'react'

export class CreateEntity extends Component {

    state = {
        selected_obj: null
    }

    createEntity = () => {
        this.props.hide()
        this.props.createEntity(this.state.selected_obj)

    }

    changeObject = (e) => {
        this.setState({
            selected_obj: e.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <div className="create-entity-panel">
                    <p>Выбранные элементы:</p>
                    <div className="elements">
                        <p>№</p>
                        <p>Текст</p>
                        {Object.keys(this.props.selection).map((key, index) => {
                            return (
                                <Fragment>
                                    <p>{key}</p>
                                    <p>{this.props.selection[key]}</p>
                                </Fragment>
                            )
                        })}
                    </div>
                    <p>Выбрать объект:</p>
                    <select onChange={this.changeObject} defaultValue='0'>
                        <option value='0'>Выберите объект</option>
                        {this.props.objects.map((item) => {
                            return (
                                <option value={item.id}>{item.name}</option>
                            )
                        })}
                    </select>
                    <button onClick={this.createEntity}>Привязать</button>
                </div>
            </Fragment>
        )
    }
}

export default CreateEntity
