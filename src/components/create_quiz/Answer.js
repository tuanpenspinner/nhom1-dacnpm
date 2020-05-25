import React, { Component } from "react";

export default class Answer extends Component {
  onChangeAnswer = (e) => {
    const {onChangeAnswer}=this.props;
    onChangeAnswer(e)
  };
  checkedRightAnswer=(e)=>{
    const {checkedRightAnswer}=this.props;
    checkedRightAnswer(e)
  };
  
  render() {
    const {index,answer,rightAnswer} = this.props;
    return (
      <div className="col-12 box-answer mt-2">
        <input
          onChange={(e)=>this.onChangeAnswer(e)}
          name={index}
          className="text-Answer"
          placeholder={`Đáp án  ${index + 1}`}
          value={answer}
        ></input>
        <input
          type="checkbox"
          className="checkBox"
          name={index}
          checked={rightAnswer}
          onChange={this.checkedRightAnswer}
        ></input>
      </div>
    );
  }
}
