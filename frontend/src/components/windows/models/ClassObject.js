import React, { Component, Fragment } from 'react'
import ModelPanel from './ModelPanel';

import { getClasses } from '../../../actions/classes';
import { getObject, addEntity, getEntitiesFromObject, deleteEntity } from '../../../actions/objects';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom'

export class ClassObject extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        new_lines: [],
        deleted_lines: []
    }

    static propTypes = {
        selected: PropTypes.object.isRequired,
        classes: PropTypes.array.isRequired,
        entities: PropTypes.array.isRequired,
        getClasses: PropTypes.func.isRequired,
        getObject: PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState != this.state) return true
        if (nextProps.selected.id == this.props.pk) { return true }
        return false
    }

    componentDidMount() {
        this.props.getObject(this.props.pk)
        this.props.getClasses()
        this.props.getEntitiesFromObject(this.props.pk)
    }

    save = () => {
        this.state.new_lines.map(item => {
            const new_entitiy = {
                position_start: parseInt(item.position),
                position_end: parseInt(item.position),
                obj: parseInt(this.props.pk),
                origin_text: parseInt(item.text_id)
            }
            this.props.addEntity(new_entitiy)
        })
        this.state.deleted_lines.map(id => {
            this.props.deleteEntity(id)
        })
        this.setState({
            new_lines: [],
            deleted_lines: []
        })

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
                    <label>Название</label><input type="text" name="name" value={this.props.selected['name']} />
                    <label>Класс</label><select name="class" id="class" value={this.props.selected['class']}>
                        {class_select}
                    </select>
                </Fragment>
            )
        }
        return null;
    }

    addingLine = (e) => {
        e.preventDefault()
    }

    addLine = (e, cat) => {
        const position = e.dataTransfer.getData("position")
        const text_id = e.dataTransfer.getData("text")
        var new_lines = this.state.new_lines

        const duplicates = new_lines.filter(item => item.position == position & item.text_id == text_id)
        const duplicates_props = this.props.entities.filter(item => item.position_start == position)

        if (duplicates.length == 0 & duplicates_props == 0) {
            new_lines.push({ position: position, text_id: text_id })
            this.setState({
                new_lines: new_lines
            })
        }
    }


    render() {
        const delete_style = {
            background: "grey"
        }
        return (
            <Fragment>
                <ModelPanel save={this.save} model_name='object' pk={this.props.pk} />
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
                <p>Добавить строку: <div
                    class="lines"
                    onDragOver={(e) => this.addingLine(e)}
                    onDrop={(e) => this.addLine(e, "complete")}
                > Перетащите строку в данное поле
                </div></p>

            </Fragment>

        )
    }
}

const mapDispatchToProps = {
    getClasses,
    getObject,
    addEntity,
    getEntitiesFromObject,
    deleteEntity
};

const mapStateToProps = state => ({
    selected: state.objects.selected,
    classes: state.classes.all,
    entities: state.objects.entities_object
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassObject);
