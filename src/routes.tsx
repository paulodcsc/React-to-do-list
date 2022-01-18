import React from 'react';
import { Routes, Route } from 'react-router-dom'

import Tasks from './pages/Tasks'
import TasksForm from './pages/Tasks/Form'
import TasksDetail from './pages/Tasks/Detail'

const Index: React.FC = () => {
  return (
      <Routes>
          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/tasks_form" element={<TasksForm/>}/>
          <Route path="/tasks_form/:id" element={<TasksForm/>}/>
          <Route path="/tasks/:id" element={<TasksDetail/>}/>
      </Routes>
  );
}

export default Index;