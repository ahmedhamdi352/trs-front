// import React, { useState } from 'react';
// import { Button, Layout, Menu } from 'antd';
// import { ConfigProvider } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// import {
//   MenuUnfoldOutlined,
//   MenuFoldOutlined,
//   VideoCameraOutlined,
//   UploadOutlined,
// } from '@ant-design/icons';
// import {
//   DesktopOutlined,
//   PieChartOutlined,
//   FileOutlined,
//   TeamOutlined,
// } from '@ant-design/icons';
// import './App.css'
// import { useTranslation } from "react-i18next";
// import { Debounce } from 'react-throttle';
// import WindowResizeListener from 'react-window-size-listener';
// import Topbar from './containers/Topbar/Topbar';

// const { Header, Sider, Content } = Layout;

// const App = (props) => {
//   const [collapsed, setCollapsed] = useState(false);
//   const { i18n, t } = useTranslation();
//   const { url } = props.match;

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   function getItem(label, key, icon, children) {
//     return {
//       key,
//       icon,
//       children,
//       label,
//     };
//   }

//   const items = [
//     getItem('Option 1', '1', <PieChartOutlined />),
//     getItem('Option 2', '2', <DesktopOutlined />),
//     getItem('User', 'sub1', <UserOutlined />, [
//       getItem(t('Tom'), '3'),
//       getItem('Bill', '4'),
//       getItem('Alex', '5'),
//     ]),
//     getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
//     getItem('Files', '9', <FileOutlined />),
//   ];

//   return (
//     <Layout>

//       <Layout className="site-layout">
//         <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
//           <div className="logo" />
//           <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
//         </Sider>
//         <Header
//           className="site-layout-background"
//           style={{
//             padding: 0,
//           }}
//         >
//           <Debounce time="1000" handler="onResize">
//             <WindowResizeListener onResize={(windowSize) => this.props.toggleAll(windowSize.windowWidth, windowSize.windowHeight)} />
//           </Debounce>
//           <Topbar url={url} />
//           {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
//             className: 'trigger',
//             onClick: () => setCollapsed(!collapsed),
//           })}
//         </Header>

//         <Content
//           className="site-layout-background"
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//           }}
//         >
//           {t("copyRight")}
//           <Button onClick={() => changeLanguage('ar')}>change lang to ar</Button>
//           <Button onClick={() => changeLanguage('en')}>change lang to en</Button>
//           Content
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default App;
