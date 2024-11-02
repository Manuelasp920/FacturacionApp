const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Ejemplo de almacenamiento en memoria (usualmente se usaría una base de datos)
let clients = [];
let products = [];
let invoices = [];

// Endpoint de autenticación
app.post('/auth/login', (req, res) => {
    const { username, password } = req.body;
    // Aquí debería ir la lógica de autenticación
    res.status(200).json({ message: "Autenticación satisfactoria" });
});

// Gestión de clientes
app.get('/clients', (req, res) => res.json(clients));
app.post('/clients', (req, res) => {
    clients.push(req.body);
    res.status(201).json(req.body);
});
app.get('/clients/:id', (req, res) => {
    const client = clients.find(c => c.id === parseInt(req.params.id));
    if (client) return res.json(client);
    res.status(404).json({ error: "Cliente no encontrado" });
});
app.put('/clients/:id', (req, res) => {
    const index = clients.findIndex(c => c.id === parseInt(req.params.id));
    if (index > -1) {
        clients[index] = req.body;
        return res.json(req.body);
    }
    res.status(404).json({ error: "Cliente no encontrado" });
});
app.delete('/clients/:id', (req, res) => {
    clients = clients.filter(c => c.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Similarmente, puedes implementar los productos y facturas...

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
