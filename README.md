# react-express-passportjs
A simple app that demonstrates how to create use authentication via PassportJS with a react frontend and express backend

### Start
There are a few ways to start up and run the express-server and the react-app. Each has it's own Makefile but there is also a Makefile in the root directory that will run the commands of the sub folders.

#### Steps to run 
1. Open a terminal for each app 
2. Run <code>make all</code> which will run the <code>npm install</code> followed by the <code>npm start</code>

#### Additional Notes 
- The express-server is running on port 3001
- The react-app is running on port 3000
- The react-app is proxying the express-server via the package.json file
- You must set create a .env file in the express-server and populate it the same way as the .env.example file
- There are also Dockerfiles in each sub folder if you would like to go that approach
