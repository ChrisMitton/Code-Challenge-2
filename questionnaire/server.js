const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const dataFile = 'responses.txt';

const ageGroups = {
    '0-10': { min: 0, max: 10 },
    '11-15': { min: 11, max: 15 },
    '16-21': { min: 16, max: 21 },
    '22-30': { min: 22, max: 30 },
    '31-40': { min: 31, max: 40 },
    '41-50': { min: 41, max: 50 },
    '55-70': { min: 55, max: 70 },
    '71-infinity': { min: 71, max: Infinity }
};

// Save data for a user
app.post('/api/responses', (req, res) => {
    const { fullName, dateOfBirth, happiness, energy, hopefulness, hoursSlept } = req.body;
    const currentDate = new Date().toISOString().split('T')[0];
    const responseData = `${fullName},${dateOfBirth},${happiness},${energy},${hopefulness},${hoursSlept},${currentDate}\n`;

    fs.appendFile(dataFile, responseData, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Data saved' });
    });
});

// Get comparison information
app.post('/api/comparisons', (req, res) => {
    const { fullName, dateOfBirth } = req.body;

    fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const responses = parseFileContents(data);

        const userResponses = responses.filter(r => r.name === fullName && r.resDateOfBirth === dateOfBirth);
        const ageGroupResponses = responses.filter(r => r.resDateOfBirth === dateOfBirth);

        const userAverages = getAverages(userResponses);
        const ageGroupAverages = getAverages(ageGroupResponses);

        res.json({ userAverages, ageGroupAverages });
    });
});

// Get age group summary information
app.get('/api/ageGroupSummary', (req, res) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const responses = parseFileContents(data);
        const ageGroupSummary = {};

        Object.keys(ageGroups).forEach(group => {
            const { min, max } = ageGroups[group];
            const groupResponses = responses.filter(r => {
                const age = getAge(r.resDateOfBirth);
                return age >= min && age <= max;
            });
            ageGroupSummary[group] = getAverages(groupResponses);
        });

        res.json(ageGroupSummary);
    });
});

function parseFileContents(data) {
    return data.trim().split('\n').map(line => {
        const [name, resDateOfBirth, happiness, energy, hopefulness, hoursSlept, date] = line.split(',');
        return {
            name,
            resDateOfBirth,
            happiness: parseInt(happiness),
            energy: parseInt(energy),
            hopefulness: parseInt(hopefulness),
            hoursSlept: parseFloat(hoursSlept),
            date
        };
    });
}

function getAverages(responses) {
    const averages = { happiness: 0, energy: 0, hopefulness: 0, hoursSlept: 0 };

    if (responses.length === 0) {
        return averages;
    }

    responses.forEach(response => {
        averages.happiness += response.happiness;
        averages.energy += response.energy;
        averages.hopefulness += response.hopefulness;
        averages.hoursSlept += response.hoursSlept;
    });

    averages.happiness /= responses.length;
    averages.energy /= responses.length;
    averages.hopefulness /= responses.length;
    averages.hoursSlept /= responses.length;

    return averages;
}

function getAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const isBirthdayThisYear = today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate();
    const isBeforeBirthMonthThisYear = today.getMonth() < birthDate.getMonth();

    if (isBeforeBirthMonthThisYear || isBirthdayThisYear) {
        age--;
    }

    return age;
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
