import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCorpuses } from '../../../actions/corpuses';
import { createClass, getClasses } from '../../../actions/classes';

export class ClassForm extends Component {

    static propTypes = {
        corpuses: PropTypes.array.isRequired,
        getCorpuses: PropTypes.func.isRequired,
        getClasses: PropTypes.func.isRequired,
        createClass: PropTypes.func.isRequired
    };

    state = {
        name: 'Не указано',
        parent: undefined,
        corpus: undefined
    }

    componentDidMount() {
        this.props.getCorpuses()
        this.props.getClasses()
    }

    save = () => {
        const obj = this.state
        this.props.createClass(obj)
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


    render() {
        return (
            <Fragment>
                <div className="content-form">
                    <form className="main-form" action="">
                        {this.renderForm()}
                    </form>
                    <button onClick={this.save}>Добавить новый класс</button>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getClasses,
    getCorpuses,
    createClass
};

const mapStateToProps = state => ({
    classes: state.classes.all,
    corpuses: state.corpuses.all
})

export default connect(mapStateToProps, mapDispatchToProps)(ClassForm);

