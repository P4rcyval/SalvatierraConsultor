import pool from './database';

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS contactos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    mensaje TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export const initDb = async () => {
  try {
    await pool.query(createTableQuery);
    console.log('✅ Table "contactos" is ready');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};
