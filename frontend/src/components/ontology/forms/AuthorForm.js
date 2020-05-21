import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createAuthor, getAuthors } from '../../../actions/authors';
import { getPlaces } from '../../../actions/place';
import Pin from '../../pins/Pin';

export class AuthorForm extends Component {


    static propTypes = {
        places: PropTypes.array.isRequired,
        createAuthor: PropTypes.func.isRequired,
        getPlaces: PropTypes.func.isRequired,
        getAuthors: PropTypes.func.isRequired,
    };

    state = {
        date_of_birth: "Не указано",
        date_of_death: "Не указано",
        initials: "Не указано",
        name: "Не указано",
        patronymic: "Не указано",
        picture: "Не указано",
        place_of_birth: null,
        surname: "Не указано"
    }

    save = () => {
        const author = this.state
        this.props.createAuthor(author)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    componentDidMount() {
        this.props.getPlaces()
        this.props.getAuthors()
    }

    renderForm = () => {
        const places_select = this.props.places.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })

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
                    <option value="">Не указано</option>
                    {places_select}
                </select>

            </Fragment>
        )

        return null;
    }

    render() {
        return (
            <Fragment>
                <div className="content-all">
                    <div className="content-search">
                        <input placeholder="Поиск: " name="searchbar" type="text" onChange={this.onChange}></input>
                        <button onClick={this.search}><i class="fas fa-search"></i></button>
                    </div>
                    {this.props.authors.map(item => {
                        return (
                            <Pin
                                model_name={'author'}
                                pk={item.id}
                                createWindow={this.props.createWindow}
                                name={item.name} />
                        )
                    })}
                </div>
                <div className="content-form">
                    <form className="main-form" action="">
                        {this.renderForm()}
                    </form>
                    <button onClick={this.save}>Добавить нового автора</button>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getPlaces,
    createAuthor,
    getAuthors
};

const mapStateToProps = state => ({
    places: state.places.all,
    authors: state.authors.all
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthorForm);

