import { createContext, useContext, useState } from "react";
import { createTasksRequest, getTasksRequest, deleteTasksRequest, getTaskRequest, updateTasksRequest } from "../api/tasks.js";
import axios from 'axios'; // Asegúrate de que axios esté importado

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTasks must be used within a TaskProvider');
    }

    return context;
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        try {
            const res = await getTasksRequest();
            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createTask = async (task) => {
        const res = await createTasksRequest(task);
        console.log(res);
    };

    const deleteTask = async (id) => {
        try {
            const res = await deleteTasksRequest(id);
            if (res.status === 204) setTasks(tasks.filter(task => task._id != id));
        } catch (error) {
            console.log(error);
        }
    };

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async (id, task) => {
        try {
            await updateTasksRequest(id, task);
        } catch (error) {
            console.log(error);
        }
    };

    const sendEmailToUser = async (taskData) => {
        try {
            const response = await axios.post('http://localhost:4000/api/send-email', {
                to: 'gastoncarrizoo15@gmail.com', 
                subject: 'Nueva Tarea Creada o Actualizada',
                text: `Se ha creado/actualizado una tarea con los siguientes detalles:\n\nTítulo: ${taskData.title}\nDescripción: ${taskData.description}\nFecha de Creación: ${dayjs(taskData.date).format('YYYY-MM-DD HH:mm')}\nÚltima Modificación: ${dayjs(taskData.lastModified).format('YYYY-MM-DD HH:mm')}`
            });
            console.log('Correo enviado:', response.data);
        } catch (error) {
            console.error('Error enviando el correo:', error);
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask, sendEmailToUser }}>
            {children}
        </TaskContext.Provider>
    );
}
