import React, {useState, useEffect} from 'react';
import { Badge, Table, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './index.css'

import moment from 'moment'

interface ITask {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  deadline: Date;
  complexity: string;
  finished: boolean;
}

const Tasks: React.FC = () => {

  const [tasks, setTasks] = useState<ITask[]>([])
  const navigate = useNavigate()
  
  useEffect(() => {
    loadTasks()
  }, [])
  
  async function loadTasks() {
  
    const response = await api.get ('/Item')
    console.log(response)
    setTasks(response.data)
  
  }

  function formateDate(date: Date) {
    return moment(date).format('DD/MM/YYYY')
  }

  function newTask () {
    navigate('/tasks_form')
  }

  function editTask(id: number) {
    navigate(`/tasks_form/${id}`)
  }
  
  return(
    <div className='container'>
      <br/>
      <div className='task-header'>
        <h1>Task page</h1>
        <Button variant="dark" onClick={newTask}>New task</Button>
      </div>
      <br/>
      <Table striped bordered hover className='text-center'>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created at</th>
            <th>Deadline</th>
            <th>Complexity</th>
            <th>Finished</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>

        {
            tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{formateDate(task.createdAt)}</td>
              <td>{formateDate(task.deadline)}</td>
              <td>{task.complexity}</td>
              <td>
                <Badge bg={task.finished ? "success" : "warning"} text={task.finished ? "light" : "dark"}>
                    {task.finished ? "FINALIZADO" : "PENDENTE"}
                </Badge>{' '}
              </td>
              <td>
                <Button size='sm' variant='warning' onClick={() => editTask(task.id)}>Editar</Button>{' '}
                <Button size='sm' variant='info'>Visualizar</Button>{' '}
                <Button size='sm' variant='success'>Finalizar</Button>{' '}
                <Button size='sm' variant='danger'>Deletar</Button>{' '}
              </td>
            </tr>
            ))
        }

        </tbody>
      </Table>
    </div>
  );
}

export default Tasks;