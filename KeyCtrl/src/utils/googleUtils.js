import GoogleLogin from 'react-google-login'



const responseGoogle = response => {
    console.log(response);
};


const googleBtn = () => {
    return (
        <GoogleLogin
            clientId="568691465172-6a0kbo3t147jc4oi2bfomq8fjcq6cj2k.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin" />
    )
}
