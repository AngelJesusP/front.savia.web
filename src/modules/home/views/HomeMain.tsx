import React from 'react';
import '../styles/home.css'
import { HeaderComponent } from '../components/Header'
import { Layout, theme } from 'antd';
import RouterComponent from '../../../utils/components/RouterComponent';
import LeftPanelSider from '../../../utils/components/LeftPanel.sider';
const { Sider, Header } = Layout;

const HomeMain: React.FC = () => {
    const { token: { colorBgContainer } } = theme.useToken();
    return (
        <Layout hasSider className="w-100 h-100" >
            <Sider width={260} style={{ background: colorBgContainer, borderRight: '0.1em solid #AAAAAA' }}>
                <LeftPanelSider />
            </Sider>
            <Layout >
                <Header className='p-0' style={{height: 45}}>
                    <HeaderComponent />
                </Header>
                <RouterComponent  />
            </Layout>
        </Layout>
    );
};

export default HomeMain;