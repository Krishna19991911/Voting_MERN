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
            });

            if (response.ok) {
                // const data = await response.json();
                // console.log('Success:', data);
               
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
        <div>
            <h1>Signup Page</h1>
            <form>
                Name <input type="text" name="name" value={formData.name} onChange={handleChange}></input> <br/> <br/>
                Age <input type="text" name="age" value={formData.age} onChange={handleChange}></input><br/> <br/>
                Email <input type="email" name="email" value={formData.email} onChange={handleChange}></input><br/> <br/>
                Address <input type="text" name="address" value={formData.address} onChange={handleChange}></input><br/> <br/>
                AadharCardNumber <input type="text" name="aadharCardNumber" value={formData.aadharCardNumber} onChange={handleChange}></input><br/> <br/>
                Password <input type="password" name="password" value={formData.password} onChange={handleChange}></input><br/> <br/>
                Role (voter/admin) <input type="text" name="role" value={formData.role} onChange={handleChange}></input><br/> <br/>
                <button onClick={handleSubmit}>Submit</button>
                <button>
                    
                <NavLink to="/">Back to Home page</NavLink>
                </button>
            </form>
        </div>
    )
}

export default Signup
