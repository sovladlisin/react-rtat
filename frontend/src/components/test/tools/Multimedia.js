import React, { Component } from 'react'

export class Multimedia extends Component {
    render() {
        return (
            <div className="column">
                <div><button><p>Изображения</p></button></div>
                <div><button><p>Аудио</p></button></div>
                <div><button><p>Видео</p></button></div>
            </div>
        )
    }
}

export default Multimedia
