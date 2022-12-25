import { useRef, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Context from '../../context';
import closeButton from './resource/closeButton.png';

const Join = (props) => {
  const { toggleJoin } = props;

  const { setIsLoading, setMeeting, cometChat } = useContext(Context);

  const meetingIdRef = useRef();

  const history = useHistory();

  const hideJoin = () => {
    toggleJoin(false);
  };

  const joinCometChatGroup = async ({ guid }) => {
    var password = "";
    var groupType = cometChat.GROUP_TYPE.PUBLIC;
    await cometChat.joinGroup(guid, groupType, password);
  };

  const goMeeting = (meeting) => {
    if (!meeting) {
      return;
    }
    localStorage.setItem('meeting', JSON.stringify(meeting));
    setMeeting(meeting);
    history.push('/meeting');
  }

  const joinMeeting = async () => {
    const meetingId = meetingIdRef.current.value;
    if (!meetingId) {
      alert('Please input the meeting id');
      return;
    }
    let meeting = null;
    try {
      setIsLoading(true);
      const url = `http://localhost:8000/api/meetings/${meetingId}/get`;
      const response = await axios.get(url);

      console.log(response.data);
      
      if (response && response.data) {
        console.log("TEST GET", response.data);
        meeting = response.data;
        await joinCometChatGroup({ guid: meeting.uid });
        goMeeting(meeting);
        setIsLoading(false);
      } else {
        alert('Cannot find your meeting');
        setIsLoading(false);
      }
    } catch (error) {
      if (error.code === "ERR_ALREADY_JOINED") {
        goMeeting(meeting);
        setIsLoading(false);
      } else { 
        alert('Cannot find your meeting 2');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="join">
      <div className="join__content">
        <div className="join__container">
          <div className="join__title">Join Meeting</div>
          <div className="join__close">
            <img alt="close" onClick={hideJoin} src={closeButton} />
          </div>
        </div>
        <div className="join__subtitle"></div>
        <div className="join__form">
          <input type="text" placeholder="Meeting Id" ref={meetingIdRef} />
          <button className="join__btn" onClick={joinMeeting}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;