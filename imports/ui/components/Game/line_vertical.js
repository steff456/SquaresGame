import React from 'react';

export default class LineVertical extends React.Component {

    constructor(props) {
        super(props)
        this.change = this.change.bind(this);
    }

    setClass(state) {
        if (state === "NO") {
            return "board-line-vertical board-color-none";
        }
        else if (state == "p1") {
            return "board-line-vertical board-color-p1";
        }
        else {
            return "board-line-vertical board-color-p2"
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