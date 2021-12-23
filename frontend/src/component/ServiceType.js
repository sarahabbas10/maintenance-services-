import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import { useSelector } from 'react-redux';
import './services.css';
import Footer from "./Footer";

function ServiceType() {

    const navigate = useNavigate();

    const state = useSelector((state) => {
        return {
            customer: state.customerReducer.customer,
        }
    })

    const { service2 } = useParams()

    const [serviceTypes, setServiceTypes] = useState([])

    useEffect(() => {
        axios
            .get(`http://localhost:8080/maintenanceService/service/` + service2)
            .then((response) => setServiceTypes(response.data))
            .catch((error) => console.log(error));

    }, [service2]);



    const newRequest = () => {
        if (state.customer.idCustomer) {
            navigate("/new_request");
        }
        else navigate("/login")
    }


    return (
        <>
            <Navbar />
            <br /><br />

            <div class="row">

                {serviceTypes.map((e) => {
                    return (

                        <div class="col-sm-3">
                            <div class="card card-block">
                                <img class="card-img-top" data-src="holder.js/100px180/" alt="100%x180" src={e.imgUrl} data-holder-rendered="true" />
                                <div class="card-block">
                                    <br />
                                    <h4 class="card-title">{e.name}</h4>
                                    <button className="btn-card" onClick={newRequest}>Request this service</button>

                                </div>
                            </div>
                        </div>

                    )
                })}

            </div>
            <br /><br /> <br /><br /> <br /><br /> <br /><br />
            <Footer />
        </>
    )
}
export default ServiceType;
