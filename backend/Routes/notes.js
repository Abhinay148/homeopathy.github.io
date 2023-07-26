const express = require('express')
const router = express.Router()
const fetchuser = require('../Middleware/Fetchuser');
const authuser = require('../Middleware/authuser');
const Notes = require('../Models/Notes')
const { body, validationResult } = require('express-validator');


//Route 1: get all notes by admin
router.get('/fetchnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({})
    res.json(notes)
})


//Route 2: add notes by user
router.post('/addnotes', authuser,

    async (req, res) => {
        try {
            const { name, email, age, gender, doctor, date, time, phone } = req.body
            const note = new Notes({ name, email, age, gender, doctor, date, time, phone, user: req.user.id })
            const savedNote = Notes.create(note)
            res.json(savedNote)

        }
        catch (error) {
            console.log(error.message)
            res.status(500).json('some error occured')
        }
    })

//Route 4: get user note by user
router.get('/fetchusernotes', authuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})

//Route 5: update note by admin
router.put('/updatenote/:noteid', fetchuser, async (req, res) => {
    const newNote = {}
    const notes = await Notes.findById(req.params.noteid)
    const pdf = notes.pdf;
    pdf.push(req.body.pdf)
    newNote.pdf = pdf;
    const updNote = await Notes.findByIdAndUpdate(req.params.noteid, { $set: newNote }, { new: true })
    res.json(updNote)
})

module.exports = router
