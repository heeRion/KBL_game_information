async function createTable() {
  try {
      const connection = await pool.getConnection();
      await connection.query(`
          CREATE TABLE IF NOT EXISTS games (
              id INT AUTO_INCREMENT PRIMARY KEY,
              team1 VARCHAR(255) NOT NULL,
              team2 VARCHAR(255) NOT NULL,
              date DATETIME NOT NULL,
              venue VARCHAR(255) NOT NULL,
              score VARCHAR(10),
              comment TEXT
          )
      `);
  } catch (err) {
      console.error('An error occurred while creating table in MySQL:', err);
  } finally {
      connection.release();
  }
}

app.post('/api/games', async (req, res) => {
  const { team1, team2, date, venue, score, comment } = req.body;

  if (!team1 || !team2 || !date || !venue) {
      return res.status(400).json({ error: 'Required field is missing' });
  }

  let connection;

  try {
      connection = await pool.getConnection();
      await connection.query('INSERT INTO games (team1, team2, date, venue, score, comment) VALUES (?, ?, ?, ?, ?, ?)', [team1, team2, date, venue, score, comment]);
      res.json({ message: 'Game data was successfully inserted' });
  } catch (err) {
      console.error('Error inserting game data into MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      if (connection) {
          connection.release();
      }
  }
});


app.post('/api/some-route', async (req, res) => {
  let connection;

  try {
      console.log('Connecting to MySQL...');
      connection = await pool.getConnection();
      console.log('Connected to MySQL.');

      console.log('Inserting game data into MySQL...');
      await connection.query('INSERT INTO games (team1, team2, date, venue, score, comment) VALUES (?, ?, ?, ?, ?, ?)', [team1, team2, date, venue, score, comment]);
      console.log('Game data inserted successfully.');

      res.json({ message: 'Game data inserted successfully' });
  } catch (err) {
      console.error('Error inserting game data into MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      if (connection) {
          connection.release();
      }
  }
});
