import React from 'react';

export default class LineHorizontal extends React.Component {

    constructor(props) {
        super(props)
        this.change = this.change.bind(this);
    }

    setClass(state) {
        if (state === "NO") {
            return "board-line-horizontal board-color-none";
        }
        else if (state == "p1") {
            return "board-line-horizontal board-color-p1";
        }
        else {
            return "board-line-horizontal board-color-p2"
        }
    }

    change() {
        this.props.play(this.props.id);
    }

    render() {
        return <div id={this.props.id} className={this.setClass(this.props.stateBoard)} onClick={this.change}>
        </div>
    }
}