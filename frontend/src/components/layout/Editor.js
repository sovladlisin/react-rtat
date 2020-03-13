import React, { Component, Fragment } from 'react'
import axios from 'axios';

export class Editor extends Component {

    constructor(props) {
        super(props)

        this.renderTexts = this.renderTexts.bind(this)
    }

    state = {
        original: {},
        original_text: [],
        translated: {},
        translated_text: []
    }

    componentDidMount() {
        const pk = this.props.match.params.pk
        var data = null
        axios.get(`/api/textToText/`)
            .then(res => {
                data = res.data.filter(item => item.original == pk || item.translated == pk);
                axios.get(`/api/resource/${data[0].original}`)
                    .then(res => {
                        const original = res.data;
                        axios.get(`/api/resource/${data[0].translated}`)
                            .then(res => {
                                const translated = res.data;
                                fetch(original.link)
                                    .then((r) => r.text())
                                    .then(text => {
                                        const original_text = text.split('\n')
                                        fetch(translated.link)
                                            .then((r) => r.text())
                                            .then(text => {
                                                const translated_text = text.split('\n')
                                                this.setState({
                                                    original: original,
                                                    translated_text: translated_text,
                                                    original_text: original_text,
                                                    translated: translated
                                                })
                                            })
                                    })
                            })
                    })
            })
    }

    renderTexts(start, end) {
        if (this.state.original_text.length === 0) return;

        const original_text = this.state.original_text.slice(start, end);
        const translated_text = this.state.translated_text.slice(start, end);

        const content = original_text.map((id) => {
            return (
                <Fragment>
                    <p>{id}</p>
                    <p>{translated_text[original_text.indexOf(id)]}</p>
                </Fragment>
            )
        });

        return content;
    }

    render() {
        return (
            <Fragment>
                <div className="text-editor">
                    {this.renderTexts()}
                </div>
            </Fragment>
        )
    }
}

export default Editor
