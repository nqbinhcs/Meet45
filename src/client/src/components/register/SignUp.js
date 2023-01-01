import { useRef, useContext } from "react";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Context from "../../context";
import logo from './resource/logo-icon.png';
import facebook from './resource/facebook.png';
import google from './resource/google.png';
import linkedin from './resource/linkedin.png';
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
        <div className="signup__container">
          <div className="signup__title"> Đăng ký </div>
          <div className="signup__close">
            <img
              alt="close"
              onClick={() => toggleModal(false)}
              src={close} class = "w-10"
            />
          </div>
        </div>
        <div className="signup__subtitle"></div>
        <div className="signup__form">
          <input type="text" placeholder="Fulllname" ref={fullnameRef} />
          <input type="text" placeholder="Email" ref={emailRef} />
          <input type="password" placeholder="Password" ref={passwordRef} />
          <input
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />
          <button className="btn btn-large mb-20" onClick={signup}>
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="first-screen">
		  <div className="row align-items-lg-center">
			  <div className="col-lg-5 block-center">
				  <a href = "#"><img src = {logo} alt = "logo-icon" className="w-40"/></a>
			  </div>
			  <div className="col-lg-7">
				  <div className="form">
					  <h4 style = {{margin: '30px 0'}}> Đăng nhập </h4>
            <input className="position-relative text_placeholder" type="text" placeholder="Nhập họ và tên hợp lệ" ref={fullnameRef}/>
            <p className="title-input find-pos"> Nhập họ và tên </p>
            <input className="position-relative text_placeholder" type="text" placeholder="Nhập địa chỉ email hợp lệ" ref={emailRef}/>
            <p className="title-input find-pos"> Nhập địa chỉ email </p>
            <input className="position-relative text_placeholder" type="password" placeholder="******" ref={passwordRef} />
            <p className="title-input find-pos"> Nhập mật khẩu </p>
            <input className="position-relative text_placeholder" type="password" placeholder="******" ref={confirmPasswordRef} />
            <p className="title-input find-pos"> Nhập lại mật khẩu </p>
            <a href = "#"><button type = "button" className="btn btn-large mb-20" style = {{marginTop: '0' }} onClick={signup}> TIẾP TỤC </button></a>
            <a href = "#" className="forgot-password" > Quên mật khẩu? </a>
            
            <div className="d-flex align-items-lg-center mt-15 justify-content-center">
						  <hr class= "w-30"/>
						  <p className="s2" style = {{margin: "15px 50px"}}> HOẶC ĐĂNG NHẬP BẰNG </p>
						  <hr class= "w-30"/>
					  </div>

					  <div className="d-flex justify-content-lg-between mt-2 mb-3">
              <div className="col-lg-3 option-signin">
                <a href = "https://fb.com"><img src = {facebook} className="w-25 p-2"/> Facebook </a>
              </div>
              <div className="col-lg-3 option-signin">
                <a href = "https://google.com"><img src = {google} className="w-25 p-2"/> Google </a>
              </div>
						  <div className="col-lg-3 option-signin">
							  <a href = "https://linkedin.com"><img src = {linkedin} className="w-25 p-2"/> LinkedIn </a>
						  </div>
					  </div>

					  <p style = {{display: "inline-block", marginBottom: "20px", marginTop: "10px"}}> Bạn là thành viên mới? </p> <a onClick={() => toggleModal(true)}><span className="note">Đăng ký ngay</span></a>
				  </div>
			  </div>
		  </div>
    </div>
  );
}

export default SignUp;
