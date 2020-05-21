import React, { Component, Fragment } from 'react'
import ModelPanel from './ModelPanel';

import { getCorpuses, getCorpus, updateCorpus } from '../../../actions/corpuses';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


export class Corpus extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        name: 'Не указано',
        language: 'Не указано',
        dialect: 'Не указано',
        extras: 'Не указано',
        parent: null
    }

    static propTypes = {
        selected: PropTypes.object.isRequired,
        corpuses: PropTypes.array.isRequired,
        getCorpus: PropTypes.func.isRequired,
        getCorpuses: PropTypes.func.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selected.id === this.props.pk) { return true }
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected.id === this.props.pk) { this.setState(nextProps.selected) }
    }

    componentDidMount() {
        this.props.getCorpus(this.props.pk)
        this.props.getCorpuses()
    }

    save = () => {
        console.log(this.state)
        const { name, language, dialect, extras, parent } = this.state
        const corpus = { name, language, dialect, extras, parent }
        this.props.updateCorpus(this.props.pk, corpus)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderForm = () => {
        const parent_select = this.props.corpuses.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })


        if (Object.keys(this.props.selected).length != 0) {
            return (
                <Fragment>
                    <label>Название</label><input onChange={this.onChange} type="text" name="name" value={this.state.name} />
                    <label>Язык</label><input onChange={this.onChange} type="text" name="language" value={this.state.language} />
                    <label>Диатект</label><input onChange={this.onChange} type="text" name="dialect" value={this.state.dialect} />
                    <label>Доп. инф.</label><input onChange={this.onChange} type="text" name="extras" value={this.state.extras} />
                    <label>Родитель</label><select onChange={this.onChange} name="parent" id="parent" value={this.state.parent}>
                        <option value="">Корень</option>
                        {parent_select}
                    </select>
                </Fragment>
            )
        }
        return null;
    }

    render() {
        return (
            <Fragment>
                <ModelPanel save={this.save} model_name='corpus' pk={this.props.pk} />
                <form action="">
                    {this.renderForm()}
                </form>
            </Fragment>

        )
    }
}

const mapDispatchToProps = {
    getCorpus,
    getCorpuses,
    updateCorpus
};

const mapStateToProps = state => ({
    selected: state.corpuses.selected,
    corpuses: state.corpuses.all,
})

export default connect(mapStateToProps, mapDispatchToProps)(Corpus);
