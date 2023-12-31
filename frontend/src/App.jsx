import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import SpotList from './components/SpotList';
import SpotDetails from './components/SpotDetails';
import NewSpot from './components/NewSpot';
import ManageSpots from './components/ManageSpots';
import EditSpot from './components/EditSpot';

import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: < SpotList />
      },
      {
        path: '/spots/new',
        element: < NewSpot />
      },
      {
        path: '/spots/current',
        element: <ManageSpots />
      },
      {
        path: '/spots/:spotId/edit',
        element: <EditSpot />
      },
      {
        path: 'spots/:spotId',
        element: <SpotDetails />
      },
      {
        path: '*',
        element: <h1>This is not the droid you are looking for</h1>
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;