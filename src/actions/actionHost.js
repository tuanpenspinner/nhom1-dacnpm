import * as types from "../constants/ActionTypes";

export const getQuestions = questions => {
  return {
    type: types.GET_QUESTION,
    questions
  };
};
export const saveNewMember = newMember => {
  return {
    type: types.SAVE_NEW_MEMBER,
    newMember
  };
};
export const clickStartGame = (startPlay) => {
  return {
    type: types.CLICK_START_PLAY,
    startPlay
  };
};
export const clickNextQuestion = numberCurrentQuestion => {
  return {
    type: types.CLICK_NEXT_QUESTION,
    numberCurrentQuestion
  };
};

export const memberExit = members => {
  return {
    type: types.MEMBER_EXIT,
    members
  };
};
export const memberAnswer = (members) => {
  return {
    type: types.MEMBER_ANSWER,
    members,
  };
};
export const setTimeQuestion = (time) => {
  return {
    type: types.SET_TIME_QUESTION_HOST,
    time
  };
};