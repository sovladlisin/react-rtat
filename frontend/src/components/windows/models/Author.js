import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthor, updateAuthor, deleteAuthor } from '../../../actions/authors';
import { getPlaces } from '../../../actions/place';
import ModelPanel from './ModelPanel';

export class Author extends Component {


    static propTypes = {
        selected: PropTypes.object.isRequired,
        places: PropTypes.array.isRequired,
        getAuthor: PropTypes.func.isRequired,
        deleteAuthor: PropTypes.func.isRequired
    };

    state = {
        date_of_birth: "",
        date_of_death: "",
        initials: "",
        name: "",
        patronymic: "",
        picture: "",
        place_of_birth: null,
        surname: ""
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selected.id === this.props.pk) { return true }
        return false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected.id === this.props.pk) { this.setState(nextProps.selected) }
    }

    componentDidMount() {
        this.props.getAuthor(this.props.pk)
        this.props.getPlaces()
    }

    save = () => {
        const author = this.state
        this.props.updateAuthor(this.props.pk, author)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }


    renderForm = () => {
        const places_select = this.props.places.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })
        if (Object.keys(this.props.selected).length != 0) {
            return (
                <Fragment>
                    <label>Фамилия</label><input onChange={this.onChange} type="text" name="surname" value={this.state.surname} />
                    <label>Имя</label><input onChange={this.onChange} type="text" name="name" value={this.state.name} />
                    <label>Отчество</label><input onChange={this.onChange} type="text" name="patronymic" value={this.state.patronymic} />
                    <label>Инициалы</label><input onChange={this.onChange} type="text" name="initials" value={this.state.initials} />
                    <label>Дата рождения</label><input onChange={this.onChange} type="text" name="date_of_birth" value={this.state.date_of_birth} />
                    <label>Дата смерти</label><input onChange={this.onChange} type="text" name="date_of_death" value={this.state.date_of_death} />
                    <label>Изображение</label><input onChange={this.onChange} type="text" name="picture" value={this.state.picture} />
                    <label>Место рождения</label><select onChange={this.onChange} name="place_of_birth" id="place_of_birth" value={this.state.place_of_birth}>
                        <option value=""></option>
                        {places_select}
                    </select>
                </Fragment>
            )
        }
        return null;
    }

    delete = () => {
        this.props.deleteAuthor(this.props.pk)
    }
    render() {
        return (
            <Fragment>
                <ModelPanel
                    save={this.save}
                    delete={this.delete}
                    model_name='author'
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
    getAuthor,
    getPlaces,
    updateAuthor,
    deleteAuthor
};

const mapStateToProps = state => ({
    selected: state.authors.selected,
    places: state.places.all,
})

export default connect(mapStateToProps, mapDispatchToProps)(Author);
