import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() == "" && password.trim() == "" && username.trim() == '') {
      alert("enter username, email &  password");
      return;
    }

    const response = await axios.post('https://ecommerce.dev/api/users/signup',{email,password,username},{ withCredentials: true })
    alert('UserRegistration Sucessful')
    navigate('/login');
  };


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h1 className="text-xl my-3 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up 
        </h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                />
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account yet?{" "}
                <span
                  onClick={() => navigate('/login')}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
