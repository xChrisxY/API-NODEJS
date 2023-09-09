const express = require('express')
const routes = express.Router()
// const bodyParser = require('body-parser');

// routes.use(bodyParser.urlencoded({ extended: true }));
// routes.use(bodyParser.json());
routes.get('/productos/:id_producto', (req, res) => {

    const id_producto = req.params.id_producto;

    req.getConnection((error, connect) => {

        if (error) return res.send(error);

        connect.query('SELECT * FROM productos where id_producto = ?', [id_producto], (error, rows) => {

            if (error) return res.send(error);

            res.json(rows);

        })

    })

});

routes.get('/clientes/:id_cliente', (req, res) => {

    const id_cliente = req.params.id_cliente;

    req.getConnection((error, connect) => {

        if (error) return res.send(error);

        connect.query('SELECT * FROM clientes where id_cliente = ?', [id_cliente], (error, rows) => {

            if (error) return res.send(error);

            res.json(rows);

        })

    })

});

// Aquí estamos agregando un producto
routes.post('/meterProductos', (req, res) => {

    req.getConnection((error, connect) => {

        if (error) return res.send(error);

        connect.query('INSERT INTO productos set ?', [req.body], (error, rows) => {

            if (error) return res.send(error);

            res.send('producto agregado');
        })

    })

})

// Aquí estamos agregando un cliente
routes.post('/meterClientes', (req, res) => {

    req.getConnection((error, connect) => {

        if (error) return res.send(error);

        connect.query('INSERT INTO clientes set ?', [req.body], (error, rows) => {

            if (error) return res.send(error);

            res.send('cliente agregado');
        })

    })

});

// Modificar producto
routes.put('/modificarProducto', (req, res) => {

    const { id_producto, precio, cantidad_en_stock, nombre } = req.body;

    const values = [nombre, precio, cantidad_en_stock, id_producto];


    req.getConnection((error, connect) => {

        if (error) return res.send(error);

        const query = 'UPDATE productos set nombre = ?, precio = ?, cantidad_en_stock = ? WHERE id_producto = ?;'

        connect.query(query, values, (error, rows) => {

            if (error) return res.send(error);

            res.send('Producto actualizado');

        })

    })

});

// Modificar cliente
routes.put('/modificarCliente/', (req, res) => {

    const { id_cliente, nombre, apellido_paterno, apellido_materno, email } = req.body;

    const values = [nombre, apellido_paterno, apellido_materno, email, id_cliente];


    console.log(values)

    req.getConnection((error, connect) => {

        if (error) return res.send(error);

        const query = 'UPDATE clientes set nombre = ?, apellido_paterno = ?, apellido_materno = ?,email = ? WHERE id_cliente = ?;'

        connect.query(query, values, (error, rows) => {

            if (error) return res.send(error);

            res.send('Cliente actualizado');

        })

    })

});

// Eliminar producto
routes.delete('/eliminarProducto/:id_producto', (req, res) => {

    req.getConnection((error, connect) => {

        if (error) return res.send(error);

        connect.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id_producto], (error, rows) => {

            if (error) return res.send(error);

            res.send('El producto ha sido eliminado');

        })

    })

});

// Eliminar cliente
routes.delete('/eliminarCliente/:id_cliente', (req, res) => {

    console.log(req.params.id_cliente)

    req.getConnection((error, connect) => {

        if (error) return res.send(error);

        connect.query('DELETE FROM clientes WHERE id_cliente = ?', [req.params.id_cliente], (error, rows) => {

            if (error) return res.send(error);

            res.send('El cliente ha sido eliminado');

        })

    })

});



module.exports = routes
