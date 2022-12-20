import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import MeetingHeader from './MeetingHeader';
import { CometChatMessages } from '../../cometchat-pro-react-ui-kit/CometChatWorkspace/src';
import Context from '../../context';
import chatButton from './resource/chatButton.png';


const Meeting = () => { 
  const { meeting, cometChat } = useContext(Context);

  const history = useHistory();
  const [style, setStyle] = useState("callWrapper");
  const [check, setCheck] = useState(0);
  
  const sayHello = () => {
    if (check == 1){
      setStyle("callWrapper")
      setCheck(0)}
    
    else{
        setStyle("callWrapper1")
        setCheck(1)}
  
  }

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
        <div className = {style}>
          <div id="call__screen"></div>
          <button><img src= {chatButton}  className="buttonT" onClick = {sayHello} ></img></button>;
        </div>
        </div>

        <div className="meeting__right">
          <CometChatMessages chatWithGroup={meeting.uid} />
        </div>
      </div>
    </>
  );
};

export default Meeting;