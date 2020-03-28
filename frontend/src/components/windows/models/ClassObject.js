import React, { Component, Fragment } from 'react'
import ModelPanel from './ModelPanel';

import { getClasses } from '../../../actions/classes';
import { getObject } from '../../../actions/objects';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class ClassObject extends Component {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        selected: PropTypes.object.isRequired,
        classes: PropTypes.array.isRequired,
        getClasses: PropTypes.func.isRequired,
        getObject: PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selected.id == this.props.pk) { return true }
        return false
    }

    componentDidMount() {
        this.props.getObject(this.props.pk)
        this.props.getClasses()
    }

    save = () => {
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

    render() {
        return (
            <Fragment>
                <ModelPanel save={this.save} model_name='object' pk={this.props.pk} />
                <form action="">
                    {this.renderForm()}
                </form>
            </Fragment>

        )
    }
}

const mapDispatchToProps = {
    getClasses,
    getObject
};

const mapStateToProps = state => ({
    selected: state.objects.selected,
    classes: state.classes.all
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassObject);
