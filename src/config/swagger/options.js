const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "User API",
        version: "1.0.0",
        description: "A Rest Api App To Get User Album Information"
      },
      servers: [
        {
          url: "http://localhost:3000"
        }
      ]
    },
    apis: ["app.js"]
};

module.exports = options;
