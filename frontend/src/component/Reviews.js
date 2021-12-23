import { useState, useEffect } from "react";
import axios from "axios";
import Review from "./Review";

function Reviews(){
   
    const [allReviews ,setallReviews] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8080/review")
          .then((response) => setallReviews(response.data))
          .catch((error) => console.log(error));
      
      },[allReviews]);

    //   console.log(allReviews);
return(
    <>
      {allReviews.map((element)=>{
       return(
          <Review

          review={element}
         
          />
        )
        })} 
    </>
)
}
export default Reviews;