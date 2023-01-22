import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';

import "./MyProfile.css";

import { get } from "../../utilities";
import { post } from "../../utilities";

const EditMyProfile = (props) => {
    const [classYearFreshman, setClassYearFreshman]=useState(false);
    const [classYearSophomore, setClassYearSophomore]=useState(false);
    const [classYearJunior, setClassYearJunior]=useState(false);
    const [classYearSenior, setClassYearSenior]=useState(false);

    const handleFreshmanChange = (event) => {
        const value=event.target.checked;
        setClassYearFreshman(value);

        // setClassYearFreshman(false)
        setClassYearSophomore(false)
        setClassYearJunior(false)
        setClassYearSenior(false)
    };

    const handleSophomoreChange = (event) => {
        const value=event.target.checked;
        setClassYearSophomore(value);

        setClassYearFreshman(false)
        // setClassYearSophomore(false)
        setClassYearJunior(false)
        setClassYearSenior(false)
    };

    const handleJuniorChange = (event) => {
        const value=event.target.checked;
        setClassYearJunior(value);

        setClassYearFreshman(false)
        setClassYearSophomore(false)
        // setClassYearJunior(false)
        setClassYearSenior(false)
    };

    const handleSeniorChange = (event) => {
        const value=event.target.checked;
        setClassYearSenior(value);

        setClassYearFreshman(false)
        setClassYearSophomore(false)
        setClassYearJunior(false)
        // setClassYearSenior(false)
    };

    const [majorText,setMajorText]=useState("");

    const handleMajorChange = (event) => {
        const value=event.target.value;
        setMajorText(value);
    };

    // Deal with hitting the submit button
    const submitProfileUpdates = () => {
        let classYearText="";

        if (classYearFreshman===true){
            console.log(`Freshman selected`)
            classYearText="Freshman";
        }else if (classYearSophomore===true){
            console.log(`Soph selected`)
            classYearText="Sophomore";
        }else if (classYearJunior===true){
            console.log(`Junior selected`)
            classYearText="Junior";
        }else if (classYearSenior===true){
            console.log(`Senior selected`)
            classYearText="Senior";
        }

        const body = {
            user_googleid: props.user_googleid,
            classYear:classYearText,
            major:majorText,
        };

        console.log(`This is the body being posted: ${JSON.stringify(body)}`)

        post("/api/updateUser", body).then((user) => {
            props.set_classYear(classYearText);
            props.set_major(majorText);
        });

        setClassYearFreshman(false);
        setClassYearSophomore(false);
        setClassYearJunior(false);
        setClassYearSenior(false);
        setMajorText("");
    };

    let masterModal = null;
    if (props.user_googleid && props.user_name){
        masterModal=<>
            <h1>Edit My Profile</h1>

            <span className="u-bold">Class Year:</span>
            <input className="u-margin-left-m" type="radio" name="classYear" value="Freshman" checked={classYearFreshman} onChange={handleFreshmanChange}/> <span className="u-colorPrimary">Freshman</span>
            <input className="u-margin-left-m" type="radio" name="classYear" value="Sophomore" checked={classYearSophomore} onChange={handleSophomoreChange}/> <span className="u-colorPrimary">Sophomore</span>
            <input className="u-margin-left-m" type="radio" name="classYear" value="Junior" checked={classYearJunior} onChange={handleJuniorChange}/> <span className="u-colorPrimary">Junior</span>
            <input className="u-margin-left-m" type="radio" name="classYear" value="Senior" checked={classYearSenior} onChange={handleSeniorChange}/> <span className="u-colorPrimary">Senior</span>

            <br></br><br></br>
            <span className="u-bold">Major:</span>
            <input className="u-margin-left-m" type="text" value={majorText} onChange={handleMajorChange} />

            <br></br><br></br>
            <Button className="u-backgroundColorPrimary u-marginLeft-m" onClick={submitProfileUpdates}>Submit Edits!</Button>
        </>
    }else{
        masterModal=<>
        <h1>Edit My Profile</h1>
        <h4>Please login to Google with an @mit.edu email first!</h4>
        </>
    }

    return (
        <>{masterModal}</>
    );
};

export default EditMyProfile;
