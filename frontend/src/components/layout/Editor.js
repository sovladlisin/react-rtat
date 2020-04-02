import React, { Component, Fragment } from 'react'

import Pin from '../pins/Pin'

import { getResourceWorkspace } from '../../actions/resources';
import { getCorpusClasses, getCorpusObjects } from '../../actions/corpuses';
import { getEntitiesFromText } from '../../actions/objects';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export class Editor extends Component {

    constructor(props) {
        super(props)
    }
    state = {
        translated_text: [],
        original_text: [],
        page_number: 1,
        page_size: 10,
        created_entities: {},
        sidebar_visibility: false
    }
    static propTypes = {
        texts: PropTypes.object.isRequired,
        entities: PropTypes.array.isRequired,
        classes: PropTypes.array.isRequired,
        objects: PropTypes.array.isRequired,
        getResourceWorkspace: PropTypes.func.isRequired,
        getCorpusClasses: PropTypes.func.isRequired,
        getCorpusObjects: PropTypes.func.isRequired,
    };

    range = (start, end) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, i) => start + i);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.texts.original == undefined & nextProps.texts.original != undefined) {
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
            this.props.getCorpusObjects(original.corpus)
            this.props.getEntitiesFromText(original.corpus)

        }
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

        const selected_style = {
            background: "black"
        }

        const unselected_style = {
            background: "grey"
        }

        const closed_style = {
            background: "#82aa82",
            fontSize: "0pt"
        }


        const content = original_text.map((item) => {
            const position = self.state.original_text.indexOf(item)
            const style = this.props.entities.filter(item => item.position_start == position).length ? closed_style : undefined
            return (
                <div className="line" data-line-position={position}>
                    <button
                        onClick={this.openObjectFromLine}
                        style={style}
                        title='Перетащите строку в окно объекта'
                        data-position={position}
                        onDragStart={(e) => this.transferLine(e, position)}
                        draggable>
                        <i data-position={position} class="fas fa-plus"></i>
                    </button>
                    <p data-position={position}>{item}</p>
                    <p data-position={position}>{translated_text[original_text.indexOf(item)]}</p>
                </div>
            )
        });
        return content;
    }

    openObjectFromLine = (e) => {
        const mark = this.props.entities.filter(item => item.position_start == e.target.dataset.position)
        const object_id = mark[0].obj
        const object = this.props.objects.filter(item => item.id == object_id)
        const name = object[0].name
        this.props.createWindow('object' + object_id, //window-id
            name, //window-header
            'object',
            object_id)
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

    toggleSidebar = e => {
        this.props.getCorpusClasses(this.props.texts.original.corpus)
        this.props.getCorpusObjects(this.props.texts.original.corpus)

        this.setState({
            sidebar_visibility: !this.state.sidebar_visibility
        })
    }

    highlightOn = e => {
        const object_id = e.target.dataset.object
        const ids = this.props.entities.filter(
            item => item.obj == object_id).map(
                item => this.range(item.position_start, item.position_end)).flat().sort((a, b) => a - b)

        e.target.setAttribute('title', 'Строки: ' + ids.join());

        ids.map(item => {
            const elem = document.querySelector("[data-line-position='" + item + "']")
            elem.style.transition = "background 0.3s linear 0s";
            elem.style.background = "#b8d1b8";
        })

    }

    highlightOff = (e) => {
        const elems = document.querySelectorAll("[data-line-position]")
        var index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.transition = "background 0.3s linear 0s";
            elems[index].style.background = "none";
        }

    }

    renderObjects = () => {
        const ids = this.props.entities.map(item => item.obj)
        return this.props.objects.filter(item => ids.includes(item.id)).map(item => {
            return (
                <Fragment>
                    <div className="object-block">
                        <div
                            onMouseEnter={this.highlightOn}
                            onMouseLeave={this.highlightOff}
                            data-object={item.id}
                            className="object-highlight"
                        >
                            <i class="fas fa-eye" data-object={item.id}></i>
                        </div>
                        <Pin
                            key={item.id}
                            model_name='object'
                            createWindow={this.props.createWindow}
                            pk={item.id}
                            name={item.name} />
                    </div>
                </Fragment>
            )
        })
    }

    renderAllObjects = () => {
        var result = this.props.objects.map(item => {
            return (
                <Fragment>
                    <div className="object-block">
                        <Pin
                            key={item.id}
                            model_name='object'
                            createWindow={this.props.createWindow}
                            pk={item.id}
                            name={item.name} />
                    </div>
                </Fragment>
            )
        })
        return result
    }

    transferLine = (e, position) => {
        e.dataTransfer.setData('position', position)
        e.dataTransfer.setData('text', this.props.texts.original.id)
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
                            <div className="head">
                                <p>Объекты в корпусе</p>
                            </div>
                            <div className="object-list">
                                {this.renderAllObjects()}
                            </div>
                        </div>) : null}
                </div>

                <button className="open-sidebar" title="Открыть окно объектов текста" onClick={this.toggleSidebar}><i class="fab fa-elementor"></i></button>

            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getResourceWorkspace,
    getCorpusClasses,
    getCorpusObjects,
    getEntitiesFromText
};

const mapStateToProps = state => ({
    texts: state.resources.workspace_texts,
    entities: state.objects.entities_text,
    objects: state.corpuses.objects,
    classes: state.corpuses.classes
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);


