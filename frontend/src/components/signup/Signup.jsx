import React,{useState} from 'react'

import {Link,NavLink,useNavigate} from 'react-router-dom'


function Signup(){

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        address: '',
        aadharCardNumber: '',
        password: '',
        role: ''
    });

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page
        //console.log('Submitting form........');

        // Send data to backend
        try {
            const response = await fetch('http://localhost:2005/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData), // Convert form data to JSON
            })
            
            const data = await response.json();

            if (response.ok) {
                // console.log('Success:', data);
                if(data.token){
                    localStorage.setItem('token',data.token)
                    console.log("Token saved")
                }
               
                // setFormData({
                //     name: '',
                //     age: '',
                //     email: '',
                //     address: '',
                //     aadharCardNumber: '',
                //     password: '',
                //     role: ''
                // })
                alert('Signup successful!');
                window.location.href='http://localhost:5173/user/login';
            } else {
                console.log('Failed to submit form.');
                alert('Error occurred during signup.');
            }
        } catch (error) {
            console.error('Error:', error);
             
            // setFormData({
            //     name: '',
            //     age: '',
            //     email: '',
            //     address: '',
            //     aadharCardNumber: '',
            //     password: '',
            //     role: ''
            // })
            alert('Error occurred during signup.');
        }
    };
    return (
        <div className="m-5">
            <p className="font-bold text-center">Register With Us...</p>
            <div className="flex justify-center items-center mt-5 ">
            <div className="text-center w-3/12 border border-zinc-300 rounded-md h-auto snap-y ">
                 <div className="flex font-bold mb-5 bg-blue-600 h-14 items-center justify-center rounded-md text-white">SIGN UP</div> 
                 <div className="">
                      <form className="flex flex-col ">
                     <input type="text" placeholder="Name" name="name" className="m-4 h-8 border border-slate-300 rounded-md p-4" value={formData.name} onChange={handleChange}></input>
                     <input type="text" placeholder="Age" name="age" className="m-4 h-8 border border-slate-300 rounded-md p-4" value={formData.age} onChange={handleChange}></input>
                     <input type="text" placeholder="Address" name="address" className="m-4 h-8 border border-slate-300 rounded-md p-4" value={formData.address} onChange={handleChange}></input>
                     <input type="text" placeholder="Aadhar Card Number" name="aadharCardNumber" className="m-4 h-8 border border-slate-300 rounded-md p-4" value={formData.aadharCardNumber} onChange={handleChange}></input>
                     <input type="text" placeholder="Password" name="password" className="m-4 h-8 border border-slate-300 rounded-md p-4" value={formData.password} onChange={handleChange}></input>
                     <input type="text" placeholder="Role(admin/voter)" name="role" className="m-4 h-8 border border-slate-300 rounded-md p-4" value={formData.role} onChange={handleChange}></input>
                  <div className="items-center">   <button className="bg-orange-600 hover:bg-orange-400 text-white w-32 mt-3 rounded-xl h-12 mb-5" onClick={handleSubmit}>Submit</button> </div>
                
                     </form></div>

            </div> 
            </div>
            
        </div>
    )
}

export default Signup
