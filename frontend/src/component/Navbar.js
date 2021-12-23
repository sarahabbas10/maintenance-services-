import './style.css';
import axios from "axios";
import logo from './imgs/logo2.png';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { useState , useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { removeCustomer } from '../reducers/customer/action';


function Navbar() {

   const navigate = useNavigate();
   const [show, setShow] = useState(false);
   const dispatch = useDispatch();
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const [customer1, setCustomer1] = useState({});

   const state = useSelector((state) => {
      return {
         customer: state.customerReducer.customer,
      }
   })

   const myProfile = (e) => {
      if (state.customer.idCustomer) {
         navigate("/myAccount");
      }
      else navigate("/login")
   }

   const myRequest = (e) => {
      if (state.customer.idCustomer) {
         navigate("/myRequests");
      }
      else navigate("/login")
   }

   const newRequest = (e) => {
      if (state.customer.idCustomer) {
         navigate("/new_request");
      }
      else navigate("/login")
   }

   const registerCustomer = () => {
      navigate("/register");
   }

   const logOut = () => {
      const action = removeCustomer();
      dispatch(action)

   }
   useEffect(() => {
      axios
         .get(`http://localhost:8080/customer/` + state.customer.idCustomer)
         .then((response) => setCustomer1(response.data))
         .catch((error) => console.log(error));
   }, [ state.customer.idCustomer]);

   return (
      <>

         <div id="header" class="header">
            <nav class="navbar navbar-expand-lg navbar-light text-capitalize">
               <div class="container">
                  <img src={logo} className='logoImg' />
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#show-menu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                     <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="show-menu">
                     <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                           <a class="nav-link" href="/Home">Home</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" href="/Home#about">About</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" href="/Home#service">Services</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" href="/Home#wcs">What Clients Say</a>
                        </li>
                        <li class="nav-item">
                           <a class="nav-link" href="/Home#contact">Contact</a>
                        </li>
                        <li class="nav-item">

                           {state.customer.idCustomer ?
                              <a class="nav-link" id="log" href="" onClick={logOut}  >Log Out</a>

                              :


                              <a class="nav-link" id="log" href="" onClick={registerCustomer}  >Login/Register</a>


                           }






                        </li>
                        {state.customer.idCustomer ?
                           <li class="nav-item .search-container">

                              <a class="nav-link" onClick={handleShow} >Welcome {customer1.name}  </a>

                              <Offcanvas show={show} onHide={handleClose}>
                                 <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Close Menu</Offcanvas.Title>
                                 </Offcanvas.Header>
                                 <Offcanvas.Body>

                                    <a class="nav-link" href="#hiw" onClick={newRequest}>New Request</a>
                                    <a class="nav-link" href="#hiw" onClick={myProfile}>My Profile</a>
                                    <a class="nav-link" href="#hiw" onClick={myRequest}>My Request </a>

                                 </Offcanvas.Body>
                              </Offcanvas>


                           </li> : ""}
                     </ul>

                  </div>

               </div>
            </nav>
         </div>
      </>
   )
}
export default Navbar;
