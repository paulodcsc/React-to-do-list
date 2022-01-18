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
  
  async function loadTasks() {
    const response = await api.get ('/Item')
    console.log(response)
    setTasks(response.data) 
  }

  useEffect(() => {
    loadTasks()
  }, [])
  
  async function finishedTask(id: number) {
    const finished = {finished:true}
    await api.put(`/Item/${id}`, finished)
    loadTasks()
  }

  function formateDescription(description: String) {
    let descriptionLenght
    
    if (description.length > 20) {
      descriptionLenght = description.substring(0,20) + "..."
    } else {
      descriptionLenght = description.substring(0,20)
    }
    return descriptionLenght
  }

  async function deleteTask(id: number) {
    await api.delete(`/Item/${id}`)
    loadTasks()
  }

  function formateDate(date: Date) {
    return moment(date).format('DD/MM/YYYY')
  }

  function newTask() {
    navigate('/tasks_form')
  }

  function editTask(id: number) {
    navigate(`/tasks_form/${id}`)
  }

  function viewTask(id: number) {
    navigate(`/tasks/${id}`)
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
            <th>Task</th>
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
              <td>{task.title}</td>
              <td>{formateDescription(task.description)}</td>
              <td>{formateDate(task.createdAt)}</td>
              <td>{formateDate(task.deadline)}</td>
              <td>{task.complexity}</td>
              <td>
                <Badge bg={task.finished ? "success" : "warning"} text={task.finished ? "light" : "dark"}>
                    {task.finished ? "FINISHED" : "PENDING"}
                </Badge>{' '}
              </td>
              <td>
                <Button size='sm' variant='warning' disabled={task.finished} onClick={() => editTask(task.id)}>Edit</Button>{' '}
                <Button size='sm' variant='info' onClick={() => viewTask(task.id)}>See more</Button>{' '}
                <Button size='sm' variant='success' disabled={task.finished} onClick={() => finishedTask(task.id)}>Finish</Button>{' '}
                <Button size='sm' variant='danger' onClick={() => deleteTask(task.id)} >Delete</Button>{' '}
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