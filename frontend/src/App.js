import MaintenanceServices from './component/MaintenanceServices'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Customers from './component/Customers';
import Customer from './component/Customer';
import Reviews from './component/Reviews';
import Review from './component/Review';
import Requests from './component/Requests';
import Request from './component/Request';
import Login from './component/Login';
import Register from './component/Register';
import NewRequest from './component/NewRequest';
import ServiceType from './component/ServiceType';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Footer from './component/Footer';
function App() {
 
  return (
  
      <BrowserRouter>
    
      <div>
      <Routes>
   
          <Route path="/" element={<MaintenanceServices />} />
          <Route path="/maintanseServices/:phoneNo" element={<MaintenanceServices />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myAccount" element={<Customer />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Reviews/1" element={<Review />} />
          <Route path="/myRequests" element={<Requests />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new_request" element={<NewRequest />} />
          <Route path="/services/:service2" element={<ServiceType />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/home" element={<Home />} />
          <Route path="/footer" element={<Footer />} />
      </Routes>
      </div>

      </BrowserRouter>
    
  );
}

export default App;
