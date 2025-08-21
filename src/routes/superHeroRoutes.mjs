import express from 'express';
import { validarSuperheroe } from "../validations/superheroValidation.mjs";

import {
  obtenerSuperheroePorIdController,
  obtenerSuperheroesJSON,
  
  crearSuperheroeController, 
  actualizarSuperheroeController,
  eliminarSuperheroePorIdController,
} from '../controllers/superheroesController.mjs';

const router = express.Router();

// CRUD Superhéroes
router.get("/superheroes", obtenerSuperheroesJSON); // Obtener todos
router.get("/superheroe/:id", obtenerSuperheroePorIdController); // Obtener por ID

router.post('/superheroe/agregar', validarSuperheroe, crearSuperheroeController); // Crear
router.put('/superheroe/editar/:id', validarSuperheroe, actualizarSuperheroeController); // Actualizar
router.delete('/superheroe/:id', eliminarSuperheroePorIdController); // Eliminar por ID

export default router;
