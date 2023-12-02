import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.sass';
import TeachersPage from './pages/teachers-page/teachers-page';
import PrivateRoute from './HOC/private-route';
import Nav from './component/nav/nav';
import LoginPage from './pages/login-page/login-page';
import ConfirmPage from './pages/confirm-page/confirm-page';
import RegistrationPage from './pages/registration-page/registration-page';
import ActivatePage from './pages/activate-page/activate-page';
import ChatsPage from './pages/chats-page/chats-page';
import FilesPage from './pages/files-page/files-page';
import ProfilePage from './pages/profile-page/profile-page';
import AdminPage from './pages/admin-page/admin-page';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app__wrapper">
          <Nav />
          <div className="app__routes">
            <Routes>
              <Route path="/" element={<PrivateRoute forAuthorized={true} />}>
                <Route path="/" element={<TeachersPage />} />
                <Route path="chats" element={<ChatsPage />} />
                <Route path="/files" element={<FilesPage />} />
                <Route path="/profile/:id" element={<ProfilePage isOwner={false} />} />
                <Route path="/my-profile" element={<ProfilePage isOwner={true} />} />
                <Route path="/admin" element={<AdminPage />} />
              </Route>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="activate" element={<ActivatePage />} />
                <Route path="confirm" element={<ConfirmPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="registration" element={<RegistrationPage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
