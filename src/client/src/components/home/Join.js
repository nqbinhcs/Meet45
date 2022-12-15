import { useRef, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Context from '../../context';

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
      const url = `http://localhost:8080/meetings/${meetingId}/get`;
      const response = await axios.get(url);
      if (response && response.data && response.data.length) {
        meeting = response.data[0];
        await joinCometChatGroup({ guid: meeting.meeting_uid });
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
        alert('Cannot find your meeting');
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
            <img alt="close" onClick={hideJoin} src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png" />
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