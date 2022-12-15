import { useContext } from 'react';
import Context from '../../context';
import { useHistory } from 'react-router-dom';

function Header(props) {
  const { toggleCreate, toggleJoin } = props;

  const { user, setUser, cometChat } = useContext(Context);

  const history = useHistory();

  const showCreate = () => {
    toggleCreate(true);
  };

  const showJoin = () => {
    toggleJoin(true);
  };

  const logout = async () => {
    const isLogout = window.confirm('Do you want to log out ?');
    if (isLogout) {
      await cometChat.logout();
      setUser(null);
      localStorage.removeItem('auth');
      history.push('/login');
    }
  }

  return (
    <div className="header">
      <div className="header__left">
        <span className="header__app-name">Zoom Clone</span>
        {
          user && (
            <div className="header__right">
              <img src={user.user_avatar} alt={user.user_email}/>
              <span>Hello, {user.user_full_name}</span>
            </div>
          )
        }
        <span className="header__option" onClick={showCreate}>Create Meeting</span>
        <span className="header__option" onClick={showJoin}>Join Meeting</span>
      </div>
      <span className="header__logout" onClick={logout}><span>Logout</span></span>
    </div>
  );
}

export default Header;