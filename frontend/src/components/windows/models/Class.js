import React, { Component, Fragment } from 'react'
import ModelPanel from './ModelPanel';

import { getClass, getClasses, updateClass, deleteClass } from '../../../actions/classes';
import { getCorpuses } from '../../../actions/corpuses';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Class extends Component {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        selected: PropTypes.object.isRequired,
        classes: PropTypes.array.isRequired,
        corpuses: PropTypes.array.isRequired,
        getClass: PropTypes.func.isRequired,
        getClasses: PropTypes.func.isRequired,
        getCorpuses: PropTypes.func.isRequired,
        deleteClass: PropTypes.func.isRequired
    };

    state = {
        name: '',
        parent: null,
        corpus: null
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selected.id === this.props.pk) { return true }
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected.id === this.props.pk) { this.setState(nextProps.selected) }
    }

    componentDidMount() {
        this.props.getClass(this.props.pk)
        this.props.getClasses()
        this.props.getCorpuses()
    }

    save = () => {
        const obj = this.state
        this.props.updateClass(this.props.pk, obj)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderForm = () => {
        const parent_select = this.props.classes.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })
        const corpus_select = this.props.corpuses.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })

        if (Object.keys(this.props.selected).length != 0) {
            return (
                <Fragment>
                    <label>Название</label><input onChange={this.onChange} type="text" name="name" value={this.state.name} />
                    <label>Родитель</label><select onChange={this.onChange} name="parent" id="parent" value={this.state.parent}>
                        <option value="">Корень</option>
                        {parent_select}
                    </select>
                    <label>Корпус</label><select onChange={this.onChange} name="corpus" id="corpus" value={this.state.corpus}>
                        <option value="">Не указано</option>
                        {corpus_select}
                    </select>
                </Fragment>
            )
        }
        return null;
    }

    delete = () => {
        this.props.deleteClass(this.props.pk)
    }

    render() {
        return (
            <Fragment>
                <ModelPanel
                    save={this.save}
                    delete={this.delete}
                    model_name='class'
                    pk={this.props.pk}
                    window_id={this.props.window_id}
                    closeWindow={this.props.closeWindow} />
                <form action="">
                    {this.renderForm()}
                </form>
            </Fragment>

        )
    }
}

const mapDispatchToProps = {
    getClass,
    getClasses,
    getCorpuses,
    updateClass,
    deleteClass
};

const mapStateToProps = state => ({
    selected: state.classes.selected,
    classes: state.classes.all,
    corpuses: state.corpuses.all
})

export default connect(mapStateToProps, mapDispatchToProps)(Class);
