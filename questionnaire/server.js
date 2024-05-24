const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const dataFile = 'responses.txt';

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

        const responses = data.trim().split('\n').map(line => {
            const [name, resDateOfBirth, happiness, energy, hopefulness, hoursSlept, date] = line.split(',');
            return { name, resDateOfBirth, happiness: parseInt(happiness), energy: parseInt(energy), hopefulness: parseInt(hopefulness), hoursSlept: parseFloat(hoursSlept), date };
        });

        const userResponses = responses.filter(r => r.name === fullName && r.resDateOfBirth === dateOfBirth);
        const ageGroupResponses = responses.filter(r => r.resDateOfBirth === dateOfBirth);

        const userAverages = getAverages(userResponses);
        const ageGroupAverages = getAverages(ageGroupResponses);

        res.json({ userAverages, ageGroupAverages });
    });
});

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
