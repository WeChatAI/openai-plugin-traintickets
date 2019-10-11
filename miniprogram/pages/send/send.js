var abc;
function getData(val) {
  abc.send(val)
}

function send(val) {
  abc = val
}

module.exports = {
  send: send,
  getData: getData
}