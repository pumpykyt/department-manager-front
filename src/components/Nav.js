import { useDispatch, useSelector } from "react-redux";
import { setIsAdmin, setIsAuthenticated } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import logoImg from '../images/logo.png';

const Nav = props => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logout = () => {
        localStorage.clear();
        dispatch(setIsAuthenticated(false));
        dispatch(setIsAdmin(false));
        navigate('/');
    }

    return(
        <div className="nav w-full fixed bg-violet-600 z-50">
            <div className="flex flex-row flex-wrap-nowrap justify-between container mx-auto gap-x-20 items-center py-3">
                <Link to={isAdmin ? '/admin' : '/'} className="hover:text-red-200 m-0 text-white text-lg font-bold flex gap-x-2">
                    <img className="w-5 mx-auto" src={logoImg} alt="Logo image"/>
                    <div>Department Manager</div>
                </Link>
                <div className="flex-1"></div>
                {
                    isAuthenticated && !isAdmin &&
                    <Link to="/my-house" className="hover:text-red-200 m-0 text-white font-light text-lg cursor-pointer">my house</Link>
                }
                {
                    isAuthenticated &&
                    <button onClick={logout} className="hover:text-red-200 m-0 text-white font-light text-lg cursor-pointer">logout</button>
                }
                {
                    !isAuthenticated &&
                    <Link to="/register" className="hover:text-red-200 m-0 text-white font-light text-lg cursor-pointer">register</Link>
                }
                {
                    !isAuthenticated &&
                    <Link to="/login" className="hover:text-red-200 m-0 text-white font-light text-lg cursor-pointer">login</Link>
                }
            </div>
        </div>
    );
};

export default Nav;