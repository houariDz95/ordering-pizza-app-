import styles from '../styles/Login.module.css';
import {useState} from 'react';
import {useRouter} from 'next/router';
import {BASE_URL} from '../utils';
import axios from 'axios'
const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter()
  const handelClick = async() => {
    try{
      await axios.post(`${BASE_URL}/auth/login`, {username, password});
      router.push('/admine')
    }catch(err){
      console.log(err)
      setError(true);
    }
  }
  return(
    <div className={styles.container}> 
      <div className={styles.wrapper}>
        <h1>Admine Dashboard</h1>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <button className={styles.button} onClick={handelClick}>Login</button>
        {error && <span className={styles.error}>Wrong Credentials!</span> }
      </div>
    </div>
  )
}

export default Login