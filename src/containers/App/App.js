import React, { useState } from 'react';
import { Layout } from 'antd';
import { ConfigProvider } from 'antd';
import AppRouter from './AppRouter';
import './App.css'
import { useTranslation } from "react-i18next";
import HeaderLayout from './Header'
import SiderLayout from '../Sidebar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Content } = Layout;

const App = (props) => {
  const { url } = props.match;
  const [collapsed, setCollapsed] = useState(false);
  const { i18n } = useTranslation();

  return (
    <ConfigProvider direction={i18n.dir(i18n.language)}>
      <Layout hasSider>
        <SiderLayout collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} url={url} />
        <Layout className="site-layout">
          <HeaderLayout collapsed={collapsed} setCollapsed={() => setCollapsed(!collapsed)} />
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              overflow: 'overlay'
            }}
          >
            <AppRouter url={url} />
          </Content>
        </Layout>
      </Layout>
      <ToastContainer autoClose={4000} hideProgressBar={true} />
    </ConfigProvider>
  );
};

export default App;
