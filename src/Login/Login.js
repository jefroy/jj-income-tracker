import React from 'react'
import GoogleLogin from 'react-google-login';
import './Login.css';

function Login(props) {

  // let responseGoogle=(response)=>{
  //   console.log(response);
  //   console.log(response.profile);
  //   console.log(response.profileObj);
  // }
  function getUserArray(userObj){
      let arr = [];
      // console.log(typeof userObj);
      let keys = Object.keys(userObj);
      keys.forEach(key => {
          arr[key] = userObj[key];
      });
      // console.log(arr);
      return arr;
  }
  const sendData = (response) => {
      props.parentCallBack(getUserArray(response.profileObj));
      // console.log(getUserArray(response.profileObj));
  }

  return (
    <div className="login">
        <div className="login__logo">
            <img src="https://cdn.pixabay.com/photo/2020/01/21/18/39/todo-4783676_960_720.png" alt=""/>
        </div>
        <div className="login__btn">
            <GoogleLogin
                clientId={"235258480463-7emltov5gfotr9iiouka5d0bfshuu450.apps.googleusercontent.com"}
                buttonText={"Login"}
                onSuccess={sendData}
                onFailure={sendData}
                cookiePolicy={'single_host_origin'}
            />
        </div>

    </div>
  )
}

export default Login
