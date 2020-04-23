import React, { Component, Fragment } from 'react'
import axios from 'axios';
import ModelPanel from './ModelPanel';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getResource, getResourceTypes, updateResource } from '../../../actions/resources';
import { getAuthors } from '../../../actions/authors';
import { getCorpuses } from '../../../actions/corpuses';


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

    state = {
        areal: "",
        author: null,
        collector: null,
        commentator: null,
        corpus: null,
        decryptor: null,
        dialect: "",
        extras: "",
        language: "",
        // link: "",
        name: "",
        origin_redactor: null,
        place_of_recording: null,
        published: "",
        resource_type: null,
        speech: "",
        theme: "",
        time_of_recording: "",
        translation_redactor: null,
        translator: null,
        variants: ""
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selected.id === this.props.pk) { return true }
        return false
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.selected.id === this.props.pk) { this.setState(nextProps.selected) }
    }

    componentDidMount() {
        console.log(this.props)
        this.props.getResource(this.props.pk)
        this.props.getAuthors()
        this.props.getResourceTypes()
        this.props.getCorpuses()
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    //without file save - todo?
    save = () => {
        const {
            areal, author, collector, commentator,
            corpus, decryptor,
            dialect,
            extras,
            language,
            name,
            origin_redactor,
            place_of_recording,
            published,
            resource_type,
            speech,
            theme,
            time_of_recording,
            translation_redactor,
            translator,
            variants
        } = this.state
        const obj = {
            areal, author, collector, commentator,
            corpus, decryptor,
            dialect,
            extras,
            language,
            name,
            origin_redactor,
            place_of_recording,
            published,
            resource_type,
            speech,
            theme,
            time_of_recording,
            translation_redactor,
            translator,
            variants
        }
        this.props.updateResource(this.props.pk, obj)
    }

    renderForm = () => {
        const author_select = this.props.authors.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name} - {item.initials}</option>
            )
        })

        const type_select = this.props.types.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })

        const corpuse_select = this.props.corpuses.map((item) => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })

        if (Object.keys(this.props.selected).length != 0) {
            return (
                <Fragment>
                    <label>Корпус</label>  <select onChange={this.onChange} name="corpus" id="corpus" value={this.state.corpus}>
                        <option value=""></option>
                        {corpuse_select}
                    </select>
                    <label>Название</label> <input onChange={this.onChange} type="text" name="name" value={this.state.name} />
                    <label>Язык</label> <input onChange={this.onChange} type="text" name="language" value={this.state.language} />
                    <label>Диалект</label> <input onChange={this.onChange} type="text" name="dialect" value={this.state.dialect} />
                    <label>Говор</label> <input onChange={this.onChange} type="text" name="speech" value={this.state.speech} />
                    <label>Жанр </label> <input onChange={this.onChange} type="text" name="theme" value={this.state.theme} />
                    <label>Время записи </label> <input onChange={this.onChange} type="text" name="time_of_recording" value={this.state.time_of_recording} />
                    <label>Опубликовано</label> <input onChange={this.onChange} type="text" name="published" value={this.state.published} />
                    <label>Варианты </label> <input onChange={this.onChange} type="text" name="variants" value={this.state.variants} />
                    <label>Ареал распространения </label> <input onChange={this.onChange} type="text" name="areal" value={this.state.areal} />
                    <label>Дополнительно </label> <input onChange={this.onChange} type="text" name="extras" value={this.state.extras} />
                    <label>Ссылка на файл</label> <input onChange={this.onChange} type="text" name="link" value={this.state.link} />
                    <label>Тип</label> <select onChange={this.onChange} name="resource_type" id="resource_type" value={this.state.resource_type}>
                        <option value=""></option>
                        {type_select}
                    </select>
                    <label>Место записи </label> <input onChange={this.onChange} type="text" name="place_of_recording" value={this.state.place_of_recording} />
                    <label>Исполнитель</label>  <select onChange={this.onChange} name="author" id="author" value={this.state.author}>
                        <option value=""></option>
                        {author_select}
                    </select>
                    <label>Собиратель</label>  <select onChange={this.onChange} name="collector" id="collector" value={this.state.collector}>
                        <option value=""></option>
                        {author_select}
                    </select>
                    <label>Расшифровка аудиозаписи</label>  <select onChange={this.onChange} name="decryptor" id="decryptor" value={this.state.decryptor}>
                        <option value=""></option>
                        {author_select}
                    </select>
                    <label>Перевод на русский язык</label>  <select onChange={this.onChange} name="translator" id="translator" value={this.state.translator}>
                        <option value=""></option>
                        {author_select}
                    </select>
                    <label>Редактор перевода</label>  <select onChange={this.onChange} name="translation_redactor" id="translation_redactor" value={this.state.translation_redactor}>
                        <option value=""></option>
                        {author_select}
                    </select>
                    <label>Редактор национального текста</label>  <select onChange={this.onChange} name="origin_redactor" id="origin_redactor" value={this.state.origin_redactor}>
                        <option value=""></option>
                        {author_select}
                    </select>
                    <label>Подготовка комментариев</label>  <select onChange={this.onChange} name="commentator" id="commentator" value={this.state.commentator}>
                        <option value=""></option>
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
    getAuthors,
    getCorpuses,
    updateResource
};

const mapStateToProps = state => ({
    selected: state.resources.selected,
    types: state.resources.types,
    authors: state.authors.all,
    corpuses: state.corpuses.all
})

export default connect(mapStateToProps, mapDispatchToProps)(Resource);
