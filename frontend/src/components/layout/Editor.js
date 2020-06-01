import React, { Component, Fragment } from 'react'

import Pin from '../pins/Pin'

import { getResourceWorkspace } from '../../actions/resources';
import { getCorpusClasses, getCorpusObjects } from '../../actions/corpuses';
import { getMarkupsFromText, getMarkupEntites, createMarkup, getTextRelations } from '../../actions/objects';
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
        sidebar_visibility: false,
        selected_markup: null,
        create_markup_window: false,
        new_markup_name: "Не указано",
        highlight_relation: [],
        highlight_object: undefined,
        highlight_parents: [],
        highlight_children: []
    }
    static propTypes = {
        texts: PropTypes.object.isRequired,
        entities: PropTypes.array.isRequired,
        classes: PropTypes.array.isRequired,
        objects: PropTypes.array.isRequired,
        markups: PropTypes.array.isRequired,
        getResourceWorkspace: PropTypes.func.isRequired,
        getCorpusClasses: PropTypes.func.isRequired,
        getCorpusObjects: PropTypes.func.isRequired,
        getMarkupEntites: PropTypes.func.isRequired,
        createMarkup: PropTypes.func.isRequired,
        getTextRelations: PropTypes.func.isRequired,
        highlight_relation: PropTypes.array.isRequired
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
            this.props.getMarkupsFromText(original.id)
        }

        if (nextProps.entities != this.props.entities) {
            const ids = nextProps.entities.map(item => item.obj)
            this.props.getTextRelations(ids)
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

        const selected_line_style = {
            background: "#495874"
        }

        var object_style = {
            background: "#495874",
        }
        const child_style = {
            background: "#00bfa5"
        }
        const parent_style = {
            background: "#ff4641"
        }

        const content = original_text.map((item) => {
            var position = self.state.original_text.indexOf(item)
            const object_id = this.props.entities.filter(item => item.position_start == position).map(item => item.obj)[0]
            var style = object_id != undefined ? object_style : undefined

            var line_style = {}
            if (this.state.highlight_object != undefined) {
                line_style = this.state.highlight_object == object_id ? selected_line_style : {}
            }

            var relation_name = null
            if (object_id != undefined && object_id != this.state.highlight_object) {
                const child_check = this.state.highlight_children.filter(item => item.object == object_id)
                const parent_check = this.state.highlight_parents.filter(item => item.object == object_id)

                line_style = this.state.highlight_object == object_id ? selected_line_style : line_style
                if (child_check.length != 0) {
                    line_style = child_style
                    style = child_style
                    relation_name = child_check[0].name
                }
                if (parent_check.length != 0) {
                    line_style = parent_style
                    style = parent_style
                    relation_name = parent_check[0].name
                }
            }
            position = relation_name == null ? position : relation_name

            return (
                <div style={line_style} className="line" data-line-position={position} id={object_id}>
                    <button
                        onClick={this.openObjectFromLine}
                        style={style}
                        title='Перетащите строку в окно объекта'
                        data-position={position}
                        onDragStart={(e) => this.transferLine(e, position)}
                        draggable>
                        {position}
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
        const relations = this.props.text_relations.filter(item => item.child == object_id || item.parent == object_id)
        const ids = this.props.entities.filter(
            item => item.obj == object_id).map(
                item => this.range(item.position_start, item.position_end)).flat().sort((a, b) => a - b)

        e.target.setAttribute('title', 'Строки: ' + ids.join());


        if (relations.length != 0) {
            const current_object = document.getElementById(object_id)
            const children = relations.filter(item => item.parent == object_id).map(item => { return ({ name: item.name, object: item.child }) })
            const parents = relations.filter(item => item.child == object_id).map(item => { return ({ name: item.name, object: item.parent }) })

            this.setState({ highlight_parents: parents, highlight_children: children, highlight_object: object_id })
        }
        else {
            this.setState({ highlight_object: object_id })
        }
    }

    highlightOff = (e) => {
        const elems = document.querySelectorAll("[data-line-position]")
        var index = 0, length = elems.length;
        for (; index < length; index++) {
            elems[index].style.transition = "background 0.3s linear 0s";
            elems[index].style.background = "none";
        }
        this.setState({ highlight_object: undefined, highlight_children: [], highlight_parents: [] })
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
        e.dataTransfer.setData('markup', this.state.selected_markup)
    }

    changeMarkup = (id) => {
        this.props.getMarkupEntites(id)
        this.setState({ selected_markup: id })

    }

    renderMarkupList = () => {
        if (this.props.markups.length != 0) {
            const style_normal = {
                background: "white",
                color: "black"
            }

            const style_selected = {
                background: "#00bfa5",
                color: "white"
            }

            const markups = this.props.markups
            return markups.map(markup => {
                const current_style = this.state.selected_markup == markup.id ? style_selected : style_normal
                return (
                    <button style={current_style} onClick={() => { this.changeMarkup(markup.id) }}>Разметка {markup.name}</button>
                )
            })
        }
    }

    toogleNewMarkupWindow = () => {
        this.setState({ create_markup_window: !this.state.create_markup_window })
    }

    renderNewMarkupWindow = () => {
        if (this.state.create_markup_window) {
            return (
                <Fragment>
                    <div className="new-markup">
                        <p>Введите название новой разметки:</p>
                        <input name="new_markup_name" value={this.state.new_markup_name} onChange={this.onChange}></input>
                        <button onClick={this.createNewMarkup}>Создать</button>
                        <button onClick={this.toogleNewMarkupWindow}>Скрыть</button>
                    </div>
                </Fragment>
            )
        }
        return null
    }

    createNewMarkup = () => {
        const obj = { name: this.state.new_markup_name, text: this.props.texts.original.id }
        this.props.createMarkup(obj)
        this.setState({ new_markup_name: "Не указано", create_markup_window: !this.state.create_markup_window })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
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
                <div className="markup-list">
                    <p>Разметки в тексте:</p>
                    <div className="markups">
                        {this.renderMarkupList()}
                    </div>
                    <button onClick={this.toogleNewMarkupWindow}>Создать новую разметку</button>
                </div>
                {this.renderNewMarkupWindow()}
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
    getMarkupsFromText,
    getMarkupEntites,
    createMarkup,
    getTextRelations
};

const mapStateToProps = state => ({
    texts: state.resources.workspace_texts,
    entities: state.objects.entities_text,
    objects: state.corpuses.objects,
    classes: state.corpuses.classes,
    markups: state.objects.markups,
    text_relations: state.objects.text_relations
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);


