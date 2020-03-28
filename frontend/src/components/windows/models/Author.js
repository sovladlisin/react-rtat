import React, { Component, Fragment } from 'react'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAuthor } from '../../../actions/authors';
import { getPlaces } from '../../../actions/place';
import ModelPanel from './ModelPanel';

export class Author extends Component {


    static propTypes = {
        selected: PropTypes.object.isRequired,
        places: PropTypes.array.isRequired,
        getAuthor: PropTypes.func.isRequired,
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selected.id === this.props.pk) { return true }
        return false
    }

    componentDidMount() {
        this.props.getAuthor(this.props.pk)
        this.props.getPlaces()
    }

    save = () => {
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
                    <label>Фамилия</label><input type="text" name="surname" value={this.props.selected['surname']} />
                    <label>Имя</label><input type="text" name="name" value={this.props.selected['name']} />
                    <label>Отчество</label><input type="text" name="patronymic" value={this.props.selected['patronymic']} />
                    <label>Инициалы</label><input type="text" name="initials" value={this.props.selected['initials']} />
                    <label>Дата рождения</label><input type="text" name="date_of_birth" value={this.props.selected['date_of_birth']} />
                    <label>Дата смерти</label><input type="text" name="date_of_death" value={this.props.selected['date_of_death']} />
                    <label>Изображение</label><input type="text" name="picture" value={this.props.selected['picture']} />
                    <label>Место рождения</label><select name="place_of_birth" id="place_of_birth" value={this.props.selected['place_of_birth']}>
                        <option value="">Не указано</option>
                        {places_select}
                    </select>
                </Fragment>
            )
        }
        return null;
    }

    render() {
        return (
            <Fragment>
                <ModelPanel save={this.save} model_name='author' pk={this.props.pk} />
                <form action="">
                    {this.renderForm()}
                </form>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getAuthor,
    getPlaces
};

const mapStateToProps = state => ({
    selected: state.authors.selected,
    places: state.places.all
})

export default connect(mapStateToProps, mapDispatchToProps)(Author);
