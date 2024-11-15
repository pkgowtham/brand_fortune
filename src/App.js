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
import Create from './pages/employee/create';
import Employee from './pages/employee';
import Brand from './pages/brand';
import { default as BrandCreate } from './pages/brand/create';

import Articletype from './pages/articleType';
import { default as ArticletypeCreate } from './pages/articleType/create';
import FileDoc from './pages/file';
import { default as FileDocCreate } from './pages/file/create';
import FileCategory from './pages/fileCategory';
import { default as FileCategoryCreate } from './pages/fileCategory/create';





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
                  // <Layout/>
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
                
              >
                <Route path="dashboard" element={<Project />} />
                <Route path="employee" element={<Employee />} />
                <Route path="create" element={<ProjectCreate />} />
                <Route path='comment' element={<Comment/>}/>
                <Route path='user' element={<Create/>}/>
                <Route path="brand" element={<Brand />} />
                <Route path="brandcreate" element={<BrandCreate />} />
                <Route path="articletype" element={<Articletype />} />
                <Route path="articletypecreate" element={<ArticletypeCreate />} />
                <Route path="filedoc" element={<FileDoc />} />
                <Route path="filedoccreate" element={<FileDocCreate />} />
                <Route path="filecategory" element={<FileCategory />} />
                <Route path="Filecategorycreate" element={<FileCategoryCreate />} />           
               
              </Route>
            </Routes>
          </Router>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
