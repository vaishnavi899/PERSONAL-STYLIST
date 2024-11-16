import { GoogleLogin } from 'react-google-login';

const ClientID ="693879798659-k4sfauutj22aglmgln18l9srmotdn8i6.apps.googleusercontent.com";

function Login(){

  const onSuccess = (res) =>{
    console.log("Logined successfully");
  }

  const onFailure = (res) =>{
    console.log("Login Failed");
  }

  return(
    <div id ="signInButton">
      <GoogleLogin
          clientId={ClientID}
          buttonText='Login'
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true} 

      />

    </div>

  )
}
export default Login;