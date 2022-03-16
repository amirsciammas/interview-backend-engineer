const result = (code, msg, records = null) => {
  const response = {
    code,
    msg,
  };

  if (records) {
    response.records = records;
  }

  return response;
};

module.exports = result;
