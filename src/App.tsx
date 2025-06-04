import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BoardPage } from './pages/BoardPage/BoardPage';
import { BoardsPage } from './pages/BoardsPage/BoardsPage';
import { IssuesPage } from './pages/IssuesPage/IssuesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/boards" replace /> },
      { path: 'boards', element: <BoardsPage /> },
      { path: 'boards/:id', element: <BoardPage /> },
      { path: 'issues', element: <IssuesPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
