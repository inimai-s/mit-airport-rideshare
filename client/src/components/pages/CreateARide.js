import React, { useState, useEffect } from "react";

// import { NewStory } from "../modules/NewPostInput.js";

// import { get } from "../../utilities";

const CreateARide = (props) => {
  // const [stories, setStories] = useState([]);

  // // called when the "Feed" component "mounts", i.e.
  // // when it shows up on screen
  // useEffect(() => {
  //   document.title = "News Feed";
  //   get("/api/stories").then((storyObjs) => {
  //     let reversedStoryObjs = storyObjs.reverse();
  //     setStories(reversedStoryObjs);
  //   });
  // }, []);

  // // this gets called when the user pushes "Submit", so their
  // // post gets added to the screen right away
  // const addNewStory = (storyObj) => {
  //   setStories([storyObj].concat(stories));
  // };

  // let storiesList = null;
  // const hasStories = stories.length !== 0;
  // if (hasStories) {
  //   storiesList = stories.map((storyObj) => (
  //     <Card
  //       key={`Card_${storyObj._id}`}
  //       _id={storyObj._id}
  //       creator_name={storyObj.creator_name}
  //       content={storyObj.content}
  //     />
  //   ));
  // } else {
  //   storiesList = <div>No stories!</div>;
  // }

  // Radio buttons for MIT vs. Logan Airport destination
  const [destinationMIT, setDestinationMIT]=useState(false);
  const [destinationLogan, setDestinationLogan]=useState(false);

  const handleDestinationMITChange = (event) => {
      const value=event.target.checked;
      setDestinationMIT(value)
  };

  const handleDestinationLoganChange = (event) => {
    const value=event.target.checked;
    setDestinationLogan(value)
  };

  // Your MIT Location
  const [mitLocationText,setMitLocationText]=useState("");

  const handleMitLocationChange = (event) => {
      const value=event.target.value;
      setMitLocationText(value);
  };

  // Submit button
  const submitRide = () => {
    // Send stuff to Mongo

    // Clear the form
    setMitLocationText("");
    setDestinationMIT(false);
    setDestinationLogan(false);
  };

  return (
    <>
      {/* <NewStory addNewStory={addNewStory} />
      {storiesList} */}
      <h1>Create A Ride</h1>
      <h4>You will be the "Captain" for this shared ride, and others can join on the "Find a Ride" page.</h4>
      <div>
        <h4>Destination</h4>
        <input type="radio" name="destination" value="mit" checked={destinationMIT} onChange={handleDestinationMITChange}/> MIT
        <input type="radio" name="destination" value="loganAirport" checked={destinationLogan} onChange={handleDestinationLoganChange}/>Logan Airport

        <h4>Your MIT Location</h4>
        <input type="text" value={mitLocationText} onChange={handleMitLocationChange} />
        
        <button onClick={submitRide}>Submit!</button>
      </div>
    </>
  );
};

export default CreateARide;
