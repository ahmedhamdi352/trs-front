import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Layout, } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import HeaderContainer from './header.style'
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { Popover } from 'antd';
import authAction from '../../../redux/auth/actions';

const { Header } = Layout;
const { logout } = authAction;

const HeaderLayout = (props) => {

    const { collapsed, setCollapsed } = props;
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const hide = () => {
        setVisible(false);
        dispatch(logout())
    };

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible);
    };

    return (
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
            }}
        >
            <HeaderContainer>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(),
                })}

                <Popover
                    placement="bottomRight"
                    content={
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                            <a onClick={hide}>logout</a>
                        </div>
                    }
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                >
                    <Avatar style={{ backgroundColor: '#1890ff' }} size="large" icon={<UserOutlined />} />
                </Popover>
            </HeaderContainer>
        </Header>
    );
};

export default HeaderLayout;
