import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTests } from '../../actions/tests';

import CorpusTree from './tools/CorpusTree';
import Resources from './tools/Resources';
import CreateCorpus from './tools/CreateCorpus';
import UploadCorpus from './tools/UploadCorpus';
import Multimedia from './tools/Multimedia';

export class Library extends Component {

    constructor(props) {
        super(props)
        this.choiceHandler = this.choiceHandler.bind(this)
    }

    static propTypes = {
        tests: PropTypes.array.isRequired
    };

    componentDidMount() {
        this.props.getTests();
    }

    state = {
        activeComponent: "CorpusTree",
    };


    choiceHandler(value) {
        this.setState({
            activeComponent: value
        })
    }


    render() {
        return (
            <Fragment>
                <div className="library-block">
                    <div className="menu">
                        <div className="item"><button onClick={() => this.choiceHandler('CorpusTree')}><p>Дерево корпусов</p></button></div>
                        <div className="item"><button onClick={() => this.choiceHandler('Resources')}><p>Ресурсы</p></button></div>
                        <div className="item"><button onClick={() => this.choiceHandler('CreateCorpus')}><p>Создать корпус</p></button></div>
                        <div className="item"><button onClick={() => this.choiceHandler('UploadCorpus')}><p>Загрузить корпус</p></button></div>
                        {/* <div className="item"><button onClick={() => this.choiceHandler('Multimedia')}><p>Мультимедиа</p></button></div> */}
                    </div>

                    {this.state.activeComponent === 'CorpusTree' ? (<CorpusTree createWindow={this.props.createWindow} />) :
                        this.state.activeComponent === 'Resources' ? (<Resources createWindow={this.props.createWindow} />) :
                            this.state.activeComponent === 'CreateCorpus' ? (<CreateCorpus />) :
                                this.state.activeComponent === 'UploadCorpus' ? (<UploadCorpus />) :
                                    this.state.activeComponent === 'Multimedia' ? (<Multimedia />)
                                        : null}
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    tests: state.tests.tests
})

export default connect(mapStateToProps, { getTests })(Library);
