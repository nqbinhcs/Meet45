import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Meeting from './components/meeting/Meeting';
import Loading from './components/common/Loading';
import PrivateRoute from './components/common/PrivateRoute';
import Context from './context';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [cometChat, setCometChat] = useState(null);
  const [hasNewMeeting, setHasNewMeeting] = useState(false);
  const [meeting, setMeeting] = useState(null);

  useEffect(() => {
    initAuthUser();
    initCometChat();
    initMeeting();
  }, []);

  const initAuthUser = () => {
    const authenticatedUser = localStorage.getItem('auth');
    if (authenticatedUser) {
      setUser(JSON.parse(authenticatedUser));
    }
  };

  const initCometChat = async () => {
    const { CometChat } = await import('@cometchat-pro/chat');
    const appID = `${process.env.REACT_APP_COMETCHAT_APP_ID}`;
    const region = `${process.env.REACT_APP_COMETCHAT_REGION}`;
    const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
    CometChat.init(appID, appSetting).then(
      () => {
        setCometChat(() => CometChat);
      },
      error => {
      }
    );
  };

  const initMeeting = () => { 
    const meeting = localStorage.getItem('meeting');
    if (meeting) {
      setMeeting(JSON.parse(meeting));
    }
  };

  return (
    <Context.Provider value={{ isLoading, setIsLoading, user, setUser, cometChat, hasNewMeeting, setHasNewMeeting, meeting, setMeeting }}>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/meeting" component={Meeting} />
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
      {isLoading && <Loading />}
    </Context.Provider>
  );
}

export default App;
