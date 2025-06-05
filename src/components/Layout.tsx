import { Layout as AntLayout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation/Navigation';

export function Layout() {
  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Navigation />
      <AntLayout.Content style={{ padding: '24px 0' }}>
        <Outlet />
      </AntLayout.Content>
    </AntLayout>
  );
}
