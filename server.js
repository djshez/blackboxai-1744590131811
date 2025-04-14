const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const hardware = require('./hardware');

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: err.message || 'An unexpected error occurred'
    });
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API Endpoints
app.post('/api/format', async (req, res) => {
    try {
        const { formatType } = req.body;
        
        if (!formatType || !['FAT16', 'FAT32'].includes(formatType)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid format type. Must be FAT16 or FAT32.'
            });
        }

        await hardware.formatCard(formatType);
        
        res.json({
            status: 'success',
            message: `Successfully formatted card as ${formatType}`
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

app.post('/api/write', async (req, res) => {
    try {
        const { ndmpId } = req.body;
        
        if (!ndmpId || !ndmpId.match(/^[A-Z0-9]{4}$/)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid NDMP ID. Must be 4 alphanumeric characters.'
            });
        }

        await hardware.writeProgram(ndmpId);
        
        res.json({
            status: 'success',
            message: `Successfully wrote NDMP-000-${ndmpId} to card`
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

app.get('/api/status', (req, res) => {
    try {
        const status = hardware.getStatus();
        res.json(status);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Initialize hardware interface
hardware.checkConnection();

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
