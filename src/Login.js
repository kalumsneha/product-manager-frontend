import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import Header from './Header'

function Login() {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/')
        }
    }, [])

    async function login() {
        let item = { name, password };

        let result = await fetch("http://18.221.156.168/api/login",
            {
                method: 'POST',
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            }
        );
        if ("Error: Username or Password is incorrect") {
            navigate('/login');

        }
        result = await result.json();
        localStorage.setItem("user-info", JSON.stringify(result));
        let user = JSON.parse(localStorage.getItem('user-info'))
        if (user.name || user.password) {
            navigate('/');
        }
        else {
            navigate('/login');
            alert('Username or Password is Incorrect')
            localStorage.clear()
        }
    }
    return (
        <div>
            <Header />
            <div className="col-sm-6 offset-sm-3">
                <h2 style={{marginTop:25}}>Log In</h2>
                <br />
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Username</p>
                <input type="text" placeholder={"Username"} onChange={(e) => setName(e.target.value)} className="form-control" />
                <br />
                <p align='left' style={{ paddingLeft: 10, fontWeight: "bold" }}>Password</p>
                <input type="password" placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                <br />
                <button onClick={login} className="btn btn-primary">Log In</button>
            </div>
        </div>


    )
}

export default Login