import React, { Component, Fragment } from 'react'


import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPlace, getPlaces } from '../../../actions/place';
import Pin from '../../pins/Pin';


export class PlaceForm extends Component {

    static propTypes = {
        createPlace: PropTypes.func.isRequired,
        getPlaces: PropTypes.func.isRequired,
    };

    state = {
        name: 'Не указано',
        location: 'Не указано'
    }


    componentDidMount() {
        this.props.getPlaces()
    }

    save = () => {
        const obj = this.state
        this.props.createPlace(obj)
    }


    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    renderForm = () => {
        return (
            <Fragment>
                <label>Название</label><input onChange={this.onChange} type="text" name="name" value={this.state.name} />
                <label>Координаты</label><input onChange={this.onChange} type="text" name="location" value={this.state.location} />
            </Fragment>
        )
    }


    render() {
        return (
            <Fragment>
                <div className="content-all">
                    <div className="content-search">
                        <input placeholder="Поиск: " name="searchbar" type="text" onChange={this.onChange}></input>
                        <button onClick={this.search}><i class="fas fa-search"></i></button>
                    </div>
                    {this.props.places.map(item => {
                        return (
                            <Pin
                                model_name={'place'}
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
                    <button onClick={this.save}>Добавить новое место</button>
                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    createPlace,
    getPlaces
};

const mapStateToProps = state => ({
    places: state.places.all
})

export default connect(mapStateToProps, mapDispatchToProps)(PlaceForm);

