import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import Header from './Header'

function Register() {

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/')
        }
    }, [])
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function SignUp() {
        let item = { name, email, password };

        let result = await fetch("http://localhost:8000/api/register",
            {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            }
        );
        if(name && email && password){
            result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result));
        navigate('/login');
        }
        else{
            alert('All fields are Mandatory.')
        }

    }
    return (
        <div>
            <Header />
            <div className="col-sm-6 offset-sm-3">

                <h2 style={{marginTop:25}}>Register</h2>
                <br />
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Username</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder={"Username"} />
                <br />
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Email</p>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder={"Email"} />
                <br />
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Password</p>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder={"Password"} />
                <br />
                <button onClick={SignUp} className="btn btn-primary"> signUp </button>
            </div>

        </div>
    )
}

export default Register