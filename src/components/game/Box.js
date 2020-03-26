import React, { Component } from "react";
import axios from "axios";
import openSocket from "socket.io-client";

import Answer from "./Answer";
import Question from "./Quetions";
import Img from "./Img";
import EnterPin from "./EnterPin";
import Waiting from "./Waiting";
import "./game.css";
import { endPoint, getDataQuestion } from "../../const";

export class Box extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: "",
      numberQuestion: 0,
      score: 0,
      start: false,
      nickName: "",
      pin: "",
      disableAnswer: false
    };
    this.socket = null;
  }

  componentDidMount() {
    this.start();
  }

  start = () => {
    var options = {
      rememberUpgrade: true,
      transports: ["websocket"],
      secure: true,
      rejectUnauthorized: false
    };

    this.socket = openSocket(endPoint, options);
    this.socket.on("numberQuestion", data => {
      this.setState({ numberQuestion: data, disableAnswer: false });
    });
    this.socket.on("startOk", start => {
      if (start) {
        this.getData();
      } else {
        this.setState({
          start: false,
          nickName: "",
          pin: ""
        });
      }
    });
  };

  getData = () => {
    axios
      .get(getDataQuestion)
      .then(res => {
        const questions = res.data;
        this.setState({
          questions,
          start: true
        });
      })
      .catch(err => {
        console.log(err);
        return 0;
      });
  };

  clickAnswer = numberAnswer => {
    const { questions } = this.state;
    var { numberQuestion } = this.state;
    const rightAnswer = questions[numberQuestion].rightAnswer;
    this.setState({
      disableAnswer: true
    });
    if (numberAnswer === rightAnswer) {
      this.socket.emit("memberAnswer", true);
      alert("Bạn trả lời đúng rồi");
    } else {
      this.socket.emit("memberAnswer", false);
      alert("Bạn trả lời sai rồi");
    }
    if (questions.length > numberQuestion) {
      this.setState({
        numberQuestion
      });
    }
  };

  clickSubmit = (nickName, pin) => {
    this.setState({
      nickName,
      pin
    });
    if (nickName && pin === 6969) {
      this.socket.emit("nickName", nickName);
    }
  };

  show = () => {
    const {
      questions,
      numberQuestion,
      start,
      pin,
      nickName,
      disableAnswer
    } = this.state;
    if (pin === 6969 && nickName && !start) {
      return <Waiting />;
    } else if (questions && start && pin === 6969) {
      return (
        <div className="wrapper row">
          <div className="col-12 col-sm-10">
            <Question question={questions[numberQuestion].question} />
            <Img />
            <Answer
              answer={questions[numberQuestion].answer}
              clickAnswer={this.clickAnswer}
              disable={disableAnswer}
            />
          </div>
        </div>
      );
    } else {
      return <EnterPin clickSubmit={this.clickSubmit} />;
    }
  };

  render() {
    return <div>{this.show()}</div>;
  }
}

export default Box;
