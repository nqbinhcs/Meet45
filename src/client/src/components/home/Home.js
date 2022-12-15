import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Header from '../common/Header';
import Create from './Create';
import Join from './Join';
import Context from '../../context';

const Home = () => {
  const [meetings, setMeetings] = useState([]);

  const { user, setIsLoading, hasNewMeeting, setMeeting } = useContext(Context);

  const [isCreateShown, setIsCreateShown] = useState(false);
  const [isJoinShown, setIsJoinShown] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (user) {
      loadMeetings();
    }
  }, [user, hasNewMeeting]);

  const loadMeetings = async () => {
    if (user) {
      setIsLoading(true);
      const url = `http://localhost:8080/meetings/${user.id}`;
      const response = await axios.get(url);
      const meetings = response.data;
      setMeetings(() => meetings);
      setIsLoading(false);
    }
  };

  const toggleCreate = (isShown) => {
    setIsCreateShown(() => isShown);
  };

  const toggleJoin = (isShown) => {
    setIsJoinShown(() => isShown);
  };

  const goMeeting = (meeting) => () => {
    setMeeting(meeting);
    localStorage.setItem('meeting', JSON.stringify(meeting));
    history.push('/meeting');
  };

  return (
    <>
      <Header toggleCreate={toggleCreate} toggleJoin={toggleJoin} />
      <div className="main">
        <div className="main__list">
          <h3>Your Created Meetings</h3>
          {meetings && meetings.map(meeting => (
            <div className="main__list-item" key={meeting.id}>
              <h3>{meeting.meeting_title}</h3>
              <p className="main__meeting-id">Meeting ID: {meeting.meeting_uid}</p>
              <button className="main__meeting-start" onClick={goMeeting(meeting)}>Start</button>
            </div>
          ))}
        </div>
        {isCreateShown && <Create toggleCreate={toggleCreate} />}
        {isJoinShown && <Join toggleJoin={toggleJoin} />}
      </div>
    </>
  );
};
export default Home;