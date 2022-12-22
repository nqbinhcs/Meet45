import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context';
import mainLogo from './resource/iconMeeting.png';

function MeetingHeader() {
  const { meeting } = useContext(Context);

  const history = useHistory();

  const stopMeeting = () => {
    history.push('/');
  };

  return (
    <div className="header" style={{backgroundColor: "black"}}>
      <div className="header__left">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" onClick={stopMeeting}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <img  style={{ width: 30, height: 30 }} src={mainLogo}  />

        <span className="header__app-name" >{meeting?.title}</span>
      </div>
    </div>
  );
}

export default MeetingHeader;