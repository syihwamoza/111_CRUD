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

