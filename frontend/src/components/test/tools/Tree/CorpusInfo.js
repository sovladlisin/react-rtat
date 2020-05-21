import React, { Component, Fragment } from 'react'

import { getCorpus, getCorpusResources, getCorpusAuthors, getCorpusPlaces } from '../../../../actions/corpuses';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Pin from '../../../pins/Pin';

export class CorpusInfo extends Component {


    static propTypes = {
        selected: PropTypes.object.isRequired,
        resources: PropTypes.array.isRequired,
        getCorpus: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getCorpus(this.props.pk)
        this.props.getCorpusResources(this.props.pk)
        this.props.getCorpusAuthors(this.props.pk)
        this.props.getCorpusPlaces(this.props.pk)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.pk != this.props.pk) {
            this.props.getCorpus(nextProps.pk)
            this.props.getCorpusResources(nextProps.pk)
            this.props.getCorpusAuthors(nextProps.pk)
            this.props.getCorpusPlaces(nextProps.pk)
        }
    }


    render() {
        return (
            <Fragment>
                <div className="column">
                    <div className="spacer">Метаданные:</div>
                    <div className="corpus-info">
                        <label>Название</label><p>{this.props.selected['name']}</p>
                        <label>Язык</label><p>{this.props.selected['language']}</p>
                        <label>Диатект</label><p>{this.props.selected['dialect']}</p>
                        <label>Доп. инф.</label><p>{this.props.selected['extras']}</p>
                    </div>
                    <div className="spacer">Ресурсы:</div>
                    <div className="corpus-resources">
                        {this.props.resources.map(item => (
                            <Pin
                                key={item.id}
                                model_name='resource'
                                createWindow={this.props.createWindow}
                                pk={item.id}
                                name={item.name} />
                        ))}
                    </div>
                    <div className="spacer">Авторы:</div>
                    <div className="corpus-resources">
                        {this.props.authors.map(item => (
                            <Pin
                                key={item.id}
                                model_name='author'
                                createWindow={this.props.createWindow}
                                pk={item.id}
                                name={item.name} />
                        ))}
                    </div>
                    <div className="spacer">Места:</div>
                    <div className="corpus-resources">
                        {this.props.places.map(item => (
                            <Pin
                                key={item.id}
                                model_name='place'
                                createWindow={this.props.createWindow}
                                pk={item.id}
                                name={item.name} />
                        ))}
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    getCorpus,
    getCorpusResources,
    getCorpusAuthors,
    getCorpusPlaces
};

const mapStateToProps = state => ({
    selected: state.corpuses.selected,
    resources: state.corpuses.resources,
    authors: state.corpuses.authors,
    places: state.corpuses.places
})

export default connect(mapStateToProps, mapDispatchToProps)(CorpusInfo);
