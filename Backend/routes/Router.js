const express = require('express') ;
const router = express.Router() ;
const Expense = require('../models/schema') ;

//Add an expense
router.post('/' , async(req , res) => {
    try {
        const newExpense = await Expense(req.body) ;
        const expense = newExpense.save() ;
        res.status(201).json(expense) ;
    } catch (error) {
        res.status(500).json(error) ;
    }
});

//Update an expense
router.put('/:id' , async(req , res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id ,
            {$set : req.body} ,
            {new : true}
        );
        res.status(201).json(expense) ;
    } catch (error) {
        res.status(500).json(error) ;
    }
});

//Get all expenses
router.get('/' , async(req , res) => {
    try {
        const expense = await Expense.find().sort({createdAt:-1}) ;
        res.status(200).json(expense) ;
    } catch (error) {
        res.status(500).json(error) ;
    }
});

//Delete an expense
router.delete('/:id' , async(req , res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id)
        res.status(200).json('Successfully deleted') ;
    } catch (error) {
        res.status(500).json(error) ;
    }
});

module.exports = router ;