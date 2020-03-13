import React, { Component, Fragment } from 'react'
import axios from 'axios';
import ModelPanel from './ModelPanel';

import { getCorpuses, getCorpus } from '../../../actions/corpuses';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class Corpus extends Component {

    constructor(props) {
        super(props)
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

    componentDidMount() {
        this.props.getCorpus(this.props.pk)
        this.props.getCorpuses()
    }

    save = () => {
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
                    <label>Название</label><input type="text" name="name" value={this.props.selected['name']} />
                    <label>Язык</label><input type="text" name="language" value={this.props.selected['language']} />
                    <label>Диатект</label><input type="text" name="dialect" value={this.props.selected['dialect']} />
                    <label>Доп. инф.</label><input type="text" name="extras" value={this.props.selected['extras']} />
                    <label>Родитель</label><select name="parent" id="parent" value={this.props.selected['parent']}>
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
};

const mapStateToProps = state => ({
    selected: state.corpuses.selected,
    corpuses: state.corpuses.all,
})

export default connect(mapStateToProps, mapDispatchToProps)(Corpus);
