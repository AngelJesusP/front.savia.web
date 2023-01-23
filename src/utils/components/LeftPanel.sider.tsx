import React from "react";

import LogoLeftPanel from '../assets/img/imgLogoLeftPanel.jpg'
import { Menu } from "antd";
import { listItems } from "../constants/sider/items";
import { MinusCircleTwoTone } from '@ant-design/icons';

export default class LeftPanel extends React.Component {

    itemLeftPanel: any = listItems.map((item) => ({ 
        item, 
        icon: <MinusCircleTwoTone style={{fontSize: 13}} />,
        label: item.name,
        onClick: () => window.location.href = item.ruta
    }));

    render(): React.ReactNode {

        return <div className="left-panel">
            <img src={LogoLeftPanel} className="img-fluid w-100 p-2" style={{ height: 219 }} alt="logo leftpanel" />
            <hr />
            <Menu mode="inline"
                style={{ height: '100%', font: 'normal normal normal 13px/22px Montserrat' }}
                items={this.itemLeftPanel}
            />
        </div>
    }
}
