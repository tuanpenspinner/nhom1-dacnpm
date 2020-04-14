import * as types from "../constants/ActionTypes";
import { endPoint } from "../constants/endPoint";
import openSocket from "socket.io-client";

var options = {
  rememberUpgrade: true,
  transports: ["websocket"],
  secure: true,
  rejectUnauthorized: false,
};
var socket = openSocket(endPoint, options);

var initState = {
  socket: socket,
  pin: Math.floor(Math.random() * 10000) + 1,
  startPlay: false,
  questions: [],
  numberMembersAnswer: 0,
  members: [],
  numberCurrentQuestion: 0,
  time: 0,
  answersBackgroundColor: ["", "", "", ""],
};
var myReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SAVE_NEW_MEMBER: {
      state.members.push(action.newMember);
      return { ...state };
    }
    case types.CLICK_START_PLAY: {
      state.startPlay = action.startPlay;
      return { ...state };
    }

    case types.GET_QUESTION:{
      state.questions=[...action.questions]
     return {...state}; 
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
