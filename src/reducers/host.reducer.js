import * as types from "../constants/ActionTypes";
import { endPoint } from "../constants/endPoint";
import openSocket from "socket.io-client";

var initState = {
  socket: null,
  pin: Math.floor(Math.random() * 1000000) + 1,
  startPlay: false,
  questions: [],
  numberMembersAnswer: 0,
  members: [],
  membersBeforeTimeOut: [],
  numberCurrentQuestion: 0,
  time: 0,
  answersBackgroundColor: ["", "", "", ""],
};
var myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.CONNECT_SOCKET_IO_HOST: {
      const options = {
        rememberUpgrade: true,
        transports: ["websocket"],
        secure: true,
        rejectUnauthorized: false,
      };
      const socket = openSocket(endPoint, options);
      state.socket = socket;
      return { ...state };
    }
    case types.SAVE_NEW_MEMBER: {
      state.members.push(action.newMember);
      return { ...state };
    }
    case types.MEMBER_BEFORE_TIME_OUT: {
      state.membersBeforeTimeOut = action.membersBeforeTimeOut;
      return { ...state };
    }
    case types.CLICK_START_PLAY: {
      state.startPlay = action.startPlay;
      return { ...state };
    }

    case types.GET_QUESTION: {
      state.questions = [...action.questions];
      return { ...state };
    }

    case types.CLICK_NEXT_QUESTION: {
      state.socket.emit("next", 1);
      state.numberCurrentQuestion += 1;
      state.answersBackgroundColor = ["", "", "", ""];
      state.time = state.questions[state.numberCurrentQuestion].timeAnswer;
      state.numberMembersAnswer = 0;
      return { ...state };
    }

    case types.MEMBER_EXIT: {
      state.members = action.members;
      return { ...state };
    }

    case types.MEMBER_ANSWER: {
      state.numberMembersAnswer += 1;
      state.members = action.members;
      return { ...state };
    }
    case types.SET_TIME_QUESTION_HOST: {
      state.time = action.time;
      if (state.time === 0) {
        var rightAnswer =
          state.questions[state.numberCurrentQuestion].rightAnswer;
        state.answersBackgroundColor[rightAnswer - 1] = "bg-success";
      }
      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default myReducer;