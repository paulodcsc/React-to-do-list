import { BrowserRouter } from 'react-router-dom'

import Index from './routes'
import Header from './components/Header'

function App() {
  return (
    <BrowserRouter>
        <Header/>
        <Index/>
    </BrowserRouter>
  );
}

export default App;
