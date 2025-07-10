import {useContext, useState} from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { UserDetailsContainer } from '../context/UserDetailsContext';

const LoginPage=()=>{
    const{userName,setUserName,password,setPassword} = useContext(UserDetailsContainer)
    const [errorMessage, setErrorMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const navigate=useNavigate()
    const jwtToken=Cookies.get('jwt_token')
    

    if(jwtToken!==undefined){
        return <Navigate to="/" replace/>
    }
    const onUsernameChange=(e)=>{
        setUserName(e.target.value)
    }  
    const onPasswordChange=(e)=>{
        setPassword(e.target.value)
    }
    const displayErrorMessage = (message) => {
        setErrorMessage(message);
    }
    const handleSubmit=async(event)=>{
        event.preventDefault()
        const url="https://apis.ccbp.in/login"
        const details={
            "username": userName,
            "password": password
        }
        const options={
            method:"POST",
            body:JSON.stringify(details),
        }
        const response=await fetch(url,options)
        const data=await response.json()
        if (response.ok === true) {
            Cookies.set('jwt_token', data.jwt_token,)
            navigate('/',{replace:true})
        }
        else{
            setUserName('');
            setPassword('');
            displayErrorMessage(data.error_msg);
            setIsError(true);
        }
    }

  return (
    <div className="bg-[url(https://res.cloudinary.com/deukqrxtt/image/upload/v1751608926/8ccaf66f19edc15e3aa6b6a1301fd6667bf2509e_f5iy0d.jpg)] w-screen h-screen bg-cover">
      <h1 className="text-red-600 text-4xl font-bold flex justify-start items-start pt-8 pl-10">MOVIES</h1>
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="bg-black bg-gray-800/90 p-10 rounded-lg shadow-lg text-white w-1/3 min-h-[350px] flex flex-col items-center justify-center">
          <form className="flex flex-col  justify-center w-full" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold flex justify-center">Login</h1>
            <label htmlFor="username" className="login-label">USERNAME</label>
            <input
              type="text"
              id="username"
              name="username"
              className="bg-gray-800 text-white  border-1 p-1 rounded-md"
              placeholder="Username"
              onChange={onUsernameChange}
              value={userName}
              required
            />

            <label htmlFor="password" className="login-label mt-4">PASSWORD</label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-800 text-white login-input border-1 p-1 rounded-md"
              placeholder="Password"
              onChange={onPasswordChange}
              value={password}
              
              required
            />

            <button type="submit" className="bg-red-600 text-white p-2 rounded-md mt-3">Login</button>
            {isError && <p className='error-message mt-2'>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
export default LoginPage