function Request({request}){

   console.log(request);
return(
    <>
    <div>
        <h1>
         comment:   {request.comment}
        </h1>
        <h1>
          State:  {request.state}
        </h1>
        <h1>
           day: {request.date}
        </h1>
        <h1>
           Time: {request.time}
        </h1>
        <h1>
            {request.service_enrolled.map((e,i)=>{
                return <h4>Service {i+1}: {e.name}</h4>
            })}
        </h1>

    </div>
    </>
)
}
export default Request;