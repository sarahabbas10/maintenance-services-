import { useState, useEffect } from "react";
import axios from "axios";
import Customer from "./Customer";

function Customers(){
    // console.log("In Customers");
    const [allCustomers ,setallCustomers] = useState([]);
    useEffect(() => {
        axios
          .get("http://localhost:8080/customer")
          .then((response) => setallCustomers(response.data))
           //response.data.items[0].snippet.thumbnails.high.url
          .catch((error) => console.log(error));
      
      },[allCustomers]);

    //   console.log(allCustomers);
return(
    <>
    {allCustomers.map((element)=>{
       return(
          <Customer

          customer={element}
         
          />
        )
        })} 
    </>
)
}
export default Customers;