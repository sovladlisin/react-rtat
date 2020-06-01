import React, { Component, Fragment } from 'react'
import ModelPanel from './ModelPanel';

import { getClasses } from '../../../actions/classes';
import { getObject, getObjects, addEntity, getEntitiesFromObject, deleteEntity, updateObject, deleteObject, getObjectRelations, createRelation, deleteRelation } from '../../../actions/objects';
import PropTypes from 'prop-types';
import { connect, connectAdvanced } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'
import Pin from '../../pins/Pin';

export class ClassObject extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        new_lines: [],
        deleted_lines: [],
        name: '',
        parent_class: null,
        new_relations: [],
        new_relation_types: [],
        children: {},
        parents: {},
        relation_type_input: false,
        selected_relation_role: null,
        selected_relation_name: null
    }

    static propTypes = {
        selected: PropTypes.object.isRequired,
        classes: PropTypes.array.isRequired,
        entities: PropTypes.array.isRequired,
        getClasses: PropTypes.func.isRequired,
        getObject: PropTypes.func.isRequired,
        deleteObject: PropTypes.func.isRequired,
        relations: PropTypes.array.isRequired,
        getObjectRelations: PropTypes.func.isRequired,
        getObjects: PropTypes.func.isRequired,
        deleteRelation: PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState != this.state) return true
        if (nextProps.selected.id == this.props.pk) { return true }
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected.id === this.props.pk) {
            if (nextProps.relations.length != 0) {
                var children = {}
                var parents = {}
                var relations = nextProps.relations
                relations.map(item => {
                    var name = "Ошибка"
                    const parent_id = item.parent
                    const child_id = item.child
                    if (item.parent == this.props.pk) {
                        var obj = this.props.objects.filter(elem => elem.id == child_id)[0]
                        name = obj == undefined ? name : obj.name
                        children[item.name] = children.hasOwnProperty(item.name) ? children[item.name] : []
                        children[item.name] = [...children[item.name], { new: false, id: item.child, object_name: name, delete: false }]
                    }
                    if (item.child == this.props.pk) {
                        var obj = this.props.objects.filter(elem => elem.id == parent_id)[0]
                        name = obj == undefined ? name : obj.name

                        parents[item.name] = parents.hasOwnProperty(item.name) ? parents[item.name] : []
                        parents[item.name] = [...parents[item.name], { new: false, id: item.parent, object_name: name, delete: false }]
                    }
                    this.setState({
                        children: children,
                        parents: parents
                    })
                })
            }
            this.setState({
                name: nextProps.selected.name,
                parent_class: nextProps.selected.parent_class
            })
        }
    }

    componentDidMount() {
        this.props.getObject(this.props.pk)
        this.props.getClasses()
        this.props.getEntitiesFromObject(this.props.pk)
        this.props.getObjectRelations(this.props.pk)
        this.props.getObjects()
    }

    save = () => {
        const self = this
        const parents = this.state.parents
        const children = this.state.children

        this.state.new_lines.map(item => {
            const new_entitiy = {
                position_start: parseInt(item.position),
                position_end: parseInt(item.position),
                obj: parseInt(this.props.pk),
                markup: parseInt(item.markup)
            }
            this.props.addEntity(new_entitiy)
        })
        this.state.deleted_lines.map(id => {
            this.props.deleteEntity(id)
        })

        const { name, parent_class } = this.state
        const obj = { name, parent_class }
        this.props.updateObject(this.props.pk, obj)


        Object.keys(parents).map(function (key, index) {
            const child = self.props.pk
            parents[key].filter(item => item.delete == false && item.new == true).map(item => {
                self.props.createRelation({ parent: item.id, child: child, name: key })
            })
            parents[key].filter(item => item.delete == true).map(item => {
                self.props.deleteRelation({ parent: item.id, child: child, name: key })
            })
        })
        Object.keys(children).map(function (key, index) {
            const parent = self.props.pk
            children[key].filter(item => item.delete == false && item.new == true).map(item => {
                self.props.createRelation({ parent: parent, child: item.id, name: key })
            })
            children[key].filter(item => item.delete == true).map(item => {
                self.props.deleteRelation({ parent: parent, child: item.id, name: key })
            })
        })


        this.setState({
            new_lines: [],
            deleted_lines: [],
            parents: {},
            children: {}
        })

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    deleteEntity = (id) => {
        this.setState({
            deleted_lines: [...this.state.deleted_lines, id],
        })
    }

    renderForm = () => {
        const class_select = this.props.classes.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })

        if (Object.keys(this.props.selected).length != 0) {
            return (
                <Fragment>
                    <label>Название</label><input onChange={this.onChange} type="text" name="name" value={this.state.name} />
                    <label>Класс</label><select onChange={this.onChange} name="parent_class" id="parent_class" value={this.state.parent_class}>
                        <option value="">Не указано</option>
                        {class_select}
                    </select>
                </Fragment>
            )
        }
        return null;
    }

    addingDrag = (e) => {
        e.preventDefault()
    }

    addLine = (e, cat) => {
        e.preventDefault()
        const position = e.dataTransfer.getData("position")
        const markup_id = e.dataTransfer.getData("markup")
        var new_lines = this.state.new_lines

        const duplicates = new_lines.filter(item => item.position == position & item.markup == markup_id)
        const duplicates_props = this.props.entities.filter(item => item.position_start == position)

        if (duplicates.length == 0 & duplicates_props == 0) {
            new_lines.push({ position: position, markup: markup_id })
            this.setState({
                new_lines: new_lines
            })
        }
    }

    delete = () => {
        this.props.deleteObject(this.props.pk)
    }

    //need to change this function - its too funny
    addRelation = (e, role, name) => {
        if (e.dataTransfer.getData("model_name") == "object") {
            if (parseInt(e.dataTransfer.getData("pk")) != this.props.pk) {
                var children = this.state.children
                var parents = this.state.parents
                var object_name = e.dataTransfer.getData("name")


                const object_id = parseInt(e.dataTransfer.getData("pk"))

                if (role == "parent") {
                    if (children[name].filter(item => item.id == object_id).length == 0)
                        children[name] = [...children[name], { new: true, id: object_id, object_name: object_name, delete: false }]
                }

                if (role == "child") {
                    if (parents[name].filter(item => item.id == object_id).length == 0)
                        parents[name] = [...parents[name], { new: true, id: object_id, object_name: object_name, delete: false }]
                }
                this.setState({
                    parents: parents,
                    children: children,
                })
            }
        }
    }

    renderRelations = () => {
        const parents = this.state.parents
        const children = this.state.children
        const self = this


        const parents_dom = Object.keys(parents).length === 0 ? null : Object.keys(parents).map(function (key, index) {
            const pins = parents[key].map(item => {
                if (item.delete != true)
                    return (
                        <Fragment>
                            <Pin
                                key={item.id}
                                model_name={'object'}
                                pk={item.id}
                                createWindow={self.props.createWindow}
                                name={item.object_name} />
                            <button
                                className="delete-relation"
                                onClick={() => { self.deleteRelation("child", key, item.id) }}
                            >
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </Fragment>
                    )
            })
            return (
                <div className="relation">
                    <p>Связь: {key}</p>
                    <div
                        class="add-relation"
                        onDragOver={(e) => self.addingDrag(e)}
                        onDrop={(e) => self.addRelation(e, "child", key)}>
                        {pins}
                    </div>
                </div>
            )
        });
        const children_dom = Object.keys(children).length === 0 ? null : Object.keys(children).map(function (key, index) {
            const pins = children[key].map(item => {
                if (item.delete != true)
                    return (
                        <Fragment>
                            <Pin
                                key={item.id}
                                model_name={'object'}
                                pk={item.id}
                                createWindow={self.props.createWindow}
                                name={item.object_name} />
                            <button
                                className="delete-relation"
                                onClick={() => { self.deleteRelation("parent", key, item.id) }}
                            >
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </Fragment>
                    )
            })
            return (
                <div className="relation">
                    <p>Связь: {key}</p>
                    <div
                        class="add-relation"
                        onDragOver={(e) => self.addingDrag(e)}
                        onDrop={(e) => self.addRelation(e, "parent", key)}>
                        {pins}
                    </div>
                </div>
            )
        });
        return (
            <Fragment>
                <p>Родители: <button onClick={() => { this.toggleRelationTypeInput('parent') }} className="add-relation-type"> <i class="fas fa-plus"></i> </button></p>
                {parents_dom}
                <p>Потомки: <button onClick={() => { this.toggleRelationTypeInput('child') }} className="add-relation-type"> <i class="fas fa-plus"></i> </button></p>
                {children_dom}
            </Fragment>)
    }

    toggleRelationTypeInput = (role) => {
        this.setState({ relation_type_input: !this.state.relation_type_input, selected_relation_role: role })
    }

    renderRelationTypeInput = () => {
        if (this.state.relation_type_input) {
            const role = this.state.selected_relation_role == 'parent' ? "родителями" : "потомками"
            return (
                <div className="create-relation-type">
                    <p>Создать новый тип связи с {role}</p>
                    <p>Название связи:</p>
                    <input
                        name="selected_relation_name"
                        onChange={this.onChange}
                        type="text"
                        placeholder="Введите название связи"
                        value={this.state.selected_relation_name}></input>
                    <button onClick={this.createRelationType}>Создать</button>
                    <button onClick={() => { this.toggleRelationTypeInput(null) }}>Свернуть</button>
                </div>
            )
        }
    }

    createRelationType = () => {
        const name = this.state.selected_relation_name
        const role = this.state.selected_relation_role
        var parents = this.state.parents
        var children = this.state.children

        if (role == 'parent') {
            parents[name] = parents.hasOwnProperty(name) ? parents[name] : []
        }
        else {
            children[name] = children.hasOwnProperty(name) ? children[name] : []
        }
        this.setState({
            children: children,
            parents: parents,
            selected_relation_role: null,
            selected_relation_name: null
        })
    }

    deleteRelation = (role, name, object_id) => {
        var parents = this.state.parents
        var children = this.state.children
        var element = {}


        if (role == "parent") {
            element = children[name].filter(item => item.id == object_id)[0]
            element.delete = true
            children[name] = [...children[name].filter(item => item.id != object_id), element]
        }

        if (role == "child") {
            element = parents[name].filter(item => item.id == object_id)[0]
            element.delete = true
            parents[name] = [...parents[name].filter(item => item.id != object_id), element]
        }

        this.setState({
            parents: parents,
            children: children,
        })
    }






    render() {
        const delete_style = {
            background: "grey"
        }
        return (
            <Fragment>
                <ModelPanel save={this.save} delete={this.delete} model_name='object' pk={this.props.pk} window_id={this.props.window_id} closeWindow={this.props.closeWindow} />
                {this.renderRelationTypeInput()}
                <form action="">
                    {this.renderForm()}
                </form>
                <p>Привязанные строки:</p>
                {this.state.new_lines.map(item => {
                    return (
                        <div className="object-line">
                            <p>Строка №{item.position} из текста № {item.text_id}</p>
                            <Link
                                to={`/editor/text/${this.props.pk}`}
                                target="_blank">
                                <i className="far fa-folder-open"></i>
                            </Link>
                        </div>
                    )
                })}
                {this.props.entities.map(item => {
                    const style = this.state.deleted_lines.includes(item.id) ? delete_style : undefined
                    return (
                        <Fragment>
                            <div className="object-line">
                                <p>Строка №{item.position_start} из текста № {item.origin_text}</p>
                                <Link
                                    to={`/editor/text/${this.props.pk}`}
                                    target="_blank">
                                    <i className="far fa-folder-open"></i>
                                </Link>
                            </div>
                            <button style={style} className="delete" onClick={(e) => this.deleteEntity(item.id)}>Отвязать</button>
                        </Fragment>
                    )
                })}
                <p>Добавить строку:
                    <div
                        class="lines"
                        onDragOver={(e) => this.addingDrag(e)}
                        onDrop={(e) => this.addLine(e, "complete")}>
                        Перетащите строку в данное поле
                    </div>
                </p>
                <p>Связи:</p>
                <div className="relations">
                    {this.renderRelations()}
                </div>
            </Fragment >

        )
    }
}

const mapDispatchToProps = {
    getClasses,
    getObject,
    addEntity,
    getEntitiesFromObject,
    deleteEntity,
    updateObject,
    deleteObject,
    getObjectRelations,
    createRelation,
    deleteRelation,
    getObjects
};

const mapStateToProps = state => ({
    selected: state.objects.selected,
    classes: state.classes.all,
    entities: state.objects.entities_object,
    relations: state.objects.object_relations,
    objects: state.objects.all
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassObject);
