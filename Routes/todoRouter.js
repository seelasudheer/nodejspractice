const express=require('express')
const router=express.Router()
const todo=require('../Contollers/TodoController')


router.post('/saveTodo',todo.addTodoSave)
router.get('/getTodo',todo.getList)
router.post('/updateTodo',todo.updateTodo)

module.exports=router