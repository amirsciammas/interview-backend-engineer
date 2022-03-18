/**
 * Base API response object
 * code: httpStates code 
 * msg: httpStates message
 * results: fetched data
 */
const result = (code, msg, results = null) => {
  const response = {
    code,
    msg,
  };

  if (results) {
    response.results = results;
  }

  return response;
};

module.exports = result;
