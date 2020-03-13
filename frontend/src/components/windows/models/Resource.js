import React, { Component, Fragment } from 'react'
import axios from 'axios';
import ModelPanel from './ModelPanel';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getResource, getResourceTypes } from '../../../actions/resources';
import { getAuthors } from '../../../actions/authors';


export class Resource extends Component {

    constructor(props) {
        super(props)
        this.save = this.save.bind(this)
    }


    static propTypes = {
        selected: PropTypes.object.isRequired,
        types: PropTypes.array.isRequired,
        authors: PropTypes.array.isRequired,
        getResourceTypes: PropTypes.func.isRequired,
        getResource: PropTypes.func.isRequired
    };


    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selected.id === this.props.pk) { return true }
        return false
    }

    componentDidMount() {
        console.log(this.props)
        this.props.getResource(this.props.pk)
        this.props.getAuthors()
    }

    save() {
        console.log('TODO save')
    }

    renderForm = () => {
        const author_select = this.props.authors.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name} - {item.initials}</option>
            )
        })

        if (Object.keys(this.props.selected).length != 0) {
            return (
                <Fragment>

                    <label>Название</label> <input type="text" name="name" value={this.props.selected['name']} />
                    <label>Язык</label> <input type="text" name="language" value={this.props.selected['language']} />
                    <label>Диалект</label> <input type="text" name="dialect" value={this.props.selected['dialect']} />
                    <label>Говор</label> <input type="text" name="speech" value={this.props.selected['speech']} />
                    <label>Жанр </label> <input type="text" name="theme" value={this.props.selected['theme']} />
                    <label>Время записи </label> <input type="text" name="time_of_recording" value={this.props.selected['time_of_recording']} />
                    <label>Опубликовано</label> <input type="text" name="published" value={this.props.selected['published']} />
                    <label>Варианты </label> <input type="text" name="variants" value={this.props.selected['variants']} />
                    <label>Ареал распространения </label> <input type="text" name="areal" value={this.props.selected['areal']} />
                    <label>Дополнительно </label> <input type="text" name="extras" value={this.props.selected['extras']} />
                    <label>Ссылка на файл</label> <input type="text" name="link" value={this.props.selected['link']} />
                    <label>Тип</label> <input type="text" name="resource_type" value={this.props.selected['resource_type']} />
                    <label>Место записи </label> <input type="text" name="place_of_recording" value={this.props.selected['place_of_recording']} />
                    <label>Исполнитель</label> <select name="author" id="author" value={this.props.selected['author']}>
                        <option value="">Не указано</option>
                        {author_select}
                    </select>
                    <label>Собиратель</label> <select name="collector" id="collector" value={this.props.selected['collector']}>
                        <option value="">Не указано</option>
                        {author_select}
                    </select>
                    <label>Расшифровка аудиозаписи</label> <select name="decryptor" id="decryptor" value={this.props.selected['decryptor']}>
                        <option value="">Не указано</option>
                        {author_select}
                    </select>
                    <label>Перевод на русский язык</label> <select name="translator" id="translator" value={this.props.selected['translator']}>
                        <option value="">Не указано</option>
                        {author_select}
                    </select>
                    <label>Редактор перевода</label> <select name="translation_redactor" id="translation_redactor" value={this.props.selected['translation_redactor']}>
                        <option value="">Не указано</option>
                        {author_select}
                    </select>
                    <label>Редактор национального текста</label> <select name="origin_redactor" id="origin_redactor" value={this.props.selected['origin_redactor']}>
                        <option value="">Не указано</option>
                        {author_select}
                    </select>
                    <label>Подготовка комментариев</label> <select name="commentator" id="commentator" value={this.props.selected['commentator']}>
                        <option value="">Не указано</option>
                        {author_select}
                    </select>
                </Fragment>
            )
        }
        return null;
    }

    render() {
        return (
            <Fragment>
                <ModelPanel save={this.save} model_name='resource' pk={this.props.pk} />
                <div>
                    <form action="">
                        {this.renderForm()}
                    </form>
                </div>
            </Fragment>

        )
    }
}

// export default Resource

const mapDispatchToProps = {
    getResource,
    getResourceTypes,
    getAuthors
};

const mapStateToProps = state => ({
    selected: state.resources.selected,
    types: state.resources.types,
    authors: state.authors.all
})

export default connect(mapStateToProps, mapDispatchToProps)(Resource);
