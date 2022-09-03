
import {
    UsergroupAddOutlined,
    SettingOutlined,
    ContactsOutlined,
    TeamOutlined,
    AuditOutlined,
    AreaChartOutlined,
    AppstoreOutlined
} from '@ant-design/icons';
import i18next from 'i18next';

export const items = [
    {
        "id": "1",
        "name": "Events",
        "target": "events",
        "icon": <AppstoreOutlined />,
        "role": ['sales', 'admin', 'finance'],
    },
    {
        "name": "Employees",
        "id": "2",
        "icon": <TeamOutlined />,
        "role": ['admin'],
        "children": [
            {
                "id": "2i",
                "name": "Admins",
                "icon": <AuditOutlined />,
                "target": "employees/admin"
            },
            {
                "id": "2ii",
                "name": "Receptionist",
                "icon": <AuditOutlined />,
                "target": "employees/receptionist"
            },
            {
                "id": "2iii",
                "name": "Sales",
                "icon": <ContactsOutlined />,
                "target": "employees/sales"
            },
            {
                "id": "2iiii",
                "name": "Finance",
                "icon": <AreaChartOutlined />,
                "target": "employees/finance"
            }
        ]
    },
    {
        "id": "3",
        "name": "Clients",
        "icon": <UsergroupAddOutlined />,
        "role": ['admin'],
        "target": "clients"
    },
    {
        "id": "4",
        "name": "Finances",
        "icon": <AreaChartOutlined />,
        "role": ['finance', 'admin'],
        "target": "finances"
    },
    {
        "id": "5",
        "name": "Settings",
        "icon": <SettingOutlined />,
        "role": ['admin', 'finance', 'sales'],
        "children": [
            {
                "id": "122",
                "name": "Change Password",
                "icon": <AuditOutlined />,
                "target": "settings/change-paasword"
            },
        ]
    },
]

export const showItems = (items) => {
    return items.map(item => {
        return (
            {
                key: item.id,
                icon: item.icon,
                children: item.children ? showItems(item.children) : undefined,
                label: i18next.t(item.name),
                target: item.target,
                role: item.role
            }
        )
    })
}