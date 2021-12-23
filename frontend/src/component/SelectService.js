import './newRequest.css'
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';


function SelectService({ selectMaintenanceService }) {
    const state = useSelector((state) => {
        return {
            customer: state.customerReducer.customer,
        }
    })

    const [idCustomer, setIdCustomer] = useState();
    const [idServiceType, setIdServiceType] = useState();
    const [services, setServices] = useState([]);
    const [selcetService, setSelcetService] = useState();
    const [service, setService] = useState({});
    const [comment, setComment] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [requestState, setRequestState] = useState();
    const [service_enrolled, setService_enrolled] = useState([]);


    useEffect(() => {
        console.log(selectMaintenanceService);
        axios
            .get(`http://localhost:8080/maintenanceService/service/` + selectMaintenanceService)
            .then((response) => setServices(response.data))
            .catch((error) => console.log(error));

        if (selcetService) {
            axios
                .get(`http://localhost:8080/serviceType/` + selcetService)
                .then((response) => setIdServiceType(response.data.idServiceType))
                .catch((error) => console.log(error));
        }

    }, [selectMaintenanceService, selcetService]);

    function selectServiceType(e) {
        console.log(e.target.value);
        setSelcetService(e.target.value);

    }

    const selectDate = (e) => {
        setDate(e.target.value);

    }

    const selectTime = (e) => {
        setTime(e.target.value);
        setRequestState("done");
        setIdCustomer(state.customer.idCustomer)

    }

    const selectComment = (e) => {
        setComment(e.target.value);

    }
    let request = {};
    const clickBtn = (e) => {


        console.log("idServiceType: " + idServiceType);
        console.log("requestState: " + requestState);
        console.log("date: " + date);
        console.log("time: " + time);
        console.log("idCustomer: " + idCustomer);
        console.log("comment: " + comment);
        console.log("idServiceType: " + idServiceType);

        if (requestState && date && time && comment && idCustomer & idServiceType) {
            request = { requestState, date, time, comment };

            console.log(request);
            console.log("date: " + date);
            console.log("time: " + time);
            console.log("Comment: " + comment);
            console.log("reguest:" + request);
            console.log("idCustomer: " + idCustomer);
            console.log("idServiceType:" + idServiceType);

            e.preventDefault()
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
    }




    return (
        
        <>
     
   
            <div class="form-holder">
           
                <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" required onChange={selectServiceType} style={{"width":"50%" ,"float":"left" }}>
                    <option selected>Choose...</option>
                    {services ? services.map((element) => {
                        return <option id="op1">{element.name}</option>
                    }) : ""}
                </select>
            </div>
            <br/><br/> <br/>
            <div class="form-wrapper">
                <label >Selcet the time to recive servises</label>
                <div class="form-holder">
                    <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={selectTime} style={{"width":"80%" ,"float":"left" }}>
                        <option selected>Choose...</option>
                        <option >10 am </option>
                        <option >11 am</option>
                        <option >1 pm </option>
                        <option >2 pm</option>
                        <option >3 pm </option>
                        <option >4 pm</option>
                        <option >5 pm </option>
                        <option >6 pm</option>
                        <option >7 pm </option>
                        <option >8 pm</option>
                        <option >9 pm </option>
                        <option >10 pm</option>
                    </select>
                </div>
            </div>
            <br/><br/> <br/> <br/>
            <div class="form-wrapper">
           
                <label >Date</label>
                <div class="form-holder">
                    <input class="order-form-input datepicker" placeholder="Selected date" type="date"
                        id="date-picker-example" onChange={selectDate}  style={{"width":"145%" ,"float":"left" }}/>
                </div>
            </div>
            <br/><br/> <br/> <br/> 
            <div class="form-wrapper">
                <label for="">comments</label>
                <div class="form-holder">
                    <textarea class="order-form-input datepicker" placeholder="write you comment here" type="text-area"
                        id="date-picker-example" onChange={selectComment} style={{"width":"115%" ,"float":"left" }}/>
                </div>
            </div>
            <div class="button-holder">
                <button onClick={clickBtn}  style={{ "border": "0px solid #39758f  ", "border-radius": "8px" }}>Confirm Request</button>
            </div>
        </>
    )
}
export default SelectService;
