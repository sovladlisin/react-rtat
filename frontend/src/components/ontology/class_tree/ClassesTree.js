import React, { Component, Fragment } from 'react'

import TreeNode from './TreeNode';

export class ClassesTree extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        tree: [],
    }


    componentDidMount() {
    }

    renderTree = () => {
        if (this.props.classes.length == 0) return;

        var tree = []

        this.props.classes.forEach(element => {
            tree.push({ id: element.id, parentid: element.parent, name: element.name })
        });

        const classes_tree = this.buildTree(tree)

        var self = this;
        const result = classes_tree.map(function (node, index) {
            return <TreeNode key={node.id} node={node} level={10} createWindow={self.props.createWindow} />
        });
        return result
    }

    buildTree(arr) {
        var tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;

        // First map the nodes of the array to an object -> create a hash table.
        for (var i = 0, len = arr.length; i < len; i++) {
            arrElem = arr[i];
            mappedArr[arrElem.id] = arrElem;
            mappedArr[arrElem.id]['children'] = [];
        }


        for (var id in mappedArr) {
            if (mappedArr.hasOwnProperty(id)) {
                mappedElem = mappedArr[id];
                // If the element is not at the root level, add it to its parent array of children.
                if (mappedElem.parentid) {
                    mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
                }
                // If the element is at the root level, add it to first level elements array.
                else {
                    tree.push(mappedElem);
                }
            }
        }
        return tree;

    }

    render() {
        return (
            <Fragment>
                <div className="column" >
                    {this.renderTree()}
                </div>
            </Fragment>
        )
    }
}



export default ClassesTree;


