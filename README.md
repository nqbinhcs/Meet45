<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify"><img src="src\client\public\logo192.png" alt="Meet45" width="150"></a>
  <br>
  Meet45
  <br>
</h1>

<h4 align="center">A light weight video conference app using ComeChat API</a>.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#run-demo">Run demo</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>

![screenshot](images/demo.gif)

## Key Features
* User authentication: Allow users to log in with their email and password to access their account
* Host and join video conferences
* Share your screen in real-time
* Send messages with others during the call


## Run demo

To clone and run demo of this application, you'll need [Git](https://git-scm.com) and [Docker](https://www.docker.com/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/nqbinhcs/CSC13002-Introduction-to-Software-Engineering.git

# Go into the repository
$ cd CSC13002-Introduction-to-Software-Engineering/src

```

In the `client` directory, create `.env`file as format below:
```
REACT_APP_COMETCHAT_APP_ID=<YOUR APP ID>
REACT_APP_COMETCHAT_REGION=<YOUR REGION>
REACT_APP_COMETCHAT_AUTH_KEY=<YOUR AUTHENCIATION KEY>
```

In the `server` directory, create `.env`file as format below:
```
PORT=<YOUR OPTIONAL PORT>
MONGO_REMOTE_URL=<YOUR MONGO URI DATABASE>
JWT_SECRET=<SECRET KEY>
```


Run demo the app
```bash
# It will produce
#   - Client sites: http://localhost:3001/ & http://localhost:3002/
#   - Server sites: http://localhost:8000/
$ docker-compose up
```


## Credits
This software uses the following:
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Comechat tutorial](https://www.cometchat.com/tutorials/zoom-clone-app)


## License
MIT


