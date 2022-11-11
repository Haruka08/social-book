const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialbookdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
