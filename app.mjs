import express from 'express';
import { connectDB } from './src/config/dbConfig.mjs';
import superHeroRoutes from './src/routes/superHeroRoutes.mjs';
import path from "path";
import methodOverride from 'method-override';
import dotenv from "dotenv";
import cors from 'cors';
import SuperHeroRepository from './src/repositories/SuperHeroRepository.mjs';
import { cargarSuperHeroes } from './src/services/superheroesService.mjs'; 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// 🔹 Configuración de CORS//CORS sirve para 
app.use(cors({
  origin: ['http://localhost:5173', 'https://tu-frontend-en-render.onrender.com'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

async function startServer() {
    try {
        // Conectar a la DB
        await connectDB();

        // Si no hay superheroes cargados en la DB, inicializarlos
        const count = await SuperHeroRepository.contar();
        if (count === 0) {
            await cargarSuperHeroes();
        }

        // Middlewares adicionales
        app.use(express.urlencoded({ extended: true }));
        app.use(methodOverride('_method'));
        app.use(express.static(path.join(process.cwd(), "public")));

        // Rutas API (backend puro)
        app.use('/api', superHeroRoutes);

        // Ruta raíz (mensaje de bienvenida)
        app.get('/', (req, res) => {
            res.json({ message: 'Bienvenido al backend de Superhéroes 🦸‍♂️' });
        });

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
    }
}

startServer();
