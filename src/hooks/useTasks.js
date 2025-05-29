

import { useTasks } from '../context/TaskContext';
import api from '../services/api';

export const useTaskActions = () => {
    const { dispatch } = useTasks();

    const addTask = async (task) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.post('/tasks', task);
            dispatch({ type: 'ADD_TASK', payload: response.data });
            setTimeout(() => {
                dispatch({ type: 'SET_LOADING', payload: false });

            }, 1500);
            return response.data;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    };

    const updateTask = async (task) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await api.put(`/tasks/${task.id}`, task);
            dispatch({ type: 'UPDATE_TASK', payload: response.data });
            setTimeout(() => {
                dispatch({ type: 'SET_LOADING', payload: false });

            }, 1500);
            return response.data;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    };

    const deleteTask = async (id) => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            await api.delete(`/tasks/${id}`);
            dispatch({ type: 'DELETE_TASK', payload: id });
            setTimeout(() => {
                dispatch({ type: 'SET_LOADING', payload: false });

            }, 1500);
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    };

    return { addTask, updateTask, deleteTask };
};