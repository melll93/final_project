import React from "react";
import NaverLogin from "../../util/login/NaverLogin";
import Sidebar from "../../components/Sidebar";

const LoginPage = ({ user, setUserInfo }) => {

  return (
    <><Sidebar />
      <div className="center">
        <div className="login">
          <NaverLogin user={user} setUserInfo={setUserInfo} />
        </div>
      </div>
    </>);
};

export default LoginPage;
