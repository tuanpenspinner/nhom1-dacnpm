import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/actionHost";
import axios from "axios";
import { endPointDataQuestion } from "../../constants/endPoint";
import music from "./backgroundaudio.mp3";

export class PreparePlayGame extends Component {
  componentDidMount() {
    this.loadQuestions();
    
    const { socket, pin } = this.props.host;

    socket.emit("creat_room", pin);

    socket.on("newMember", (newMember) => {
      const { saveNewMember } = this.props;
      saveNewMember(newMember);
    });

    socket.on("memberExit", (data) => {
      var { members } = this.props.host;
      const index = members.findIndex((m) => m.id === data.id);
      members.splice(index, 1);
      const { memberExit } = this.props;
      memberExit(members);
    });
  }

  loadQuestions = async () => {
 
    const {getQuestions}=this.props
    const token = localStorage.getItem("token");
    const questions = await axios.get(endPointDataQuestion, {
      headers: { "x-access-token": `${token}` },
    });
    getQuestions(questions.data)
   
  };

  onClick = async () => {
    const { socket,questions } = this.props.host;
    const { clickStartGame } = this.props;
    socket.emit("start", true);
    socket.emit("questions", questions);
    clickStartGame(true);
  };

  render() {
    const { members, pin } = this.props.host;
    const numberMember = members.length;
    var showMembers = members.map((member, index) => {
      return (
        <button type="button" key={index} className="btn btn-danger member ">
          {member.nickName} <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      );
    });
    return (
      <div className="prepareplaygame">
        <audio className="hideAudio" controls loop autoPlay>
          <source src={music} />
        </audio>
        <p className="pin">PIN:{pin}</p>
        <div className="startgame">
          <button
            type="button"
            onClick={this.onClick}
            className="btn btn-success"
          >
            Start Game
          </button>
        </div>
        <div className="card boxmembers">
          <h2 className="card-header">Số lượng thành viên: {numberMember} </h2>
          <div className="members">{showMembers}</div>
        </div>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    host: state.host,
  };
};

const mapDispathToProps = (dispatch, props) => {
  return {
    getQuestions: (questions) => {
      dispatch(actions.getQuestions(questions));
    },
    clickStartGame: (playStart) => {
      dispatch(actions.clickStartGame(playStart));
    },
    saveNewMember: (newMember) => {
      dispatch(actions.saveNewMember(newMember));
    },
    memberExit: (members) => {
      dispatch(actions.memberExit(members));
    },
  };
};
export default connect(mapStatetoProps, mapDispathToProps)(PreparePlayGame);