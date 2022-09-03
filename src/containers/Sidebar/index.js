import React from 'react';
import { Layout, Menu } from 'antd';
import Logo from '../../components/utility/logo';
import { Link } from 'react-router-dom';
import { showItems, items } from './options';
import { useSelector } from 'react-redux'

const SideBarLayout = (props) => {
    const { user } = useSelector(({ Auth }) => Auth);

    const { collapsed } = props;
    const { Sider } = Layout;

    const stripTrailingSlash = (str) => {
        if (str.substr(-1) === '/') {
            return str.substr(0, str.length - 1);
        }
        return str;
    };


    const getMenuItem = (singleOption) => {
        const { key, icon, children, label, target, role } = singleOption; // label,
        const url = stripTrailingSlash(props.url);
        if (children) {
            if (role?.includes(user?.role)) {
                return (
                    <Menu.SubMenu
                        key={key}
                        title={
                            <span>
                                <div
                                    style={{
                                        fontSize: '15px',
                                        display: 'flex',
                                        fontFamily: "'Montserrat', sans-serif",
                                    }}
                                >
                                    <div style={{ marginRight: '5px' }}> {icon} </div>
                                    {label}
                                </div>
                            </span>
                        }
                    >
                        {children.map((child) => {
                            const linkTo = child.withoutDashboard ? `/${child.key}` : `${url}/${child.target}`;
                            return (
                                <Menu.Item key={child.key}>
                                    <Link to={linkTo}>
                                        <div
                                            style={{
                                                fontFamily: "'Montserrat', sans-serif",
                                                fontSize: '15px',
                                                display: 'flex',
                                            }}
                                        >
                                            <div style={{ marginRight: '5px' }}> {child.icon} </div>
                                            {child.label}
                                        </div>
                                    </Link>
                                </Menu.Item>
                            );
                        })}
                    </Menu.SubMenu>
                );
            }

        }
        if (role?.includes(user?.role)) {

            return (

                <Menu.Item key={key}>
                    <Link to={`${url}/${target}`}>
                        <span>
                            <div
                                style={{
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '15px',
                                    display: 'flex',
                                }}
                            >
                                <div style={{ marginRight: '5px' }}> {icon} </div>
                                {label}
                            </div>
                        </span>
                    </Link>
                </Menu.Item>
            );
        }
    };

    return (
        <Sider collapsed={collapsed}>
            <Logo collapsed={collapsed} />
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {showItems(items)?.map((singleOption) => getMenuItem(singleOption))}
            </Menu>
        </Sider>
    );
};

export default SideBarLayout;

