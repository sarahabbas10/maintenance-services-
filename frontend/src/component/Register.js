import axios from "axios";
import { useState } from "react";
import './login.css';
import { useNavigate } from 'react-router-dom';
import { addCustomer } from '../reducers/customer/action'
import { useDispatch } from 'react-redux';
import { BsFillPersonFill,BsHouseDoorFill ,BsFileLock2Fill,BsFillTelephoneFill} from "react-icons/bs";
import {AiTwotoneHome} from "react-icons/ai";



function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [phoneNo, setPhoneNo] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [address, setAddress] = useState();


    const clickBtn = (e) => { 
        const customer = { name, phoneNo, password, address }
        const role_id=65
		const newCustomer={customer,role_id}

        axios
        .post("http://localhost:8080/customer",newCustomer)
		.then((response) => {
				console.log(response.data);
				
				//add to redux
				const action = addCustomer({
					idCustomer:response.data.idCustomer,
					phoneNo:response.data.password
				});
				
				dispatch(action)
				navigate("/home");

			})
			.catch((error) =>
				console.log(error));
			 
    }



    return (
        <>
        
        <div class="wrapper" style={{ backgroundImage: `url("https://fullcirclehomecare.com/wp-content/uploads/2016/07/Handyman-Repairs.jpg")`}}>
		 <button id="homeIcon" onClick={()=>{navigate("/home")}}  style={{ "position": "absolute" , "top":" 8px","left": "26px","border": "0px solid #39758f  ", "border-radius": "8px" }}><AiTwotoneHome/> Home page</button>
			<div class="inner" style={{"border": "8px solid #39758f  ", "border-radius": "20px" }}>
			
					<h3>Registration Form</h3>
					<div class="form-group">
						<div class="form-wrapper">
							<label for=""><BsFillPersonFill/> Name</label>
							<div class="form-holder">
						                               
								<input type="text" class="form-control" placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>  
							</div>
						</div>
						<div class="form-wrapper">
							<label for=""><BsFillTelephoneFill/> phone number</label>
							<div class="form-holder">
								
								<input type="text" class="form-control" placeholder="Enter your phone number" onChange={(e) => setPhoneNo(e.target.value)}/>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="form-wrapper">
							<label for=""><BsFileLock2Fill/> Password</label>
							<div class="form-holder">
							
								<input type="password" class="form-control" placeholder="********" onChange={(e) => setPassword(e.target.value)}/>
							</div>
						</div>
						<div class="form-wrapper">
							<label for=""><BsFileLock2Fill/> Repeat Password</label>
							<div class="form-holder">
							
								<input type="password" class="form-control" placeholder="********"/>
							</div>
						</div>
					</div>
					<div class="form-group">
						<div class="form-wrapper">
							<label for=""><BsHouseDoorFill/> Address</label>
                            <input type="text" class="form-control" placeholder="Enter your address" onChange={(e) => setAddress(e.target.value)} />
						</div>
						
					</div>
					<div class="form-end">
						
						<div class="button-holder">
							<button onClick={clickBtn}
							  style={{ "border": "0px solid #39758f  ","border-radius": "8px"}}>Register Now</button>
						</div>
						<div class="button-holder">
							<button onClick={()=>{navigate("/login")}}
							  style={{ "border": "0px solid #39758f  ","border-radius": "8px"}}>Login</button>
						</div>
						
					</div>
			
			</div>
		</div>
           
        </>
    )
}
export default Register;

