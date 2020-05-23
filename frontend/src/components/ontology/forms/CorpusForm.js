import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCorpuses, createCorpus } from '../../../actions/corpuses';


export class CorpusForm extends Component {

    state = {
        name: 'Не указано',
        language: 'Не указано',
        dialect: 'Не указано',
        extras: 'Не указано',
        parent: undefined
    }

    static propTypes = {
        corpuses: PropTypes.array.isRequired,
        createCorpus: PropTypes.func.isRequired
    };

    componentDidMount() {
        this.props.getCorpuses()
    }

    save = () => {
        const obj = this.state
        this.props.createCorpus(obj)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    renderForm = () => {
        const parent_select = this.props.corpuses.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })

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


    render() {
        return (
            <Fragment>
                <div className="content-form">
                    <form className="main-form" action="">
                        {this.renderForm()}
                    </form>
                    <button onClick={this.save}>Добавить новый корпус</button>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getCorpuses,
    createCorpus
};

const mapStateToProps = state => ({
    corpuses: state.corpuses.all,
})

export default connect(mapStateToProps, mapDispatchToProps)(CorpusForm);

