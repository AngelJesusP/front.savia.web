import React from "react";

import LogoLeftPanel from '../assets/img/imgLogoLeftPanel.jpg'
import { Menu } from "antd";
import { listItems,listItemsAdmin } from "../constants/sider/items";
import { MinusCircleTwoTone } from '@ant-design/icons';
import { RUTA_HOME } from "../constants/router/router.router";

const role = localStorage.getItem("role");
export default class LeftPanel extends React.Component {
    itemLeftPanel: any = role === "" ? listItems.map((item) => ({ 
        item, 
        icon: <MinusCircleTwoTone style={{fontSize: 13}} />,
        label: item.name,
        onClick: () => window.location.href = item.ruta
    })) : listItemsAdmin.map((item) => ({ 
        item, 
        icon: <MinusCircleTwoTone style={{fontSize: 13}} />,
        label: item.name,
        onClick: () => window.location.href = item.ruta
    }));

    render(): React.ReactNode {

        return <div className="left-panel">
            <img src={LogoLeftPanel} style={{ cursor: 'pointer', height: 219 }} onClick={() => window.location.href = RUTA_HOME} className="img-fluid w-100 p-2" alt="logo leftpanel" />
            <hr />
            <Menu mode="inline"
                style={{ height: '100%', font: 'normal normal normal 13px/22px Montserrat' }}
                items={this.itemLeftPanel}
            />
        </div>
    }
}
