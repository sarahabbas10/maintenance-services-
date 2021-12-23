import './service.css'
import axios from "axios";
import { useState, useEffect } from "react";
import ServiceType from './ServiceType';

import { useNavigate } from 'react-router-dom';

function MaintenanceService({ maintenanceService }) {

    const navigate = useNavigate();
    const [service, setService] = useState();
    const [reviews, setReviews] = useState([])
    const [selectService, setSelectService] = useState();

    const go = (e) => {
        setService(maintenanceService.name);
        console.log(service);
    }

    useEffect(() => {
        axios
            .get(`http://localhost:8080/maintenanceService/reviews/` + maintenanceService.name)
            .then((response) => setReviews(response.data))
            .catch((error) => console.log(error));
    }, [maintenanceService]);


    const show = (e) => {
        let reviewDiv  = document.getElementById("myReview");
   
        if (reviewDiv.style.display === "none" && reviews) {
          reviewDiv.style.display = "block";
      
        } else {
          reviewDiv.style.display = "none";
      
        }
        console.log("reviews: " + reviews);
    }


    return (
        <>


            <button onClick={go} class="card-hover py-4 text-center d-block rounded" >
                <span class="bg-success-grediant"> <img _ngcontent-uey-c3="" src={maintenanceService.imgUrl} />                    </span>
                <h6 class="ser-title">{maintenanceService.name}</h6>


            </button>
            <button onClick={show}>show Review </button>
            {reviews ?
                reviews.map((e) => {
                    return (
                        <>
                        <div id="myReview"  style={{display : "none"}}>
                            <h5>{e.comment}</h5>
                            <h5>{e.customer.name}</h5>
                            </div>
                        </>
                    )

                })
                : <h1>no review</h1>}


            {service ? navigate("/services/" + service) : ""}

        </>
    )
}
export default MaintenanceService;
