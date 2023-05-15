exports.success = function (req, res, message, status) {
  //
  res.status(status || 200 ).send({
    codigo: 0,
    body: message,
  });
};

exports.error = function (req, res, message, status, details) {
  console.error('[response error] ' + details)
  //
  res.status(status || 500 ).send({
    codigo: 1,
    error: message,
  });
};
