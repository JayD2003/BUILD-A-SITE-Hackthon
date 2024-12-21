const express = require('express');
const app = express();
const PORT = 3000; // You can change the port if needed

// Basic route to test the server
app.get('/', (req, res) => {
    res.send('Server is running! 🚀');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
