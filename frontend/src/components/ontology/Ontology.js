import React, { Component, Fragment } from 'react'
import AuthorForm from './forms/AuthorForm'
import ClassForm from './forms/ClassForm'
import ObjectForm from './forms/ObjectForm'
import CorpusForm from './forms/CorpusForm'
import CorpusTree from '../test/tools/CorpusTree'
import PlaceForm from './forms/PlaceForm'
import ResourceTypeForm from './forms/ResourceTypeForm'

export class Ontology extends Component {

    state = {
        selected_model: '1'
    }

    selectModel = e => {
        this.setState({ selected_model: e.target.value })
    }


    renderForms = () => {
        const selected_model = this.state.selected_model
        switch (selected_model) {
            case '1':
                return (<AuthorForm createWindow={this.props.createWindow} />)

            case '2':
                return (<PlaceForm createWindow={this.props.createWindow} />)

            case '3':
                return (<ClassForm createWindow={this.props.createWindow} />)

            case '4':
                return (<ObjectForm createWindow={this.props.createWindow} />)

            case '5':
                return (<ResourceTypeForm createWindow={this.props.createWindow} />)

            case '6':
                return (<Fragment><CorpusTree createWindow={this.props.createWindow} /><CorpusForm /></Fragment>)

            default:
                break;
        }
    }


    render() {
        return (
            <Fragment>
                <div className="content">
                    <p>Выбрать действие:</p>
                    <select onChange={this.selectModel}>
                        <option key="1" value="1">Создать нового автора</option>
                        <option key="2" value="2">Создать новое место</option>
                        <option key="3" value="3">Создать новый класс</option>
                        <option key="4" value="4">Создать новый объект класса</option>
                        <option key="5" value="5">Создать новый тип ресурса</option>
                        <option key="6" value="6">Создать новый корпус</option>
                    </select>
                    <div className="info">
                        {this.renderForms()}
                    </div>
                </div>

            </Fragment>
        )
    }
}

export default Ontology
