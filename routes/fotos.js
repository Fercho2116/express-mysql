var express = require('express');
var router = express.Router();

//const Sequelize = require('sequelize');
const Foto = require('../models').foto;
const Etiqueta = require('../models').etiqueta;

const { Sequelize, Op } = require('sequelize');

router.get('/findAll/json', function (req, res, next) {

    Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
    }).then(fotos => {
        res.json(fotos);
    })
        .catch(error => res.status(400).send(error))

});

router.get('/findAll/view', function (req, res, next) {
    Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
    })
        .then(fotos => {
            res.render('fotos', { title: 'Fotos', arrFotos: fotos });
        })
        .catch(error => res.status(400).send(error))
});
//una forma de usar el where
router.get('/findAllByRate/json', function (req, res, next) {
    let lower = parseFloat(req.query.lower);
    let higher = parseFloat(req.query.higher);
    Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            calificacion: { [Op.between]: [lower, higher] }
        }
    })
        .then(fotos => {
            res.json(fotos);
        })
        .catch(error =>
            res.status(400).send(error))
});

//otra forma usando el where + id
router.get('/findAllById/:id/json', function (req, res, next) {
    let id = parseInt(req.params.id);
    Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            [Op.and]: [{ id: id }]

        }
    })
        .then(fotos => {
            res.json(fotos);
        })
        .catch(error =>
            res.status(400).send(error))
});

router.get('/buscar', function(req, res, next) {
    res.render('buscar', { title: 'Buscar Foto por ID' });
});

router.get('/view', function (req, res, next) {
    let id = parseInt(req.query.id);
    Foto.findAll({
        attributes: { exclude: ["updatedAt"] },
        include: [{
            model: Etiqueta,
            attributes: ['texto'],
            through: { attributes: [] }
        }],
        where: {
            [Op.and]: [{ id: id }]
        }
    })
    .then(fotos => {
        res.render('foto_id', { title: 'Detalles de la Foto', arrFotos: fotos });
    })
    .catch(error => 
        res.status(400).send(error))
});





module.exports = router;
