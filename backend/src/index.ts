import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { initDb } from './config/initDb';
import pool from './config/database';

console.log(`📡 Env loaded: ${process.env.DB_NAME ? 'OK' : 'FAIL'}`);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.post('/api/contacto', async (req: Request, res: Response) => {
  const { nombre, apellido, email, telefono, mensaje } = req.body;

  // Basic validation
  if (!nombre || !apellido || !email || !telefono || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const query = `
      INSERT INTO contactos (nombre, apellido, email, telefono, mensaje)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [nombre, apellido, email, telefono, mensaje];
    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'Contacto guardado con éxito',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Error saving contact:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const startServer = async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
