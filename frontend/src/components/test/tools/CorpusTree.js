import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Pin from '../../pins/Pin';

import { getCorpuses } from '../../../actions/corpuses';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TreeNode from './Tree/TreeNode';
import CorpusInfo from './Tree/CorpusInfo';

export class CorpusTree extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        tree: [],
    }


    componentDidMount() {
        this.props.getCorpuses()
    }

    renderTree = () => {
        if (this.props.corpuses.length == 0) return;

        var tree = []

        this.props.corpuses.forEach(element => {
            tree.push({ id: element.id, parentid: element.parent, name: element.name })
        });

        const corpus_tree = this.buildTree(tree)

        var self = this;
        const result = corpus_tree.map(function (node, index) {
            return <TreeNode key={node.id} node={node} level={10} getCorpusInfo={self.getCorpusInfo} createWindow={self.props.createWindow} />
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

    getCorpusInfo = (pk) => {
        this.setState({
            corpus_info_pk: pk
        })
    }

    renderCorpusInfo = () => {
        if (this.state.corpus_info_pk != undefined) {
            return (
                <CorpusInfo pk={this.state.corpus_info_pk} createWindow={this.props.createWindow}></CorpusInfo>
            )
        }
    }

    render() {
        var style = { width: '300px' }
        return (
            <Fragment>
                <div className="column" style={style}>
                    {this.renderTree()}
                </div>
                {this.renderCorpusInfo()}
            </Fragment>
        )
    }
}


const mapDispatchToProps = {
    getCorpuses,
};

const mapStateToProps = state => ({
    corpuses: state.corpuses.all,
})

export default connect(mapStateToProps, mapDispatchToProps)(CorpusTree);


