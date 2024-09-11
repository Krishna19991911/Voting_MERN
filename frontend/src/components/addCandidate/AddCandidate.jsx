import React,{useState} from 'react'

function AddCandidate() {
    const [formData,setFormData] = useState({
        name:'',
        age:'',
        party:''
    })

    // handle form data
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData(prevState=>({
            ...prevState,[name]:value
        }))
    }

    // handle form submission
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:2005/candidate',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData)
            });
            if(response.ok){
                setFormData({
                    name:'',
                    age:'',
                    party:''
                })
                alert('Candidate Added Successfully')
            }
            else{
                console.log('Failed to add Candidate')
            }
        }catch(err){
            console.log('Error:',err)
        }
    }
    return (
        <div>
            <h1> Add Candidates</h1>
            <form>
                Name:<input type="text" name="name" value ={formData.name} onChange={handleChange} ></input> <br/> <br/>
                Age:<input type="text" name="age" value ={formData.age} onChange={handleChange} ></input> <br/> <br/>
                Party:<input type="text" name="party" value ={formData.party} onChange={handleChange} ></input> <br/> <br/>
                <button onClick={handleSubmit}>Submit
                </button>
            </form>
        </div>
    )
}

export default AddCandidate
