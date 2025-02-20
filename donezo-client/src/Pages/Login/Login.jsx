import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const Login = () => {
    const {googleLogin} = useAuth()
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || "/";

    const handleGoogleSignIn = async () => {
        try {
          //User Registration using google
          await googleLogin();
          navigate(from, { replace: true });
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (err) {
          console.log(err);
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${err.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      };

    return (
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          {/* <FcGoogl size={32} /> */}

          <p>Continue with Google</p>
        </div>
    );
};

export default Login;