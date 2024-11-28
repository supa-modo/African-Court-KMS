import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BgImage from "../assets/images/african-court-welcome.jpg";
import Logo1 from "../assets/images/AfCHPRLogo AULogoSeal Mockup_English-Color.png";
import Logo2 from "../assets/images/AfCHPRLogo_English-Color.png";
import { FaUser, FaKey } from "react-icons/fa";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    navigate("/home");

    // try {
    //   const success = await login(username, password);

    //   if (success) {
    //     navigate("/home");
    //   } else {
    //     setError(
    //       "Invalid username or password, Check your credentials and try again"
    //     );
    //   }
    // } catch (err) {
    //   setError("An error occurred during login");
    // }
  };

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center bg-no-repeat overflow-hidden font-inter"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Left Section */}
      <div className="absolute inset-0 bg-customGreen bg-opacity-65 clip-left-section z-20 hidden md:block">
        <div className="flex flex-col justify-between h-full">
          <div className="h-[23%] bg-white bg-opacity-[0.82 ] flex flex-col items-center justify-center text-center w-8/12 pr-10 z-15">
            <img src={Logo1} alt="AfCHPR Logo" className="w-[400px]" />
            <p className="mt-3 text-xl font-medium">
              AFRICAN COURT ON HUMAN AND PEOPLE'S RIGHTS
            </p>
            <p className="text-xl font-medium">
              COUR AFRICAINE DES DROITS DE L’HOMME ET DES PEUPLES
            </p>
          </div>
          <div className="text-white text-left pl-10 pb-[12rem] max-w-4xl">
            <h2 className="text-3xl text-yellow-500 font-semibold">Mandate</h2>
            <p className="mt-2 font-semibold pb-4">
              The African Court was established to complement the protective
              mandate of the African Commission on <br /> Human and Peoples’
              Rights (the African Commission – often referred to as the Banjul
              Commission), <br /> which is a quasi-judicial body charged with
              monitoring the implementation of the African Charter. <br /> The
              African Court applies the provisions of the African Charter and
              other human rights instruments ratified <br /> by the States
              concerned.
            </p>
            <h2 className="text-3xl font-semibold pt-14 text-yellow-500">
              Mission
            </h2>
            <p className="mt-2 font-semibold">
              To complement the protective mandate of the African Commission on
              Human and Peoples’ Rights by <br /> strengthening the human rights
              protection system in Africa and ensuring respect for and
              compliance with <br /> the African Charter, as well as other
              international human rights instruments, through judicial
              decisions.
            </p>
            <div className="flex">
              <button className="mt-20 py-4 px-14 ml-14 font-semibold text-sm bg-gray-500 text-white rounded-md">
                Browse Public Files
              </button>
              <p className="mt-[6rem] ml-4 text-yellow-500">
                No login required
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="absolute inset-0 bg-customGray bg-opacity-[0.82] md:bg-opacity-75 md:clip-right-section flex items-center justify-center md:justify-end z-10">
        <div className="flex flex-col justify-end items-center md:items-end  md:pt-[7rem] px-6 md:pr-[8rem]">
          <div className="w-full max-w-lg">
            <img
              src={Logo2}
              alt="AfCHPR Logo-2"
              className="w-80 md:w-[420px] items-center"
            />
            <h2 className="mt-6 text-center md:text-left text-5xl md:text-7xl text-white font-extrabold">
              Login to your Account
            </h2>
            <p className="text-white text-center md:text-left mt-4">
              Enter your login credentials below to continue
            </p>
            {error && (
              <div className="mr-6 bg-red-100 border border-red-400 text-red-700 text-xs md:text-sm px-3 py-2 rounded relative">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative mt-3 pr-6">
                <FaUser
                  className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white text-opacity-80"
                  size={25}
                />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Your Username"
                  className="pl-20 py-4 border-2 border-white bg-transparent text-white placeholder-white placeholder-opacity-70 rounded-[1rem] w-full"
                  value={username}
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="relative mt-4 pr-6">
                <FaKey
                  className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white text-opacity-80"
                  size={25}
                />
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="pl-20 py-4 border-2 border-white bg-transparent text-white placeholder-white placeholder-opacity-70 rounded-[1rem] w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <p className="mt-4 pr-6 text-right w-full text-yellow-500">
                Forgot Password?
              </p>

              <div className="text-center">
                <button
                  className={`mt-3 text-center justify-center py-4 font-semibold text-sm bg-customMaroon text-white  rounded-xl w-[45%] ${
                    loading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Logging in....." : "Login"}
                </button>
              </div>
            </form>
            <p className="mt-2 text-white text-center">
              Don’t have an account?{" "}
              <a href="/create-account" className="text-yellow-500">
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
