import React from 'react'
import GoogleLogin from 'react-google-login';

function Login() {

  let responseGoogle=(response)=>{
    console.log(response);
    console.log(response.profile);
    console.log(response.profileObj);
  }

  return (
    <div className="login">
      <GoogleLogin
          clientId={"235258480463-7emltov5gfotr9iiouka5d0bfshuu450.apps.googleusercontent.com"}
          buttonText={"Login"}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Login
