const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.json());

// Set up file upload storage configuration using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the upload folder
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        // Set the file name to avoid conflicts
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Letsdoit!', 
    database: 'tyre_shop'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Endpoint to get all tyres
app.get('/tyres', (req, res) => {
    const sql = `SELECT tyre_id, brand_id, category_id, tyre_model, tyre_size, tyre_type, price, stock_quantity, description, 
                CONCAT('http://localhost:5000/uploads/', image_url) AS image_url FROM tyres`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Endpoint to add a new tyre with image
app.post('/tyres', upload.single('image'), (req, res) => {
    const { brand_id, category_id, tyre_model, tyre_size, tyre_type, price, stock_quantity, description } = req.body;
    const image_url = req.file ? req.file.filename : null; // If there's no file, set it to null

    const sql = `INSERT INTO tyres (brand_id, category_id, tyre_model, tyre_size, tyre_type, price, stock_quantity, description, image_url) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [brand_id, category_id, tyre_model, tyre_size, tyre_type, price, stock_quantity, description, image_url], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Tyre added successfully!', tyreId: results.insertId });
    });
});

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
