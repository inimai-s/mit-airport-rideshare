import React, { useState, useEffect } from "react";
import Card from "../modules/Card.js";

import { get } from "../../utilities";
import { post } from "../../utilities";

import { Link } from "@reach/router";

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FindARide = (props) => {
  // console.log(`In FindARide.js. props: ${JSON.stringify(props)}`);

  useEffect(() => {
    post("/api/setRideCardActivity").then(() => {
      // do nothing
    })
  },[]);

  const [activeRides, setActiveRides] = useState([]);

  //modal states and functions------------------
  const [destinationMIT, setDestinationMIT]=useState(false);
  const [destinationLogan, setDestinationLogan]=useState(false);

  const handleDestinationMITChange = (event) => {
    const value=event.target.checked;
    setDestinationMIT(value)
    setDestinationLogan(!value)
  };

  const handleDestinationLoganChange = (event) => {
    const value=event.target.checked;
    setDestinationLogan(value)
    setDestinationMIT(!value)
  };

  const [startDate, setStartDate] = useState("");
  const handleStartDateChange=(event)=>{
    const value = event.target.value;
    setStartDate(value);
  }

  const [endDate, setEndDate] = useState("");
  const handleEndDateChange=(event)=>{
    const value = event.target.value;
    setEndDate(value);
  }

  const [startTime, setStartTime] = useState("");
  const handleStartTimeChange=(event)=>{
    const value = event.target.value;
    setStartTime(value);
  }

  const [endTime, setEndTime] = useState("");
  const handleEndTimeChange=(event)=>{
    const value = event.target.value;
    setEndTime(value);
  }

  const [freshmanBox, setFreshmanBox] = useState(false);
  const handleFreshmanBoxChange=(event)=>{
    const value=event.target.checked;
    setFreshmanBox(value);
  }

  const [sophomoreBox, setSophomoreBox] = useState(false);
  const handleSophomoreBox=(event)=>{
    const value=event.target.checked;
    setSophomoreBox(value);
  }

  const [juniorBox, setJuniorBox] = useState(false);
  const handleJuniorBox=(event)=>{
    const value=event.target.checked;
    setJuniorBox(value);
  }

  const [seniorBox, setSeniorBox] = useState(false);
  const handleSeniorBox=(event)=>{
    const value=event.target.checked;
    setSeniorBox(value);
  }
  //------------------------------------------------

  // called when the "Feed" component "mounts", i.e.
  // when it shows up on screen
  // console.log(`props.classYear outside useEffect: ${props.classYear}`);
  useEffect(() => {
    const query = {
      user_googleid: props.user_googleid,
      classYear: props.classYear,
    };

    // console.log(`query, outside GET request: ${JSON.stringify(query)}`);
    // console.log(`props.classYear ${props.classYear}`);

    get("/api/activeRides", query).then((rideObjs) => {
      // console.log(`query: ${JSON.stringify(query)}`);
      // console.log(`QUERY`);
      let reversedRideObjs = rideObjs.reverse();
      setActiveRides(reversedRideObjs);
    });
  }, [props.user_googleid, props.classYear]);

  let ridesList = null;
  const hasRides = activeRides.length !== 0;
  if (hasRides) {
    ridesList = activeRides.map((rideObj) => (
      <Card
        key={`Card_${rideObj._id}`}
        _id={rideObj._id}
        user_name={rideObj.user_name}
        user_googleid={rideObj.user_googleid}
        photoLink={rideObj.photoLink}
        classYear={rideObj.classYear}
        destination={rideObj.destination}
        meetup_location={rideObj.meetup_location}
        start_date={rideObj.start_date}
        start_time={rideObj.start_time}
        end_date={rideObj.end_date}
        end_time={rideObj.end_time}
        maxPeople={rideObj.maxPeople}
        extra_ride_info={rideObj.extra_ride_info}
        user_googleId_joined={rideObj.user_googleId_joined}
        freshman_box={rideObj.freshman_box}
        sophomore_box={rideObj.sophomore_box}
        junior_box={rideObj.junior_box}
        senior_box={rideObj.senior_box}
        my_googleid={props.user_googleid}
        my_user_name={props.user_name}
      />
    ));
  } else {
    ridesList = <div><br></br><span class="u-bold">No rides that meet your preferences are available yet, feel free to create one now!</span></div>;
  }

  let stringDestination="";
  if (destinationMIT===true) {
    stringDestination="MIT";
  }
  else if (destinationLogan===true){
    stringDestination="Logan Airport";
  }
  
  const body = {
    destination: stringDestination,
    start_date: startDate,
    start_time: startTime,
    end_date: endDate,
    end_time: endTime,
    freshman_box: freshmanBox,
    sophomore_box: sophomoreBox,
    junior_box: juniorBox,
    senior_box: seniorBox,
    user_googleid: props.user_googleid,
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleSave = () => {
    if ((startDate==="" && endDate!=="") && (startTime==="" && endTime==="")) {
      alert("Please input start date and end date or start date only to filter by date.");
      return;
    }
    else if (((startTime==="" && endTime!=="") || (startTime!=="" && endTime==="")) && startDate==="") {
      alert("Please input start time and end time to filter by time intervals.");
      return;
    }
    else if (startDate!=="" && startTime!=="" && endDate!=="" && endTime!=="") {
      let ride_start_ms = new Date(startDate.concat(" ").concat(startTime));
      let ride_end_ms = new Date(endDate.concat(" ").concat(endTime));
      if (ride_start_ms>ride_end_ms){
        alert("Invalid time interval.");
        return;
      }
    }
    setShow(false);
    get("/api/filterRides",body).then((rideObjs) => {
    let reversedRideObjs = rideObjs.reverse();
      setActiveRides(reversedRideObjs);
    });
  };
  const handleShow = () => setShow(true);
  const handleClear=()=>{
    setDestinationMIT(false);
    setDestinationLogan(false);
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setFreshmanBox(false);
    setSophomoreBox(false);
    setJuniorBox(false);
    setSeniorBox(false);

    get("/api/activeRides", {user_googleid: props.user_googleid, classYear: props.classYear}).then((rideObjs) => {
      let reversedRideObjs = rideObjs.reverse();
      setActiveRides(reversedRideObjs);
    });
  };

  let masterModal = null;

  let updateProfileModal = null;

  const [showProfileModal, setShowProfileModal] = useState(true);

  const handleCloseProfileModal = () => setShowProfileModal(false);

  const handleGoToEditProfile = () => {
    setShowProfileModal(false);
    location.replace("/editMyProfile/");
  };

  if (props.user_googleid && props.user_name){
    masterModal=<>
      <h1>Find A Ride</h1>
      
      <Button className="u-backgroundColorPrimary" onClick={handleShow}>
        Filter Rides
      </Button>
      <br></br><br></br>

      <span className="u-margin-right-m">Can't find a ride that fits your schedule?</span>
      <Button variant="info" className="u-backgroundColorMedBlue"><Link to="/createARide/" className="u-noTextDecoration"><span className="u-colorWhite">Create your own ride!</span></Link></Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Filter Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span className="u-bold">Destination: </span>
          <input className="u-margin-left-m" type="radio" name="destination" value="mit" checked={destinationMIT} onChange={handleDestinationMITChange}/><span className="u-colorPrimary u-margin-left-xs">MIT</span>
          <input className="u-margin-left-m" type="radio" name="destination" value="loganAirport" checked={destinationLogan} onChange={handleDestinationLoganChange}/><span className="u-colorPrimary u-margin-left-xs">Logan Airport</span>

          <br></br><br></br>

          <span className="u-bold">Departure Start Date/Time:</span>
          <input className="u-margin-left-m" type="date" value={startDate} onChange={handleStartDateChange}/>
          <input type="time" value={startTime} onChange={handleStartTimeChange} />

          <br></br><br></br>

          <span className="u-bold">Departure End Date/Time:</span>
          <input className="u-margin-left-m" type="date" value={endDate} onChange={handleEndDateChange}/>
          <input type="time" value={endTime} onChange={handleEndTimeChange} />

          <br></br><br></br>

          <span className="u-bold">Ride Captain class year:</span>
          <input className="u-margin-left-m" type="checkbox" checked={freshmanBox} onChange={handleFreshmanBoxChange} />
          <span className="u-colorPrimary u-margin-left-xs">Freshman</span>
          <input className="u-margin-left-m" type="checkbox" checked={sophomoreBox} onChange={handleSophomoreBox} />
          <span className="u-colorPrimary u-margin-left-xs">Sophomore</span>
          <input className="u-margin-left-m" type="checkbox" checked={juniorBox} onChange={handleJuniorBox} />
          <span className="u-colorPrimary u-margin-left-xs">Junior</span>
          <input className="u-margin-left-m" type="checkbox" checked={seniorBox} onChange={handleSeniorBox} />
          <span className="u-colorPrimary u-margin-left-xs">Senior</span>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
            Clear Preferences
          </Button>
          
          <Button className="u-backgroundColorPrimary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {ridesList}
    </>

    if(props.classYear === "" || props.classYear === "Unknown") {
      updateProfileModal = <>
      <Modal show={showProfileModal} onHide={handleCloseProfileModal}>
        <Modal.Header>
          <Modal.Title>Please fill in your Class Year!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Different rides will be displayed/available for you depending on your class year.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleGoToEditProfile}>
            Edit Profile
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    }
  }else{
    masterModal=<>
      <h1>Find A Ride</h1>
      <h4>Please login to Google with an @mit.edu email first!</h4>
    </>
  }

  return (
    <>
      <Container className="u-marginTopPage u-marginBottomPage">{masterModal}</Container>
      {updateProfileModal}
    </>
  );
};

export default FindARide;
