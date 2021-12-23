import './newRequest.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import SelectService from './SelectService';
import {AiTwotoneHome} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function NewRequest() {
    const navigate = useNavigate();


    const state = useSelector((state) => {
        return {
            customer: state.customerReducer.customer,
        }
    })
    const [maintenanceService, setMaintenanceService] = useState([]);
    const [idCustomer, setIdCustomer] = useState();
    const [idServiceType, setIdServiceType] = useState();
    const [selectMaintenanceService, setSelectMaintenanceService] = useState()
    const [comment, setComment] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [requestState, setRequestState] = useState();
    const [request, setRequest] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8080/maintenanceService`)
            .then((response) => setMaintenanceService(response.data))
            .catch((error) => console.log(error));

    }, [maintenanceService]);


    function selectMaintananceService(e) {
        console.log(e.target.value);
        setSelectMaintenanceService(e.target.value)

    }

    function selectServiceType(e) {
        selectMaintananceService()
        console.log(e.target.value);
        setSelcetService(e.target.value);

    }

    const selectDate = (e) => {
        setDate(e.target.value);
    }

    const selectTime = (e) => {
        setTime(e.target.value);
        setRequestState("done");
    }

    const selectComment = (e) => {
        setComment(e.target.value);
        setIdCustomer(state.customer.idCustomer)
    }

    const clickBtn = (e) => {
        const r = { requestState, date, time, comment };
        setRequest(r);
        console.log(r);

        console.log("date: " + date);
        console.log("time: " + time);
        console.log("Comment: " + comment);
        console.log("reguest:" + request);
        console.log("idCustomer: " + idCustomer);
        console.log("idServiceType:" + idServiceType);

        if (request && idCustomer && idServiceType) {
            const confiermRequest = { request, idCustomer, idServiceType }

            console.log(confiermRequest)

            fetch("http://localhost:8080/request/newRequest", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(confiermRequest)
            }).then(() => {
                console.log("New Request Added")
            })
        }
        console.log("not added");
    }




    return (
        <>

            <div class="wrapper" style={{ backgroundImage: `url("http://hirecentury.ca/blog/wp-content/uploads/2017/08/44132482_m-703x467.jpg")` }}>
                <div class="inner" >
                <button id="homeIcon" onClick={()=>{navigate("/home")}}  style={{ "position": "absolute" , "top":" 8px","left": "26px","border": "0px solid #39758f  ", "border-radius": "8px" }}><AiTwotoneHome/> Home page</button>
	
                    <form  action="" >
                        <h3>New Request Form</h3>
                        <br />
                        <div class="form-wrapper">
                            <label for="">Selcet the Maintanance Service</label>
                            <div class="form-holder">
                                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={selectMaintananceService} style={{"width":"73%" ,"float":"left" }}>
                                    <option selected>Choose...</option>
                                    {maintenanceService.map((element) => {
                                        return <option id="op1">{element.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <br/><br/> <br/>
                        <div class="form-wrapper">
                            <label for="">Selcet the spisific Service</label>
                            <div class="form-holder">
                                {selectMaintenanceService ? <SelectService selectMaintenanceService={selectMaintenanceService} /> :

                                    <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                        <option selected>Choose...</option>

                                    </select>
                                }
                            </div>
                        </div>

                    </form>

                </div>
            </div>


        </>
    )
} export default NewRequest;