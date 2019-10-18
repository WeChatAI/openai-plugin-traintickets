var data = require("./api/data.js");

module.exports = {
  getData: data.getData,
  setData: data.setData,
  init: data.auth,
  send: data.send,
  setGuideList: data.setGuideList,
  setTextToSpeech: data.setTextToSpeech,
  setWelcome: data.setWelcome,
  setBackground: data.setBackground,
  voiceStart: data.voiceStart,
  getChatComponent: data.getChatComponent,
  setNavHeight: data.setNavHeight
};
