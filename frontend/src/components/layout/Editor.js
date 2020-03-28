import React, { Component, Fragment } from 'react'

import Pin from '../pins/Pin'

import { getResourceWorkspace } from '../../actions/resources';
import { getCorpusClasses, getCorpusObjects } from '../../actions/corpuses';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateEntity from '../workspace/CreateEntity';


export class Editor extends Component {

    state = {
        translated_text: [],
        original_text: [],
        page_number: 1,
        page_size: 10,
        create_entity_selection: {},
        create_entity_window: false,
        created_entities: {},
        sidebar_visibility: false
    }
    static propTypes = {
        texts: PropTypes.object.isRequired,
        classes: PropTypes.array.isRequired,
        objects: PropTypes.array.isRequired,
        getResourceWorkspace: PropTypes.func.isRequired,
        getCorpusClasses: PropTypes.func.isRequired,
        getCorpusObjects: PropTypes.func.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        const original = nextProps.texts.original
        const translated = nextProps.texts.translated


        fetch(original.link)
            .then((r) => r.text())
            .then(text => {
                const original_text = text.split('\n')
                fetch(translated.link)
                    .then((r) => r.text())
                    .then(text => {
                        const translated_text = text.split('\n')
                        this.setState({
                            translated_text: translated_text,
                            original_text: original_text,
                        })
                    })
            })
    }

    componentDidMount() {
        const pk = this.props.match.params.pk
        this.props.getResourceWorkspace(pk)
    }

    renderTexts = () => {
        if (this.state.original_text.length === 0) return 'Загрузка';

        const start = (this.state.page_number - 1) * this.state.page_size
        const end = start + this.state.page_size

        const original_text = this.state.original_text.slice(start, end);
        const translated_text = this.state.translated_text.slice(start, end);

        const self = this

        const content = original_text.map((item) => {
            const position = self.state.original_text.indexOf(item)

            return (
                <Fragment>
                    <button id={position} data-position={position} onClick={self.onLineSelect}></button>
                    <p>{item}</p>
                    <p>{translated_text[original_text.indexOf(item)]}</p>
                </Fragment>
            )
        });

        return content;
    }

    renderInfo = () => {
        if (this.state.original_text.length === 0) return;
        return (
            <Fragment>
                <p>Оригинал:</p>
                <Pin
                    key={this.props.texts.original.id}
                    model_name='resource'
                    createWindow={this.props.createWindow}
                    pk={this.props.texts.original.id}
                    name={this.props.texts.original.name} />
                <p>Перевод:</p>
                <Pin
                    key={this.props.texts.translated.id}
                    model_name='resource'
                    createWindow={this.props.createWindow}
                    pk={this.props.texts.translated.id}
                    name={this.props.texts.translated.name} />
            </Fragment>)

    }

    onNavChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onLineSelect = e => {
        const position = parseInt(e.target.dataset.position)
        var selection = this.state.create_entity_selection

        if (selection.hasOwnProperty(position)) {
            if ((!selection.hasOwnProperty(position + 1)) || (!selection.hasOwnProperty(position - 1))) {
                delete selection[position]
                e.target.style.background = 'grey'
            }
        }
        else {
            if (Object.keys(selection).length == 0) {
                selection[position] = this.state.original_text[position]
                e.target.style.background = 'black'
            }
            if ((selection.hasOwnProperty(position + 1)) || (selection.hasOwnProperty(position - 1))) {
                selection[position] = this.state.original_text[position]
                e.target.style.background = 'black'
            }
        }

        this.setState({
            create_entity_selection: selection
        })
    }

    toggleEntityEditor = e => {
        this.props.getCorpusClasses(this.props.texts.original.corpus)
        this.props.getCorpusObjects(this.props.texts.original.corpus)

        this.setState({
            create_entity_window: !this.state.create_entity_window
        })
    }

    toggleSidebar = e => {
        this.setState({
            sidebar_visibility: !this.state.sidebar_visibility
        })
    }

    createEntity = (object) => {
        var created_entities = this.state.created_entities
        var selected_lines = Object.keys(this.state.create_entity_selection).map((key, index) => {
            return (key)
        })

        if (created_entities.hasOwnProperty(object)) {
            created_entities[object].push({ start: Math.min(...selected_lines), end: Math.max(...selected_lines) })
        }
        else {
            created_entities[object] = []
            created_entities[object].push({ start: Math.min(...selected_lines), end: Math.max(...selected_lines) })
        }
        this.setState({
            created_entities: created_entities
        })
    }


    highlightOn = e => {
        console.log(e.target.dataset.object)
    }

    highlightOff = (e) => {

    }


    renderObjects = () => {
        const { created_entities } = this.state

        var result = Object.keys(created_entities).map((key, index) => {
            var name = this.props.objects.filter(item => item.id == key)
            console.log(created_entities, name)
            return (
                <Fragment>
                    <div
                        onMouseEnter={this.highlightOn}
                        onMouseLeave={this.highlightOff}
                        data-object={key}
                        className="object-highlight"
                    >
                    </div>
                    <Pin
                        key={key}
                        model_name='object'
                        createWindow={this.props.createWindow}
                        pk={key}
                        name={name[0].name} />

                </Fragment>

            )
        })

        return result
    }


    render() {
        var style_count = {
            float: 'right'
        }

        return (
            <Fragment>
                <div className="text-info">
                    {this.renderInfo()}
                </div>
                <div className="editor-panel">
                    <div className="text-panel">
                        <div className="text-navbar">
                            <p>Страница:</p>
                            <input type="number" min="1" name="page_number" step="1" value={this.state.page_number} onChange={this.onNavChange}></input>
                            <p>Число строк на странице:</p>
                            <input type="number" min="1" name="page_size" step="1" value={this.state.page_size} onChange={this.onNavChange} ></input>
                            <p style={style_count}>Всего строк: {this.state.original_text.length}</p>
                        </div>
                        <div className="text-editor">
                            {this.renderTexts()}
                        </div>
                        <div className="text-navbar">
                            <p>Страница:</p>
                            <input type="number" min="1" name="page_number" step="1" value={this.state.page_number} onChange={this.onNavChange}></input>
                            <p>Число строк на странице:</p>
                            <input type="number" min="1" name="page_size" step="1" value={this.state.page_size} onChange={this.onNavChange} ></input>
                            <p style={style_count}>Всего строк: {this.state.original_text.length}</p>
                        </div>
                    </div>
                    {this.state.sidebar_visibility ? (
                        <div className="object-panel">
                            <div className="head">
                                <p>Объекты в тексте</p>
                                <button className="close" onClick={this.toggleSidebar}><i class="fas fa-times"></i></button>
                            </div>
                            <div className="object-list">
                                {this.renderObjects()}
                            </div>
                        </div>) : null}
                </div>

                <button className="open-sidebar" onClick={this.toggleSidebar}><i class="fab fa-elementor"></i></button>
                <button className="create-entity" onClick={this.toggleEntityEditor}>{Object.keys(this.state.create_entity_selection).length}</button>

                {this.state.create_entity_window ? (<CreateEntity
                    selection={this.state.create_entity_selection}
                    hide={this.toggleEntityEditor}
                    createEntity={this.createEntity}
                    objects={this.props.objects}
                    createWindow={this.props.createWindow} />)
                    : null}
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getResourceWorkspace,
    getCorpusClasses,
    getCorpusObjects
};

const mapStateToProps = state => ({
    texts: state.resources.workspace_texts,
    objects: state.corpuses.objects,
    classes: state.corpuses.classes
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);


