import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillTelephoneFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsHouseDoorFill } from "react-icons/bs";

import './customer.css'
import Navbar from "./Navbar";
import Footer from "./Footer";
function Customer() {

    const state = useSelector((state) => {
        return {
            customer: state.customerReducer.customer,
        }
    })
    
    axios
        .get(`http://localhost:8080/customer/` + state.customer.idCustomer)
        .then((response) => setCustomer1(response.data))
        .catch((error) => console.log(error));


    const navigate = useNavigate();
    const [customer1, setCustomer1] = useState({});
    const [phoneNo, setphoneNo] = useState();
    const [name, setName] = useState();
    const [password, setpassword] = useState();
    const [address, setAddress] = useState();

    let name1;
    let phoneNo1;
    let password1;
    let address1;

    let n = false;
    let add = false;
    let phone = false;

  






    const changeName = (e) => {
        setName(e.target.value)
        n = true;
    }

    const changeAddress = (e) => {
        setAddress(e.target.value);
        add = true;

    }

    const changePhoneNo = (e) => {
        setphoneNo(e.target.value);
        phone = true;
    }


    const updateInfo = () => {

        setpassword(customer1.password);

        if (n) {
            console.log("name: " + name);
        } else {name1 = customer1.name;
        console.log(name1);
        }
        if (add) {
            console.log("address: " + address);
        } else {
            address1 = customer1.address;
            console.log(address1);
        }
        if (phone) {
            console.log("phoneNo : " + phoneNo);
        } else {
            phoneNo1 = customer1.phoneNo;
            console.log(phoneNo1);
        }



        update()


    }

    const update = () => {

      

        if (!n) {
            setName(name1)
        }
        if (!add) {
            setAddress(address1)
        }
        if (!phone) {
            setphoneNo(phoneNo1)
        }
        console.log("name: " + name);
        console.log("address:" + address);
        console.log("phoneNo:" + phoneNo);
        console.log("password:" + password);

        
        let customer2 = { name, phoneNo, password, address }

        console.log(customer2);
        fetch(`http://localhost:8080/customer/` + state.customer.idCustomer, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customer2)
        }).then(() => {
            console.log("Update it")
        })



    }



    return (

        <>
            <Navbar />
            {state.customer.idCustomer ?
                <div class="wrapper" style={{ backgroundImage: `url("https://fullcirclehomecare.com/wp-content/uploads/2016/07/Handyman-Repairs.jpg")` }}>
                    <div class="inner">
                        <form action="">
                            <h3>Profile information</h3>
                            <div class="form-group">
                                <div class="form-wrapper">
                                    <label for=""><BsFillPersonFill /> Name</label>
                                    <div class="form-holder">
                                        <input type="text" class="form-control" placeholder={customer1.name} onChange={changeName} />
                                    </div>
                                </div>
                                <div class="form-wrapper">
                                    <label for=""><BsFillTelephoneFill /> phone number</label>
                                    <div class="form-holder">

                                        <input type="text" class="form-control" placeholder={customer1.phoneNo} onChange={changePhoneNo} />
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="form-wrapper">
                                    <label for=""><BsHouseDoorFill /> Address</label>
                                    <input type="text" class="form-control" placeholder={customer1.address} onChange={changeAddress} />
                                </div>

                            </div>
                            <div class="form-end">
                                <div class="button-holder">
                                    <button type="button" onClick={updateInfo}>Save Profile</button>
                                </div>

                            </div>
                        </form>
                    </div>
                </div>

                : navigate("/")}

            <Footer />
        </>
    )
}
export default Customer;

