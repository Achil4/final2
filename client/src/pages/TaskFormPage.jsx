import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import {useAuth} from '../context/AuthContext'

dayjs.extend(utc);
dayjs.extend(timezone);

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {user} = useAuth()

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue('title', task.title);
        setValue('description', task.description);
        setValue('date', dayjs(task.date).format('YYYY-MM-DDTHH:mm')); // Formato datetime-local
      }
    }
    loadTask();
  }, [params.id, getTask, setValue]);

  const sendEmail = async (taskData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/send-email', {
        to: user.email, 
        subject: 'Nueva Tarea Creada o Actualizada',
        text: `Se ha creado/actualizado una tarea con los siguientes detalles:\n\nTítulo: ${taskData.title}\nDescripción: ${taskData.description}\nFecha de Creación: ${dayjs(taskData.date).format('YYYY-MM-DD HH:mm')}\nÚltima Modificación: ${dayjs(taskData.lastModified).format('YYYY-MM-DD HH:mm')}`
      }, {
        withCredentials: true
      });
      console.log('Correo enviado:', response.data);
    } catch (error) {
      console.error('Error enviando el correo:', error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const currentDate = dayjs().utc().format(); // Obtener la fecha y hora actual en formato UTC

    const dataValid = {
      ...data,
      date: data.date ? dayjs(data.date).utc().format() : dayjs.utc().format(), // Formato UTC ISO 8601
      lastModified: currentDate // Añadir la fecha y hora de la última modificación
    };
    
    if (params.id) {
      await updateTask(params.id, dataValid);
    } else {
      await createTask(dataValid);
    }

    await sendEmail(dataValid); // Llama a la función para enviar el correo

    navigate('/tasks');
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <form onSubmit={onSubmit}>
          <label htmlFor='title'>titulo</label>
          <input 
            type="text" 
            placeholder="title" 
            {...register('title')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            autoFocus
          />

          <label htmlFor='description'>Descripcion</label>
          <textarea 
            rows='3' 
            placeholder="Description"
            {...register('description')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          ></textarea>

          <label htmlFor='date'>Fecha</label>
          <input 
            type='datetime-local' 
            {...register('date')}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          />
      
          <button className='bg-indigo-500 px-3 py-2 rounded-md'>Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
