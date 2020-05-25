import React, { Component, Fragment } from 'react'
import Pin from '../../../pins/Pin';

export class TreeNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    toggle = (pk) => {
        this.props.getCorpusInfo(pk);
        this.setState({ visible: !this.state.visible });
    };

    render() {
        var children;
        var className;
        var level = this.props.level
        const self = this

        const name = this.props.node.name,
            model_name = 'corpus',
            id = this.props.node.id

        if (this.props.node.children != null) {
            children = this.props.node.children.map(function (node, index) {
                return <li key={index}>
                    <TreeNode
                        node={node}
                        level={level}
                        getCorpusInfo={self.props.getCorpusInfo}
                        createWindow={self.props.createWindow} />
                </li>
            });

            className = 'togglable';
            if (this.state.visible) {
                className += ' togglable-down';
            } else {
                className += ' togglable-up';
            }
        }

        var style;
        if (!this.state.visible) {
            style = { display: "none" };
        }

        var padding = {
            paddingLeft: this.props.level + 'px'
        }

        return (
            <div style={padding}>
                <div onClick={() => this.toggle(id)} className={className}>
                    <Pin
                        model_name={model_name}
                        pk={id}
                        createWindow={self.props.createWindow}
                        name={name} />
                </div>
                <ul style={style}>
                    {children}
                </ul>
            </div >
        );
    }
}
export default TreeNode