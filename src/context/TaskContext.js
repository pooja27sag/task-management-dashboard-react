import { createContext, useContext, useReducer, useEffect } from 'react';
import api from './../services/api';

const TaskContext = createContext();

const taskReducer = (state, action) => {
    switch (action.type) {
        case 'SET_TASKS':
            return { ...state, tasks: action.payload, loading: false };
        case 'ADD_TASK':
            return { ...state, tasks: [...state.tasks, action.payload] };
        case 'UPDATE_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                )
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, {
        tasks: [],
        loading: false,
        error: null
    });

    useEffect(() => {
        const fetchTasks = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const response = await api.get('/tasks');
                dispatch({ type: 'SET_TASKS', payload: response.data });
            } catch (error) {
                dispatch({ type: 'SET_ERROR', payload: error.message });
            }
        };
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);