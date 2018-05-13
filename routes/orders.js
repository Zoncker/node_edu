var express = require('express');
var router = express.Router();
var model = require('../models/index');

router.get('/pages/:page', function (req, res) {

    let limit = 20;
    let offset = 0;

    model.Order.findAndCountAll()
        .then((data) => {
            let page = req.params.page;
            let pages = Math.ceil(data.count / limit);
            offset = limit * (page - 1);


    model.Order.findAll({
        limit: limit,
        offset: offset,
        $sort: { id: 1 }
    })
        .then(orders => res.json({
            error: false,
            data: orders,
            count: data.count,
            pages: pages
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
        })
});

router.get('/:id', function (req, res) {
    model.Order.findById(req.params.id)
        .then(order => res.json({
            error: false,
            data: order
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));

})

router.post('/', function (req, res) {
    const { title, description, price } = req.body;

    model.Order.create({
        title: title,
        description: description,
        price: price
        })
        .then(order => res.status(201).json({
            error: false,
            data: order,
            message: 'order created.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});

router.put('/:id', function (req, res) {

    const order_id = req.params.id;
    const { title, description, price } = req.body;

    model.Order.update({
        title: title,
        description: description,
        price: price
        }, {
            where: {
                id: order_id
            }
        })
        .then(order => res.status(201).json({
            error: false,
            message: 'order updated'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});

router.delete('/:id', function (req, res) {
    const order_id = req.params.id;

    model.Order.destroy({ where: {
        id: order_id
        }})
        .then(status => res.status(201).json({
            error: false,
            message: 'order deleted'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});

module.exports = router;