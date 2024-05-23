const express = require('express');
const app = express();
const fs = require('fs')
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

const responses = 'responses.txt'

app.post('/api/responses', (req, res) => {
    const { fullName, dateOfBirth, happiness, energy, hopefullness, hoursSlept } = req.body;
    const currentDate = new Date().toISOString().split('T')[0];
    const userInfo = `${fullName},${dateOfBirth},${happiness},${energy},${hopefullness},${hoursSlept},${currentDate}\n`;

    fs.appendFile(responses, userInfo, (err) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        res.json({ message: 'Data saved'})
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});