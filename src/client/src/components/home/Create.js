import { useRef, useContext } from 'react';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import Context from '../../context';
import closeButton from './resource/closeButton.png';

const Create = (props) => {
  const { toggleCreate } = props;

  const { user, cometChat, setIsLoading, setHasNewMeeting } = useContext(Context);

  const meetingNameRef = useRef();

  const hideCreate = () => {
    toggleCreate(false);
  };

  const createCometChatGroup = async ({ uid, name }) => {
    const groupType = cometChat.GROUP_TYPE.PUBLIC;
    const password = "";
    const group = new cometChat.Group(uid, name, groupType, password);
    await cometChat.createGroup(group);
  };

  const createMeeting = async () => {
    const name = meetingNameRef.current.value;
    const uid = uuidv4();
    if (!name || !uid) {
      return;
    }
    try {
      setIsLoading(true);
      const url = "http://localhost:8000/api/meetings";
      await axios.post(url, { title: name, uid: uid, creator: user.uid });
      await createCometChatGroup({ uid, name });
      alert(`${name} was created successfully, you can share the meeting id to other users`);
      toggleCreate(false);
      setIsLoading(false);
      setHasNewMeeting(true);
    } catch (error) {
      console.log(error);
      alert('Cannot create your meeting. Please try again');
      setIsLoading(false);
    }
  };

  return (
    <div className="create">
      <div className="create__content">
        <div className="create__container">
          <div className="create__title">Create Meeting</div>
          <div className="create__close">
            <img alt="close" onClick={hideCreate} src={closeButton}/>
          </div>
        </div>
        <div className="create__subtitle"></div>
        <div className="create__form">
          <input type="text" placeholder="Meeting Name" style = {{color: 'white'}} ref={meetingNameRef} />
          <button className="create__btn" onClick={createMeeting}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;