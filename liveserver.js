const path = require('path');
const express = require('express');
const app = require('express')();
const PORT = 2727 || process.env.port

// app
app.use('/', express.static(__dirname))

app.listen(PORT, '0.0.0.0', () => {
	console.log('[Lysent.js] live server on port ' + PORT)
})