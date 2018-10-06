import React from 'react';

export default class LineVertical extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className="board-line-vertical" id={this.props.id}>
        </div>
    }
}