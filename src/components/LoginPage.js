import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../apis/authApi";
import { useNavigate } from "react-router-dom";
import { setIsAdmin, setIsAuthenticated } from "../slices/authSlice";
import {Formik} from "formik";
import * as yup from "yup";

function LoginPage(){

    const [login] = useLoginUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validator = yup.object().shape({
        email: yup.string().email().required('Required'),
        password: yup.string().required('Required')
    });

    const loginHandler = model => {
        login(model).then(result => {
            dispatch(setIsAuthenticated(true));
            dispatch(setIsAdmin(jwtDecode(result.data.token).role === 'admin'));
            localStorage.setItem('token', result.data.token);
            navigate('/');
        }).catch(error => {
            toast.error('Wrong email or password');
        });
    }

    return (
      <div className="login-page min-h-screen bg-blue-400 pt-64">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validateOnBlur
          validationSchema={validator}
          onSubmit={(values) => loginHandler(values)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
          }) => (
            <div className="container mx-auto text-center">
              <div className="px-64">
                <div className="bg-blue-300 p-24 rounded">
                  <h3 className="text-2xl mb-5 text-white">Sign in</h3>
                  {touched.email && errors.email && (
                    <p className="text-sm-left text-red-500 mb-2">
                      {errors.email}
                    </p>
                  )}
                  <p>
                    <input
                      placeholder="Email"
                      type="text"
                      name="email"
                      className="focus:outline-none text-lg p-1 w-100 bg-gray-200 mb-2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </p>
                  {touched.password && errors.password && (
                    <p className="text-sm-left text-red-500 mb-2">
                      {errors.password}
                    </p>
                  )}
                  <p>
                    <input
                      placeholder="Password"
                      type="password"
                      name="password"
                      className="focus:outline-none text-lg p-1 w-100 bg-gray-200 mb-2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </p>
                  <button
                    className="bg-green-500 text-white py-2 px-6 w-100 rounded"
                    disabled={!isValid && !dirty}
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    );
}

export default LoginPage;