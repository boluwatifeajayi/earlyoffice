require("dotenv").config({})
const swaggerAutogen = require('swagger-autogen')()
const fs = require("fs")
const path = require("path")

const port = process.env.PORT
const doc = {
  info: {
    title: 'Early office',
    description: 'Early office',
  },
  host: `localhost:${process.env.PORT}`,
  securityDefinitions: {
    api_key: {
      type: "apiKey",
      name: "api-key",
      in: "body",
    },
  },
  schemes: ["http"],
  definitions: {
    "server side error": {
      $status: "ERROR",
      $msg: "some error message",
      error: {
        $message: "Error message caught",
        $name: "Error name",
        stack: "Error stack",
      },
    },
    "calculation": {
      $createdAt: "2020-03-31T00:00:00.000Z",
      $result: 100,
    },
  },
};



const outputFile = './swagger_output.json'
const endpointsFiles = []

const route = "./routes"
let files = [];


try{

const getFilesRecursively = (directory) => {
  const filesInDirectory = fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
        getFilesRecursively(absolute);
    } else {
        files.push("./"+absolute);
    }
  }
};

getFilesRecursively(route)
console.log(files)

files = files.map((file)=>{
    return file.split("\\").join("/")
})

console.log(files)


swaggerAutogen(outputFile, files, doc).then(() => {
    require('./app.js')
    console.log(port)
})
}
catch(error){
    console.log(error)
}