import React,{createContext,useContext,useState} from 'react'

// create a context
const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [isLogin,setIsLogin] = useState("")
    const [loginData,setLoginData] = useState({
        aadharCardNumber:'',
        password:''
    }) 

    const handleLogout =()=>{
        const token = localStorage.getItem('token')
        if(!token){
            alert('Alreadyyy logout')
            setIsLogin(false)
        }else{
        localStorage.removeItem('token');
        alert('Logout doneee')
         setIsLogin(false)
        }
    }

    // handle Login form
    const handleLogin=async(e)=>{
        e.preventDefault();
        // send data to backend
        try{
            const response = await fetch('http://localhost:2005/user/login',{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify(loginData)
            });
            if(response.ok){
                const data = await response.json();
               // console.log(data)
                alert('login done')
                localStorage.setItem('token',data.token)
              
               // window.location.href='http://localhost:5173/user/votingpage'
               setIsLogin(true)
            }
            else{
                alert('Wrong Login details')
                console.log("Wrong login details")
            }
        }catch(err){
            console.log('Error:',err)
        }
       }

       // handle when data changes
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setLoginData(prevState=>({
            ...prevState,[name]:value
        }))
            }

    return (
        <AuthContext.Provider value={{handleLogout,handleLogin,handleChange,isLogin,loginData}}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext}
