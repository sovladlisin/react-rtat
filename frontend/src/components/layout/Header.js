import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export class Header extends Component {
    render() {
        return (
            <div className="header">
                <div><Link to="/"><p>Главная</p></Link></div>
                <div><button onClick={this.props.handler}><p>Библиотека ресурсов</p></button></div>

                {/* <div><Link to="/"><p>Главная</p></Link></div>
                <div><Link to="/resources"><p>Библиотека ресурсов</p></Link></div>
                <div><Link to="/"><p>Онтология</p></Link></div> */}
            </div>
        )
    }
}

export default Header
