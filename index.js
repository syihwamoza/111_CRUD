const express =  require('express');
let mysql = require('mysql2');
const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PerformanceServerTiming, () => {
    console.log(`Server i srunning on port ${port}`);
});

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Binoza2610',
        database: 'mahasiswa',
        port: 3306
    });

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack)
        return;
    }
    console.log('Connected Successfully');
});
app.get('/api/mahasiswa', (req, res) => {
    db.query('SELECT * FROM biodata', (err, results) => {
        if (err) {
            console.error('Error executing query:' + err.stack);
            res.status(500).send('Error excuting query');
            return;
        }
        res.json(results);
    });
});
app.post('/api/mahasiswa', (req, res) => {
    const {nama, alamat, agama } = req.body;

    if (!nama || !alamat || !agama) {
        return res.status(400).json({message: 'Nama, alamat, dan agama harus diisi'});
    }

    db.query(
        'INSERT INTO biodata (nama, alamat, agama) VALUES (?, ?, ?)', 
        [nama, alamat, agama], 
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({message: 'Database Error'});
            }

            res.status(201).json({message: 'User created successfully'});
        }
    );
});
app.put('/api/mahasiswa/:id', (req, res) => {
    const userID = req.params.id;
    const { nama, alamat, agama } = req.body;
    db.query(
        'UPDATE biodata SET nama = ?, alamat = ?, agama = ? WHERE id = ?',
        [nama, alamat, agama, userID],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database Error' });
            }
            res.json({ message: 'User updated successfully' });
        }
    );
});
app.delete('/api/mahasiswa/:id', (req, res) => {
    const userID = req.params.id;
    db.query('DELETE FROM biodata WHERE id = ?', [userID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Database Error' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});
