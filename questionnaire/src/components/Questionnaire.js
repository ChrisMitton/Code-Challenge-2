import React, { useState } from 'react';
import axios from 'axios';

const port = 5000;

const Questionnaire = () => {
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [happiness, setHappiness] = useState();
    const [energy, setEnergy] = useState();
    const [hopefulness, setHopefulness] = useState();
    const [hoursSlept, setHoursSlept] = useState();
    const [comparisonResults, setComparisonResults] = useState(null);    

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`http://localhost:${port}/api/responses`, {
            fullName,
            dateOfBirth,
            happiness,
            energy,
            hopefulness,
            hoursSlept
        });

        const comparisons = await axios.post('http://localhost:5000/api/comparisons', {
            fullName,
            dateOfBirth
        });

        setComparisonResults(comparisons.data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter your full name: </label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                    <label>Enter your date of birth (mm/dd/yyyy): </label>
                    <input type="text" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
                <div>
                    <label>On a scale from 1-5, how happy do you feel? </label>
                    <input type="number" value={happiness} onChange={(e) => setHappiness(e.target.value)} min="1" max="5" />
                </div>
                <div>
                    <label>On a scale from 1-5, how energetic do you feel? </label>
                    <input type="number" value={energy} onChange={(e) => setEnergy(e.target.value)} min="1" max="5" />
                </div>
                <div>
                    <label>On a scale from 1-5, how hopeful do you feel about the future? </label>
                    <input type="number" value={hopefulness} onChange={(e) => setHopefulness(e.target.value)} min="1" max="5" />
                </div>
                <div>
                    <label>How many hours have you slept last night? </label>
                    <input type="number" value={hoursSlept} onChange={(e) => setHoursSlept(e.target.value)} min="0" max="24" />
                </div>
                <button type="submit">Submit</button>
            </form>
            {comparisonResults && (
                <div>
                    <h2>Comparison Results</h2>
                    
                    <p>Happiness today compared to your average happiness: {comparisonResults.userAverages.happiness}</p>
                    <p>Average happiness of people your age: {comparisonResults.ageGroupAverages.happiness}</p>
                    
                    <p>Energy level today compared to your average energy level: {comparisonResults.userAverages.energy}</p>
                    <p>Average energy level of people your age: {comparisonResults.ageGroupAverages.energy}</p>

                    <p>Hopefulness today compared to your average hopefulness: {comparisonResults.userAverages.hopefulness}</p>
                    <p>Average hopefulness of people your age: {comparisonResults.ageGroupAverages.hopefulness}</p>

                    <p>Hours of sleep today compared to your average sleeping hours: {comparisonResults.userAverages.hoursSlept}</p>
                    <p>Average sleeping hours of people your age: {comparisonResults.ageGroupAverages.hoursSlept}</p>
                </div>
            )}
        </div>
    );
};

export default Questionnaire;
