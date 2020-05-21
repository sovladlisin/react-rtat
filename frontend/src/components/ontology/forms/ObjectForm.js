import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getClasses } from '../../../actions/classes';
import { createObject } from '../../../actions/objects';



export class ObjectForm extends Component {

    state = {
        name: 'Не указано',
        parent_class: null
    }

    static propTypes = {
        classes: PropTypes.array.isRequired,
        createObject: PropTypes.func.isRequired,
        getClasses: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getClasses()
    }

    save = () => {
        const obj = this.state
        this.props.createObject(obj)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderForm = () => {
        const class_select = this.props.classes.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })

        return (
            <Fragment>
                <label>Название</label><input onChange={this.onChange} type="text" name="name" value={this.state.name} />
                <label>Класс</label><select onChange={this.onChange} name="parent_class" id="parent_class" value={this.state.parent_class}>
                    {class_select}
                </select>
            </Fragment>
        )

    }

    render() {
        return (
            <Fragment>
                <div className="content-form">
                    <form className="main-form" action="">
                        {this.renderForm()}
                    </form>
                    <button onClick={this.save}>Добавить новый объект класса</button>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getClasses,
    createObject
};

const mapStateToProps = state => ({
    classes: state.classes.all,
})

export default connect(mapStateToProps, mapDispatchToProps)(ObjectForm);


