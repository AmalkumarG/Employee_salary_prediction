import React, { useState, useEffect } from "react";

import { CirclesWithBar } from  'react-loader-spinner'

function App() {
  const [height,setHeight]=useState(window.innerHeight)
  const [data, setData] = useState({});
  const [experience, setExperience] = useState(null);
  const [tscore, setTscore] = useState(null);
  const [iscore, setIscore] = useState(null);
  const [predicted, setPredicted] = useState(0);
  const [loader,setLoader]=useState(false)
  return (
    <div className="d-flex align-items-center justify-content-center  flex-column" style={{height:height}}>
  <div>
  {loader?<div style={{position:"relative"}}>


<CirclesWithBar
      
  height="100%"
  width="100%"
  color="#00d4ff"
  wrapperStyle={{position:"absolute",zIndex:"200"}}
  wrapperClass=""
  visible={true}
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  ariaLabel='circles-with-bar-loading'
/>
</div>:""}

 <h1 className="text-light">Salary Prediction</h1>
      <div class="card mt-3" style={{ width: "18rem" }}>
        <div class="card-body">
          <h5 class="card-title text-center" style={{color:"#090979"}}>Predict Employee Salary</h5>
          <div class="input-group mb-3 mt-3">
            <input
              type="text"
              class="form-control"
              placeholder="Experience"
              aria-describedby="basic-addon1"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Test_score"
              aria-describedby="basic-addon1"
              value={tscore}
              onChange={(e) => setTscore(e.target.value)}
              required
            />
          </div>
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Interview_score"
              aria-describedby="basic-addon1"
              value={iscore}
              onChange={(e) => setIscore(e.target.value)}
              required
            />
          </div>
          <div class="d-grid gap-2 col-6 mx-auto">
            <button
              class="btn btn-info"
              type="button"
              disabled={
                experience == null || iscore == null || tscore == null
                  ? true
                  : false
              }
              onClick={() => {
                setLoader(true)
                fetch("http://localhost:5000/predict", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ data: [experience, tscore, iscore] }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setLoader(false)
                    setPredicted(data.predicted)});
              }}
            >
              Predict
            </button>
          </div>
        </div>
      </div>
      {predicted ? (
        <h4 className="mt-4" style={{color:"#090979"}}>Predicted salary is : {predicted}</h4>
      ) : (
        ""
      )}
  </div>
     
    </div>
  );
}

export default App;
