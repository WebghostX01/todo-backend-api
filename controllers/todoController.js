import Todo from '../models/Todo.js';

const createTodo = async(req, res) => {
    try {
    const { title, description, status, dueDate } = req.body;
    const todo = new Todo({
        title,
        description,
        status,
        dueDate,
        user: req.user.id
    });
    await todo.save();
    res.status(201).json({ message: 'Todo created successfully' });
} catch (error) {
    res.status(500).json({ message: 'Server error' });
}}

const getTodos = async(req, res) => {
    try {
    const { title, status } = req.query;
    const filter = { user: req.user.id };
    if (status) filter.status = status;
    if (title) filter.title = { $regex: title, $options: 'i' };
    const todos = await Todo.find(filter);
    res.status(200).json(todos);
} catch (error) {
    res.status(500).json({ message: 'Server error' });
}}

const updateTodo = async(req, res) => {
    try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    const todo = await Todo.findByIdAndUpdate({ _id: id, user: req.user.id }, { title, description, status, dueDate }, { new: true });
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo updated successfully' });
} catch (error) {
    res.status(500).json({ message: 'Server error' });
}}

const deleteTodo = async(req, res) => {
    try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete({ _id: id, user: req.user.id });
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo deleted successfully' });
} catch (error) {
    res.status(500).json({ message: 'Server error' });
}}

const completeTodo = async(req, res) => {
    try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate({ _id: id, user: req.user.id }, { status: 'completed' }, { new: true });
    if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Todo marked as completed' });
} catch (error) {
    res.status(500).json({ message: 'Server error' });
}}

export { createTodo, getTodos, updateTodo, deleteTodo, completeTodo };