import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import theme from './theme';

import ProtectedRoute from './protectedRoute';
import Login from './pages/login';
import Layout from './pages/layout';
import Project from './pages/project';
import   Comment  from './pages/comment';
import { default as ProjectCreate } from './pages/project/create';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <div>
          <Router basename='/'>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Navigate to={'/login'} />} />
              <Route
                path="/layout"
                element={
                  <Layout/>
                  // <ProtectedRoute>
                  //   <Layout />
                  // </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Project />} />
                <Route path="create" element={<ProjectCreate />} />
                <Route path='comment' element={<Comment/>}/>
               
              </Route>
            </Routes>
          </Router>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
