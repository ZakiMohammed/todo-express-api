const express = require('express')
const uuid = require('uuid')

const contacts = require('../data/contacts')

const router = express.Router();

// get all
router.get('/', (req, res) => {
    res.json(contacts);
})

// get single
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const contact = contacts.find(i => i.id === id);

    if (!contact) {
        res.status(404).json();
    }
    res.json(contact);
})

// create
router.post('/', (req, res) => {

    if (!req.body.name || !req.body.number) {
        res.status(400).json();
    }

    const contact = {
        id: uuid.v4(),
        name: req.body.name,
        number: req.body.number
    };

    contacts.push(contact);

    res.json(contact);
})

// update
router.put('/:id', (req, res) => {
    const id = req.params.id;

    if (req.body.id !== req.body.id) {
        res.status(400).json();
    }
    if (!req.body.name || !req.body.number) {
        res.status(400).json();
    }

    const contact = contacts.find(i => i.id === id);

    contact.name = req.body.name;
    contact.number = req.body.number;

    res.json(contact);
})

// delete
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = contacts.findIndex(i => i.id === id);

    if (index === -1) {
        res.status(404).json();
    }
    contacts.splice(index, 1);
    res.json();
})

module.exports = router;
