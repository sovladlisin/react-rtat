import React, { Component, Fragment } from 'react'
import AuthorForm from './forms/AuthorForm'
import ClassForm from './forms/ClassForm'
import ObjectForm from './forms/ObjectForm'
import CorpusForm from './forms/CorpusForm'
import CorpusTree from '../test/tools/CorpusTree'
import PlaceForm from './forms/PlaceForm'
import ResourceTypeForm from './forms/ResourceTypeForm'


import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCorpuses, getCorpusClasses } from '../../actions/corpuses';
import ClassesTree from './class_tree/ClassesTree'

export class Ontology extends Component {

    state = {
        selected_model: '1',
        selected_corpus: null
    }

    static PropTypes = {
        getCorpuses: PropTypes.func.isRequired,
        getCorpusClasses: PropTypes.func.isRequired,
        corpuses: PropTypes.array.isRequired,
        selected_classes: PropTypes.array.isRequired
    }

    selectModel = (model) => {
        this.setState({ selected_model: model })
        if (model == '3') this.props.getCorpuses()
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


    renderClassCorpuses = () => {
        const selected_style = {
            background: "black",
            color: "white"
        }
        const style = {
            background: "none",
            color: "black"
        }
        if (this.state.selected_model == "3") {
            if (this.props.corpuses.length != 0) {
                return this.props.corpuses.map(item => {
                    const current_style = this.state.selected_corpus == item.id ? selected_style : style
                    return (<button
                        style={current_style}
                        onClick={() => { this.selectCorpus(item.id) }}>
                        {item.name}</button>)
                })
            }
        }
    }

    selectCorpus = (id) => {
        this.props.getCorpusClasses(id);
        this.setState({ selected_corpus: id })
    }

    renderSelectedClasses = () => {
        if (this.state.selected_model == '3' & this.props.selected_classes.length != 0) {
            return <ClassesTree classes={this.props.selected_classes} createWindow={this.props.createWindow}></ClassesTree>
        }

    }

    render() {
        return (
            <Fragment>
                <div className="content">
                    <div className="content-head">
                        <div>
                            <button onClick={() => { this.selectModel('1') }}>Авторы</button>
                            <button onClick={() => { this.selectModel('2') }}>Места</button>
                            <button onClick={() => { this.selectModel('3') }}>Классы</button>
                            <button onClick={() => { this.selectModel('4') }}>Объекты</button>
                            <button onClick={() => { this.selectModel('6') }}>Корпусы</button>
                        </div>
                        <div>
                            {this.renderClassCorpuses()}
                        </div>
                    </div>
                    <div className="info">
                        {this.renderSelectedClasses()}
                        {this.renderForms()}
                    </div>
                </div>

            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getCorpuses,
    getCorpusClasses
};

const mapStateToProps = state => ({
    corpuses: state.corpuses.all,
    selected_classes: state.corpuses.classes,
})

export default connect(mapStateToProps, mapDispatchToProps)(Ontology);
