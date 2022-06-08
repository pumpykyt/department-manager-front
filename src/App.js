import 'antd/dist/antd.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import {ToastContainer} from "react-toastify";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './components/HomePage';
import Nav from './components/Nav';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminPanel from './components/AdminPanel';
import ApartmentPanel from './components/ApartmentPanel';
import RulePanel from './components/RulePanel';
import HousePage from './components/HousePage';
import ApartmentPage from './components/ApartmentPage';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  return (
    <div className="app">
      <Router>
      <Nav/>
        <Routes>
          {
            isAuthenticated &&
            <Route exact path="/apartments/:id" element={<ApartmentPage/>}/>
          }
          <Route exact path="/my-house" element={<HousePage/>}/>
          <Route exact path="/" element={<HomePage/>}/>
          {
            !isAuthenticated &&
            <Route exact path="/login" element={<LoginPage/>}/>
          }
          {
            !isAuthenticated &&
            <Route exact path="/register" element={<RegisterPage/>}/>
          }
          {
            isAdmin &&
            <Route exact path="/admin" element={<AdminPanel/>}/>
          }
          {
            isAdmin &&
            <Route exact path="/admin/apartments/panel" element={<ApartmentPanel/>}/>
          }
          {
            isAdmin &&
            <Route exact path="/admin/rules/panel" element={<RulePanel/>}/>
          }
        </Routes>
      </Router>
      <ToastContainer position="top-left" />
    </div>
  );
}

export default App;
