import Navbar from './Navbar'
import './style.css'
import axios from "axios";
import slide1 from './imgs/slide1.png'
import about from "./imgs/about.png"
import electrical from './imgs/electrical header.jpg'
import electrical2 from './imgs/elictrical.jpg'
import electronic from './imgs/electronic.jpg'
import air from './imgs/air2.jpg'
import header1 from './imgs/header1.jpg'
import Sterilization from './imgs/Sterilization.png'
import Carousel from 'react-bootstrap/Carousel'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsPersonSquare } from "react-icons/bs";
import { CgComment } from 'react-icons/cg';
import Footer from './Footer';

const Home = () => {

   const navigate = useNavigate();
   const [service, setService] = useState();
   const [addNewReview, setAddNewReview] = useState(true);
   const [reviews, setReviews] = useState([]);
   const [allMaintenanceServices, setMaintenanceServices] = useState([]);
   const [idMaintenanceService, setIdMaintenanceService] = useState();
   const [service2, setService2] = useState();
   const [idCustomer, setIdCustomer] = useState();
   const [comment, setComment] = useState();


   const state = useSelector((state) => {
      return {
         customer: state.customerReducer.customer,
      }
   })


   useEffect(() => {
      axios
         .get("http://localhost:8080/review")
         .then((response) => setReviews(response.data))
         .catch((error) => console.log(error));
      axios
         .get("http://localhost:8080/maintenanceService")
         .then((response) => setMaintenanceServices(response.data))
         .catch((error) => console.log(error));
   }, []);

   const addReview = () => {
      let reviewDiv = document.getElementById("myDIV");

      if (reviewDiv.style.display === "none" && state.customer) {
         reviewDiv.style.display = "block";
         setAddNewReview(true)
      } else {
         reviewDiv.style.display = "none";
         setAddNewReview(false)
      }

   }


   function selectService(e) {
      setService2(e.target.value)
      allMaintenanceServices.map((e) => {
         if (e.name == service2)
            setIdMaintenanceService(e.idService);
      })

      setIdCustomer(state.customer.idCustomer)
   }

   const selectComment = (e) => {
      selectService(e)
      setComment(e.target.value);

   }

   const addIt = () => {
      console.log("comment: " + comment)
      console.log("idMaintenanceService: " + idMaintenanceService);
      console.log("idCustomer: " + idCustomer);
      let reviewDiv = document.getElementById("myDIV");
      let submitReviw = document.getElementById("submitReviw");


      if (comment && idMaintenanceService && idCustomer) {

         const review = { comment }
         const newReview = { review, idMaintenanceService, idCustomer }

         fetch("http://localhost:8080/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newReview)
         }).then(() => {
            console.log("New Review Added")
            reviewDiv.style.display = "none";
            submitReviw.style.display = "block";

         })

      }
   }

   return (
      <>
         <Navbar />
         <div >

            <Carousel>

               <Carousel.Item>
                  <img
                     id="header"
                     className="d-block w-100 "
                     src={slide1}
                     alt="First slide"
                     style={{ "height": 510 }}
                  />
                  <Carousel.Caption>
                     <h2 className='centered'>We love working</h2>
                     <h4 className='centered2'>Maintenance service</h4>

                  </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
                  <img
                     id="header"
                     className="d-block w-100 "
                     src={header1}
                     alt="Second slide"
                     style={{ "height": 510 }}

                  />

                  <Carousel.Caption>
                     <p className='electronicHeader'> Electronic devices</p>

                  </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>

                  <img
                     id="header"
                     className="d-block w-100"
                     src={electrical}
                     alt="Third slide"
                     type="button"
                     onClick={() => { setService("Electrical") }}
                     style={{ "height": 510 }}
                  />

               </Carousel.Item>

            </Carousel>
         </div>
         <div id="about" class="about_section layout_padding">
            <div class="container">
               <div class="row">
                  <div class="col-md-5">
                     <h4>ABOUT QUICK SERVICES</h4>
                     <h3 style={{ "text-transform": "none" }}>We Build for Your Comfort</h3>
                     <p>With regards to your home enhancement extends our skilled workers have the mastery to take care of business and done right. Every single one of our experts has more than ten years of experience and have all experienced intensive individual verification.

                        The group of experts at Quick services of Riyadh is enthusiastic about taking your home enhancement dreams and making them a reality.
                     </p>      </div>
                  <div class="col-md-6 offset-md-1">
                     <div class="full text_align_center">
                        <img class="img-responsive" src={about} alt="#" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="service" class="hiw_section layout_padding">
            <div class="container">
               <div class="row">
                  <div class="col-md-7">
                     <h3>OUR SERVICES</h3>
                  </div>
                  <div class="col-md-5">
                  </div>
               </div>
               <div class="row">
                  <div class="col-md-8 service_blog">
                     <a href="" onClick={() => { setService("Air condition") }}>   <img id="air" class="margin_top_10 img-responsive" src={air} /> </a>
                     <h4 id="1" >Air condition</h4>
                     <br /><br /><br /><br />
                  </div>
                  <a href="" onClick={() => { setService("Electrical") }}>
                     <div class="col-md-8 service_blog">
                        <img class="margin_top_10 img-responsive" src={electrical2} />
                        <h4 id="2" >Electrical</h4>
                        <br /><br /><br /><br />
                     </div>
                  </a>
                  <a href="" onClick={() => { setService("Electronic devices") }} >
                     <div class="col-md-8 service_blog">
                        <img class="margin_top_10 img-responsive" src={electronic} />
                        <h4 id="3" >Elecronic Devices</h4>
                        <br /><br /><br /><br />
                     </div>
                  </a>
                  <a href="" onClick={() => { setService("Sterilization") }} >
                     <div class="col-md-8 service_blog">
                        <img class="margin_top_10 img-responsive" src={Sterilization} />
                        <h4 id="4" >Sterilization</h4>
                        <br /><br /><br /><br />
                     </div>
                  </a>
               </div>
            </div>
         </div>



         <div id="wcs" class="hiw_section layout_padding">
            <div class="container">
               <div class="row">
                  <div class="col-md-12 text_align_center">
                     <h3>Our Client Say</h3>
                  </div>
                  <div class="col-md-5">
                  </div>
               </div>
               {reviews.map((e) => {
                  return (<>
                     <div class="row">
                        <div class="col-md-11">
                           <div class="full testimonial_blog">
                              <p><BsPersonSquare /> {e.customer.name}</p>
                              <p><CgComment /> {e.comment}</p>
                           </div>
                        </div>

                     </div>
                     <br />
                     <br />
                     <br />
                     <br />
                  </>
                  )
               })}
               <div id="submitReviw" class="row" style={{ display: "none" }}>

                  <div class="row">
                     <div class="col-md-11">
                        <div class="full testimonial_blog">
                           <div class="row mt-3 mx-4">
                              <div class="col-12">
                                 <p> Your review added</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>


               <br /><br /><br />
               <button onClick={addReview} className='reviewBtn'>Add review</button>
               <br /><br /><br />
               <div id="myDIV" class="row" style={{ display: "none" }}>
                  {addNewReview ?
                     <div class="row">
                        <div class="col-md-11">
                           <div class="full testimonial_blog">
                              <div class="row mt-3 mx-4">
                                 <div class="col-12">
                                    <label class="order-form-label" for="date-picker-example">Selcet the Maintanance Service</label>
                                 </div>
                                 <div class="col-12">
                                    <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={selectService}>
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
                              <button className='addBtn' type='submit' onClick={addIt} >supmit</button></div>

                        </div>
                     </div>

                     : navigate("/login")}

               </div>
            </div>

         </div>



         {service ? navigate("/services/" + service) : ""}
         <Footer />

      </>
   )
}
export default Home;
