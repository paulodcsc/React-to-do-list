import React, {useState, useEffect, ChangeEvent} from 'react';
import { Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import api from '../../../services/api'
import './index.css'

type IParamsProps = {
  id:string;
}

interface ITask {
  title: string;
  description: string;
  createdAt: Date;
  deadline: Date;
  complexity: string;
}

const Tasks: React.FC = () => {
const {id} = useParams<IParamsProps>()

const [buttonName, setButtonName] = useState("Create")
const [alertName, setAlertName] = useState("Created!")

  
const navigate = useNavigate()
  
  const [model, setModel] = useState<ITask>({
    title:'',
    description:'',
    createdAt: new Date,
    deadline: new Date,
    complexity: ''
  })
  
    useEffect(() => {
      if (id !== undefined) {
        setButtonName("Update")
        setAlertName("Updated!")
        findTask(id)
      }
    }, [id])

  async function findTask (id: string) {
    const response = await api.get(`Item/${id}`)
    setModel({
      title: response.data.title,
      description: response.data.description,
      complexity: response.data.complexity,
      createdAt: response.data.createdAt,
      deadline: response.data.deadline
    })
  }

  function created() {
    alert(alertName);
 }

  function updatedModel (e: ChangeEvent<HTMLInputElement>) {

      setModel({
          ... model,
          [e.target.name]: e.target.value
      })
  }

  async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
      e.preventDefault()

      if (id !== undefined) {

        const response = await api.put(`/Item/${id}`, model)

      } else {

        const response = await api.post('/Item', model)

      }

      goBack()
      
  }

  function goBack () {
    navigate('/tasks')
  }

  return(
    <div className='container'>
      <br/>
      <div className='task-header'>
        <h3>New Task</h3>
        <Button variant="dark" onClick={goBack}>Go back</Button>
      </div>
      <br/>
      <div className='container'>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                    type="text" 
                    maxLength={30}
                    placeholder="Ex: Go to the mall" 
                    name="title" 
                    value={model.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                </Form.Group>
                
                <Form.Group className="lower">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                    as="textarea"
                    rows={8} 
                    maxLength={1456}
                    placeholder="Ex: Buy some ice cream and tickets for the Spider-Man movie on wednesday" 
                    name="description"
                    value={model.description}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                </Form.Group>

                <Form.Group className="lower">
                    <Form.Label>Complexity</Form.Label>
                    <Form.Control 
                    as="select"
                    name="complexity"
                    value={model.complexity}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}>
                        <option>Choose...</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="lower">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control 
                    type="date" 
                    placeholder="Ex: Buy some ice cream and tickets for the Spider-Man movie on wednesday" 
                    name="deadline"
                    value={model.deadline.toString()}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} />
                </Form.Group>
                <Button className='submit' variant="success" type="submit" onClick={created}>
                    {buttonName}
                </Button>
        </Form>
      </div>
    </div>
  );
}

export default Tasks;