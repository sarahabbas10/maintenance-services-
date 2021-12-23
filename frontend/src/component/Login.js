import './login.css';
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { addCustomer, addToken } from '../reducers/customer/action'
import { useSelector, useDispatch } from 'react-redux';
import { BsFileLock2Fill, BsFillTelephoneFill } from "react-icons/bs";
import jwt_decode from "jwt-decode";
import {AiTwotoneHome} from "react-icons/ai";


function Login() {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [phoneNo, setPhoneNo] = useState();
    const [password, setPassword] = useState();
    const state = useSelector((state) => {
        return {
            customer: state.customerReducer.customer,
        }
    })



    const handleChangePhoneNo = (e) => {
        setPhoneNo(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };





    const log = () => {
        const data = {
            phoneNo,
            password,
        };
        console.log(phoneNo, password);

        axios
            .post("http://localhost:8080/login", data)
            .then((response) => {
                console.log(response.data);
                const token = response.data.access_token;
                const decoded = jwt_decode(token);
                console.log(decoded.sub);
                //add to redux
                const action = addCustomer({
                    idCustomer: decoded.id,
                    phoneNo: decoded.sub
                });
                const action2 = addToken(token)

                dispatch(action)
                dispatch(action2)
                navigate("/home");

            })
            .catch((error) =>
                console.log(error));

    }

    return (

        <div className="wrapper" style={{ backgroundImage: `url("https://fullcirclehomecare.com/wp-content/uploads/2016/07/Handyman-Repairs.jpg")` 
        }}>
            <div className="inner" style={{"border": "8px solid #39758f  ", "border-radius": "20px" }}>
            <button id="homeIcon" onClick={()=>{navigate("/home")}} style={{ "position": "absolute" , "top":" 8px","left": "26px","border": "0px solid #39758f  ", "border-radius": "8px" }}><AiTwotoneHome/> Home page</button>
	
                <h3>Login Form</h3>
                <br />
                <div className="form-group">
                    <div className="form-wrapper">
                        <label ><BsFillTelephoneFill /> phone number</label>
                        <div className="form-holder">
                            <input id="user" type="text" className="form-control" placeholder="Enter your phone number" onChange={handleChangePhoneNo} />

                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-wrapper">
                        <label ><BsFileLock2Fill /> Password</label>
                        <div className="form-holder">
                            <input type="password" className="form-control" placeholder="Enter your password" onChange={handleChangePassword} />
                        </div>
                    </div>
                </div>
                <div className="form-end">
                    <div class="button-holder">
                        <button onClick={log}
                            style={{ "border": "0px solid #39758f  ", "border-radius": "8px" }}>Login</button>
                    </div>

                    <div class="button-holder">
                    <button onClick={() => { navigate("/register") }}
                        style={{ "border": "0px solid #39758f  ", "border-radius": "8px" }}>Register Now</button>
                </div>
            </div>

        </div>
               
            </div >
        

    )

}

export default Login;

