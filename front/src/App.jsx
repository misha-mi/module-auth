import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.sass';
import UsersPage from './pages/users-page/users-page';
import PrivateRoute from './HOC/private-route';
import Nav from './component/nav/nav';
import LoginPage from './pages/login-page/login-page';
import ConfirmPage from './pages/confirm-page/confirm-page';
import RegistrationPage from './pages/registration-page/registration-page';
import ActivatePage from './pages/activate-page/activate-page';
import ChatsPage from './pages/chats-page/chats-page';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app__wrapper">
          <Nav />
          <div className="app__routes">
            <Routes>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="activate" element={<ActivatePage />} />
                <Route path="confirm" element={<ConfirmPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="registration" element={<RegistrationPage />} />
              </Route>
              <Route path="/" element={<PrivateRoute forAuthorized />}>
                <Route path="users" element={<UsersPage />} />
                <Route path="chats" element={<ChatsPage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
