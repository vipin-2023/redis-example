import Todo, { ITodo } from '../models/todoModel';
import { getFromCache, setToCache } from './redisServices';

export const getAllTodos = async (): Promise<ITodo[]> => {
  try {
    const cachedTodos = await getFromCache('todos');
    if (cachedTodos) {
      return JSON.parse(cachedTodos);
    }
    const todos = await Todo.find();
    await setToCache('todos', JSON.stringify(todos));
    return todos;
  } catch (error) {
    throw new Error('An error occurred while fetching todos');
  }
};
