import { useState, useEffect } from "react";
import axios from "axios";
import MaintenanceService from './MaintenanceService'
import { useNavigate } from 'react-router-dom';
import './service.css'
import { useSelector } from 'react-redux';
import './maintenanceService.css';

function MaintenanceServices() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  
  const [addNewReview, setAddNewReview] = useState(true);
  const [idMaintenanceService, setIdMaintenanceService] = useState();
  const [idCustomer, setIdCustomer] = useState();
  const [comment, setComment] = useState();
  const [service, setService] = useState();
  

  const state = useSelector((state) => {
    return {
      customer: state.customerReducer.customer,
    }
  })

  const [allMaintenanceServices, setMaintenanceServices] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/maintenanceService")
      .then((response) => setMaintenanceServices(response.data))
      .catch((error) => console.log(error));
    axios
      .get(`http://localhost:8080/review`)
      .then((response) => setReviews(response.data))
      .catch((error) => console.log(error));

  }, [allMaintenanceServices]);



  const log = () => {
    navigate("/login");
  }

  const registerCustomer = () => {
    navigate("/register");
  }

  const logOut = () => {
    navigate("/register");
  }

  const addReview = () => {
    let reviewDiv  = document.getElementById("myDIV");
   
      if (reviewDiv.style.display === "none" && state.customer.idCustomer) {
        reviewDiv.style.display = "block";
        setAddNewReview(true) 
      } else {
        reviewDiv.style.display = "none";
        setAddNewReview(false)
      }
   
  }

  
  function selectOnChange(e) {
    setService(e.target.value)
    allMaintenanceServices.map((e) => {
      if (e.name == service)
        setIdMaintenanceService(e.idService);
    })

    setIdCustomer(state.customer.idCustomer)
  }

  const selectComment = (e) => {
    selectOnChange(e)
    setComment(e.target.value);

  }

  const myRequest = (e) => {
   if(state.customer.idCustomer){
    navigate("/myRequests");  
  }
  else  navigate("/login")

  }

  const newRequest = (e) => {
    if(state.customer.idCustomer){
     navigate("/new_request");  
   }
   else  navigate("/login")
 
   }
   const myProfile = (e) => {
    if(state.customer.idCustomer){
     navigate("/myAccount");  
   }
   else  navigate("/login")
 
   }
   
  
  const addIt = () => {
    console.log("comment: " + comment)
    console.log("idMaintenanceService: " + idMaintenanceService);
    console.log("idCustomer: " + idCustomer);

    if (comment && idMaintenanceService && idCustomer) {

      const review = { comment }
      const newReview = { review, idMaintenanceService, idCustomer }

      fetch("http://localhost:8080/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview)
      }).then(() => {
        console.log("New Review Added")
      })

    }
  }


  return (
    <>
      <button onClick={log}>Login</button>
      <button onClick={registerCustomer}>Register</button>
      <button onClick={logOut}>Logout</button>
      <button onClick={myRequest}>My request</button>
      <button onClick={newRequest}>new request</button>
      <button onClick={myProfile}>My profile</button>
      <div class="py-5 service-24">
        <div class="container">
          <div class="row wrap-service-24">
            <div class="col-lg-3 col-md-6">
              <div class="card rounded card-shadow border-0 mb-4">
                {allMaintenanceServices.map((element) => {
                  return (<MaintenanceService maintenanceService={element} />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div  >
        {reviews ? reviews.map((e) => {
          return (
            <>
            <div class="page-content page-container" id="page-content">
    <div class="padding">
        <div class="row">
            <div class="col-sm-6">
                <div class="list list-row block">
                    <div class="list-item" data-id="19">
    
                        <div class="flex"> {e.customer ? <a href="#" class="item-author text-color" data-abc="true">{e.customer.name}</a>  : ""} 
                            <div class="item-except text-muted text-sm h-1x">comment: {e.comment}</div>
                        </div>
                        
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
</div>
              {/* <div>
                <h1>comment: {e.comment}</h1>
                {e.customer ? <h1>Custmer name:{e.customer.name}</h1> : ""}
                {e.maintenanceService ? <h1>maintenanceService name:{e.maintenanceService.name}</h1> : ""}
              </div> */}
            </>)
        })
          : ""}
        <button onClick={addReview}>Add new review</button>
        <div id="myDIV" style={{display : "none"}}>
          {addNewReview ?

            <div>
              <div class="row mt-3 mx-4">
                <div class="col-12">
                  <label class="order-form-label" for="date-picker-example">Selcet the Maintanance Service</label>
                </div>
                <div class="col-12">
                  <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={selectOnChange}>
                    <option selected>Choose...</option>
                    {allMaintenanceServices.map((element) => {
                      return <option id="op1">{element.name}</option>
                    })}
                  </select>
                </div>
              </div>
              <div class="row mt-3 mx-4">
                <div class="col-12">
                  <label class="order-form-label" for="date-picker-example">comments</label>
                </div>
                <div class="col-12">
                  <textarea class="order-form-input datepicker" placeholder="write you comment here" type="text-area"
                    id="date-picker-example" onChange={selectComment} />
                </div>
              </div>
              <button onClick={addIt}>supmit</button></div>
            : navigate("/login")}
        </div>
      </div>

    
    </>
  )
}
export default MaintenanceServices;


{/* <a onClick={()=>{
   console.log(element.name);
   setService(element.name);
}}>  {/* </a> */} 