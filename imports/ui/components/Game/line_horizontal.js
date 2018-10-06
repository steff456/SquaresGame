import React from 'react';

export default class LineHorizontal extends React.Component {

    constructor(props) {
        super(props)
    }

    setClass(state) {
        if (state === "NO") {
            return "board-line-horizontal board-color-none";
        }
        else {
            return "board-line-horizontal board-color-p1"
        }
    }


    render() {
        return <div id={this.props.id} className={this.setClass(this.props.stateBoard)}>
        </div>
    }
}