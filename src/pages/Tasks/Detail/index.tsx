import moment from 'moment';
import React, {useState, useEffect} from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../services/api';

interface ITask {
    id: number;
    title: string;
    description: string;
    createdAt: Date;
    deadline: Date;
    complexity: string;
    finished: boolean;
}

const Detail: React.FC = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const [task, setTask] = useState<ITask>()

    useEffect(() => {
        findTask()
    }, [id])
    
    function goBack() {
        navigate(-1)
    }

    function formateDate(date: Date | undefined) {
        return moment(date).format('DD/MM/YYYY')
      }

    async function findTask() {
        const response = await api.get<ITask>(`/Item/${id}`)
        console.log(response)
        setTask(response.data)
    }

    return(
        <div className='container'>
            <br/>   
            <div className='task-header'>
                    <h1>Task details</h1>
                    <Button variant="dark" onClick={goBack}>Voltar</Button>
            </div>
            <br/>

            <Card>
                <Card.Body>
                    <Card.Title>{task?.title}</Card.Title>
                    <Card.Text>
                        {task?.description}
                        <br />
                        <br />
                        <strong>Status: </strong>
                        <Badge bg={task?.finished ? "success" : "warning"} text={task?.finished ? "light" : "dark"}>
                            {task?.finished ? "FINISHED" : "PENDING"}
                        </Badge>
                        <br />
                        <strong>Created at: </strong>
                        <Badge bg="info">
                            {formateDate(task?.createdAt)}
                        </Badge>
                        <br />
                        <strong>Deadline: </strong>
                        <Badge bg="warning" text="dark">
                            {formateDate(task?.deadline)}
                        </Badge>
                    </Card.Text>
                </Card.Body>
            </Card>

        </div>
    );
}

export default Detail;