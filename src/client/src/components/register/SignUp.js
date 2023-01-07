import { useRef, useContext } from "react";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Context from "../../context";
import close from './resource/close.png';

function SignUp(props) {
  const { toggleModal } = props;

  const { cometChat, setIsLoading } = useContext(Context);

  const fullnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const getInputs = () => {
    const fullname = fullnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    return { fullname, email, password, confirmPassword };
  };

  const isSignupValid = ({ fullname, email, password, confirmPassword }) => {
    if (validator.isEmpty(fullname)) {
      alert("Please input your fullname");
      return false;
    }
    if (!validator.isEmail(email)) {
      alert("Please input your email");
      return false;
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 6 })
    ) {
      alert(
        "Please input your password. You password must have at least 6 characters"
      );
      return false;
    }
    if (validator.isEmpty(confirmPassword)) {
      alert("Please input your confirm password");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Confirm password and password must be the same");
      return false;
    }
    return true;
  };

  const createUser = async ({ id, email, password, fullname, avatar }) => {
    const url = "http://localhost:8000/api/users";

    return await axios.post(url, {uid:id,  name: fullname, email: email, password: password, avatar: avatar});

  };

  const createCometChatAccount = async ({ id, fullname, avatar }) => {
    const authKey = `${process.env.REACT_APP_COMETCHAT_AUTH_KEY}`;
    const user = new cometChat.User(id);
    user.setName(fullname);
    user.setAvatar(avatar);
    return await cometChat.createUser(user, authKey);
  };

  const generateAvatar = () => {
    const avatars = [
      "https://data-us.cometchat.io/assets/images/avatars/captainamerica.png",
      "https://data-us.cometchat.io/assets/images/avatars/cyclops.png",
      "https://data-us.cometchat.io/assets/images/avatars/ironman.png",
      "https://data-us.cometchat.io/assets/images/avatars/spiderman.png",
      "https://data-us.cometchat.io/assets/images/avatars/wolverine.png",
    ];
    const avatarPosition = Math.floor(Math.random() * avatars.length);
    return avatars[avatarPosition];
  };

  const signup = async () => {

    const { fullname, email, password, confirmPassword } = getInputs();

    if (isSignupValid({ fullname, email, password, confirmPassword })) {
      setIsLoading(true);
      const avatar = generateAvatar();
      const id = uuidv4();

      const response = await createUser({
        id,
        email,
        password,
        fullname,
        avatar,
      });
      if (response && response.data.message) {
        alert(response.data.message);
      } else {
        const createdAccount = await createCometChatAccount({
          id,
          fullname,
          avatar,
        });


        console.log("CREATE COMECHAT", createdAccount)

        if (createdAccount) {
          alert(
            `${email} was created successfully! Please sign in with your created account`
          );
        }
      }
      toggleModal(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="signup">
      <div className="signup__content">
        <div classs = "align-items-center">
          <div className="signup__close">
            <img
              alt="close"
              onClick={() => toggleModal(false)}
              src={close} class = "w-5"
            />
          </div>
          <h4 style = {{marginTop: '-50px'}} className="block-center"> Đăng ký </h4>
        </div>
        <div className="signup__form">
          <input className="position-relative text_placeholder" type="text" placeholder="Họ và tên" ref={fullnameRef} />
          <p className="title-input find-pos"> Nhập họ và tên </p>
          <input className="position-relative text_placeholder" type="text" placeholder="Email" ref={emailRef} />
          <p className="title-input find-pos"> Nhập địa chỉ email hợp lệ </p>
          <input className="position-relative text_placeholder" type="password" placeholder="******" ref={passwordRef} />
          <p className="title-input find-pos"> Nhập mật khẩu </p>
          <input className="position-relative text_placeholder" type="password" placeholder="******" ref={confirmPasswordRef}/>
          <p className="title-input find-pos"> Nhập lại mật khẩu </p>
          <label for = "cb1">
						<input type = "checkbox" style = {{float: 'left', marginTop: '3px', marginRight: '5px'}} id = "cb1"/> Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật của Meet45
					</label>
          <button className="btn btn-large mb-20 mt-10" onClick={signup}> Đăng ký </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
