var data = require("./api/data.js");

module.exports = {
  getData: data.getData,
  setData: data.setData,
  init: data.auth,
  send: data.send,
  setGuideList: data.setGuideList,
  setTextToSpeech: data.setTextToSpeech,
  getChatComponent: data.getChatComponent,
  clearChatRecord: data.clearChatRecord
};
