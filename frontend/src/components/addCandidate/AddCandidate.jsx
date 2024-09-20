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
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:2005/candidate',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify(formData)
            });
            if(response.ok){
                alert('Candidate Added Successfully')
                window.location.href='http://localhost:5173/user/vote';
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
                
    <p className="font-bold text-center">ADD CANDIDATE ...</p>
<div className="flex justify-center items-center mt-5 ">
    <div className="text-center w-3/12 border border-zinc-600 rounded-md h-auto mb-3">
    <div className="flex font-bold mb-5 bg-blue-600 h-14 items-center justify-center rounded-md text-white">Add Candidate</div> 
    <div>
        <form className="flex flex-col">
<input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} className="m-4 h-8 border border-slate-300 rounded-md p-4" ></input>
<input type="text" placeholder="Party Name"  name="party" value={formData.party} onChange={handleChange} className="m-4 h-8 border border-slate-300 rounded-md p-4" ></input>
<input type="text" placeholder="Age"  name="age" value={formData.age} onChange={handleChange} className="m-4 h-8 border border-slate-300 rounded-md p-4" ></input>
<div className="items-center">
<button className="bg-orange-600 hover:bg-orange-400 text-white w-32 mt-3 rounded-xl h-12 mb-5 text-lg" onClick={handleSubmit}>Add</button> </div>
        </form>
    </div>
    </div>
</div>

           
        </div>
         
    )
}

export default AddCandidate
