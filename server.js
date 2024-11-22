const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swagger');


const productosRoutes = require('./routes/productos');
const categoriasRoutes = require('./routes/categorias');
const detallePedidoRoutes = require('./routes/detallePedido');
const pedidosRoutes = require('./routes/pedidos');
const rolesRoutes = require('./routes/roles');
const usuariosRoutes = require('./routes/usuarios');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/productos', productosRoutes);
app.use('/api/categorias', categoriasRoutes);
app.use('/api/detallePedido', detallePedidoRoutes);
app.use('/api/pedidos', pedidosRoutes);
app.use('/api/roles', rolesRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Documentación disponible en http://localhost:${port}/api-docs`);

});
