import { Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';

export function Layout() {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Navigation />
      <AntLayout.Content style={{ padding: '24px' }}>
        <Outlet />
      </AntLayout.Content>
    </AntLayout>
  );
}
