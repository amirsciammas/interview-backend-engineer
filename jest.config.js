module.exports = {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": ".",
    "testRegex": ".spec.ts$",
    "transform": {
      "^.+\\.(t|j)s$": [
        "ts-jest", {
          "tsconfig": "tsconfig.json"
        }
      ]
    },
    "coverageDirectory": "./coverage",
    "testEnvironment": "node"
  }
  