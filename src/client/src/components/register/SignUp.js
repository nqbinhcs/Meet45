import { useRef, useContext } from "react";
import validator from "validator";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Context from "../../context";

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
          <div className="signup__title">Sign Up</div>
          <div className="signup__close">
            <img
              alt="close"
              onClick={() => toggleModal(false)}
              src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png"
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
          <button className="signup__btn" onClick={signup}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div id="first-screen">
  //     <div className="container signup">
  //       <p> Ta là Iphone 13! </p>
  //       <div className="row align-items-lg-center">
  //         <div className="col-lg-5" style = "display: block; text-align: center; ">
  //           <a href = "#"><img src = "images/logo-icon.png" alt = "logo-icon" className="w-40"/></a>
  //         </div>
  //         <div className="col-lg-7">
  //           <div className="form">
  //             <h4> Đăng ký </h4>
  //             <input className="position-relative text_placeholder" type = "text" placeholder = "Tên đăng nhập có ít nhất 6 ký tự"  ref={fullnameRef}/>
  //             <p className="title-input find-pos"> Nhập tên đăng nhập </p>
  //             <input className="text_placeholder" type = "text" placeholder = "Vui lòng nhập đại chỉ email hợp lệ" ref={emailRef}/>
  //             <p className="title-input find-pos"> Nhập địa chỉ email </p>
  //             <input className="text_placeholder" type = "text" placeholder = "Mật khẩu có ít nhất 6 ký tự, có đủ chữ hoa, chữ thường và ký tự đặc biệt" ref={passwordRef}/>
  //             <p className="title-input find-pos"> Nhập mật khẩu </p>

  //             <label for = "cb1">
  //               <input type = "checkbox" style={{float: 'left'}} id = "cb1"/> Tôi đồng ý với điều khoản dịch vụ và chính sách bảo mật của Meet45
  //             </label>

  //             <a href = "signin-error1.html"><button type = "button" className="btn btn-large" onClick={signup}> TIẾP TỤC </button></a>
  //             <div className="d-flex align-items-lg-center">
  //               <hr className="w-25"/>
  //               <p className="s2"> HOẶC ĐĂNG NHẬP BẰNG </p>
  //               <hr className="w-25"/>
  //             </div>
              
  //             <div className="d-flex justify-content-lg-between mt-2 mb-3">
  //               <div className="col-lg-3 option-signin">
  //                 <a href = "https://fb.com"><img src = "images/facebook.png" alt="fb" className="w-20 p-2"/> Facebook </a>
  //               </div>
  //               <div className="col-lg-3 option-signin">
  //                 <a href = "https://google.com"><img src = "images/google.png" alt="gg" className="w-20 p-2"/> Google </a>
  //               </div>
  //               <div className="col-lg-3 option-signin">
  //                 <a href = "https://linkedin.com"><img src = "images/linkedin.png" alt="lk" className="w-20 p-2"/> LinkedIn </a>
  //               </div>
  //             </div>
  //             <p style = "display: inline-block; "> Bạn đã có tài khoản <span style = "font-weight: 600; ">Meet45</span>?</p> <a><span style = "font-weight: 700; color: var(--emphasize); cursor: pointer; ">Đăng nhập </span></a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default SignUp;
