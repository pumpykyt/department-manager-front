import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "../apis/authApi";
import { useNavigate } from "react-router-dom";
import { setIsAdmin, setIsAuthenticated } from "../slices/authSlice";
import {Formik} from "formik";
import * as yup from "yup";

function RegisterPage(){

    const [register] = useRegisterUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validator = yup.object().shape({
        email: yup.string().email().required('Required'),
        fullName: yup.string().required('Required'),
        password: yup.string().required('Required')
    });

    const registerHandler = model => {
        register(model).then(result => {
            dispatch(setIsAuthenticated(true));
            dispatch(setIsAdmin(jwtDecode(result.data.token).role === 'admin'));
            localStorage.setItem('token', result.data.token);
            if(jwtDecode(result.data.token).role === 'admin'){
              navigate('/admin');
              return;
            }
            navigate('/');
        }).catch(error => {
            toast.error('Server error');
        });
    }

    return (
      <div className="register-page min-h-screen bg-blue-400 pt-64">
        <Formik
          initialValues={{
            email: "",
            fullName: "",
            password: "",
          }}
          validateOnBlur
          validationSchema={validator}
          onSubmit={values => registerHandler(values)}
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
                  <h3 className="text-2xl mb-5 text-white">Sign up</h3>
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
                  {touched.fullName && errors.fullName && (
                    <p className="text-sm-left text-red-500 mb-2">
                      {errors.fullName}
                    </p>
                  )}
                  <p>
                    <input
                      placeholder="Full name"
                      type="fullName"
                      name="fullName"
                      className="focus:outline-none text-lg p-1 w-100 bg-gray-200 mb-2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.fullName}
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

export default RegisterPage;