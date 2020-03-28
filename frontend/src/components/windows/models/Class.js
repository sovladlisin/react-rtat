import React, { Component, Fragment } from 'react'
import ModelPanel from './ModelPanel';

import { getClass, getClasses } from '../../../actions/classes';
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
        getCorpuses: PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selected.id === this.props.pk) { return true }
        return false
    }

    componentDidMount() {
        this.props.getClass(this.props.pk)
        this.props.getClasses()
        this.props.getCorpuses()
    }

    save = () => {
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
                    <label>Название</label><input type="text" name="name" value={this.props.selected['name']} />
                    <label>Родитель</label><select name="parent" id="parent" value={this.props.selected['parent']}>
                        <option value="">Корень</option>
                        {parent_select}
                    </select>
                    <label>Корпус</label><select name="corpus" id="corpus" value={this.props.selected['corpus']}>
                        {corpus_select}
                    </select>
                </Fragment>
            )
        }
        return null;
    }

    render() {
        return (
            <Fragment>
                <ModelPanel save={this.save} model_name='class' pk={this.props.pk} />
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
    getCorpuses
};

const mapStateToProps = state => ({
    selected: state.classes.selected,
    classes: state.classes.all,
    corpuses: state.corpuses.all
})

export default connect(mapStateToProps, mapDispatchToProps)(Class);
