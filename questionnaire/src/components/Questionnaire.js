import React, { useState } from "react";

const Questionnaire = () => {
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [happiness, setHappiness] = useState();
  const [energy, setEnergy] = useState();
  const [hopefullness, setHopefullness] = useState();
  const [hoursSlept, setHours] = useState();

  return (
    <div>
      <form>
        <div>
          <label>Enter your full name: </label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label>Enter your date of birth (mm/dd/yyy): </label>
          <input type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
        <div>
          <label>On a scale from 1-5, how happy do you feel? </label>
          <input type="number" value={happiness} onChange={(e) => setHappiness(e.target.value)} />
        </div>
        <div>
          <label>On a scale from 1-5, how energetic do you feel? </label>
          <input type="number" value={energy} onChange={(e) => setEnergy(e.target.value)} />
        </div>
        <div>
          <label>On a scale from 1-5, how hopeful do you feel about the future? </label>
          <input type="number" value={hopefullness} onChange={(e) => setHopefullness(e.target.value)} />
        </div>
        <div>
          <label>How many hours have you slept last night? </label>
          <input type="number" value={hoursSlept} onChange={(e) => setHours(e.target.value)} />
        </div>
      </form>
    </div>
  );
};

export default Questionnaire;
