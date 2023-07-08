import { Request, Response } from 'express';
import Todo from '../models/todoModel';
import { getFromCache, setToCache } from '../services/redisServices';

export const getAllTodos = async (_req: Request, res: Response): Promise<void> => {
  try {
    const cachedTodos = await getFromCache('todos');
    if (cachedTodos) {
      res.json(JSON.parse(cachedTodos));
      return;
    }
    const todos = await Todo.find();
    await setToCache('todos', JSON.stringify(todos));
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching todos' });
  }
};

export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
    });
    const savedTodo = await newTodo.save();
    // Invalidate the cached todos
    await setToCache('todos', '');
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating a todo' });
  }
};

export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const cachedTodo = await getFromCache(`todo:${id}`);
    if (cachedTodo) {
      res.json(JSON.parse(cachedTodo));
      return;
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    await setToCache(`todo:${id}`, JSON.stringify(todo));
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the todo' });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
    if (!updatedTodo) {
      res.status(404).json({ message: 'Todo not found' });
      return;
    }
    await setToCache(`todo:${id}`, '');
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the todo' });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (deletedTodo) {
      await setToCache(`todo:${id}`, '');
      res.status(200).json({ message: 'Todo deleted successfully' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the todo' });
  }
};
