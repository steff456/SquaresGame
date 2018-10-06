import React from 'react';

export default class Square extends React.Component {
    constructor(props) {
        super(props)
        this.selectName = this.selectName.bind(this);
    }

    selectName() {
        if (this.props.stateBoardSq == "NO") {
            return "";
        }
        return this.props.stateBoardSq;
    }
    render() {
        return <div className="board-square">{this.selectName()}
        </div>
    }
}