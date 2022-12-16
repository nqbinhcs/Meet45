import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import MeetingHeader from './MeetingHeader';
import { CometChatMessages } from '../../cometchat-pro-react-ui-kit/CometChatWorkspace/src';
import Context from '../../context';

const Meeting = () => { 

  const { meeting, cometChat} = useContext(Context);

  const history = useHistory();

  useEffect(() => {
    if (meeting && cometChat) {
      startDirectCall();
    }
  }, [meeting, cometChat]);

  const startDirectCall = () => {
    if (cometChat && meeting) {
      const sessionID = meeting.uid;
      const audioOnly = false;
      const defaultLayout = true;
      const callSettings = new cometChat.CallSettingsBuilder()
        .enableDefaultLayout(defaultLayout)
        .setSessionID(sessionID)
        .setIsAudioOnlyCall(audioOnly)
        .build();
      cometChat.startCall(
        callSettings,
        document.getElementById("call__screen"),
        new cometChat.OngoingCallListener({
          onUserListUpdated: userList => {
          },
          onCallEnded: call => {
            history.push('/');
          },
          onError: error => {
            history.push('/');
          },
          onMediaDeviceListUpdated: deviceList => {
          },
          onUserMuted: (userMuted, userMutedBy) => {
          },
          onScreenShareStarted: () => {
          },
          onScreenShareStopped: () => {
          }
        })
      );
    }
  };

  if (!meeting || !cometChat) {
    return <></>;
  }

  return (
    <>
      <MeetingHeader />
      <div className="meeting"> 
        <div className="meeting__left">
          <div id="call__screen"></div>
        </div>
        {/* <div className="meeting__right">
          <CometChatMessages chatWithGroup={meeting.meeting_uid} />
        </div> */}
      </div>
    </>
  );
};

export default Meeting;