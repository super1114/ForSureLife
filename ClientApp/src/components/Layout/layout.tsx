import React from 'react';
import { Layout } from 'antd';
import { Routes } from '../../nav/routes';
import logoWhite from '../../assets/logo_white.png';
import FooterClass from "../Footer/footer"
import userProfile from '../../assets/profile-user.svg'
import "./layout.css"
import { Props } from 'redux-devtools/lib/createDevTools';

const { Header, Content } = Layout;
class LayoutClass extends React.Component {


    render() {
        const height = window.innerHeight;
        const path = window.location.hash.toLowerCase();

        return (
            <Layout>
                {path !== "#/thankyou" &&
                    <Header className="header">
                    
                        <img src={logoWhite} width={150} />
                        {/*<div className="profile-icon"><img src={userProfile} alt="user profile"/> <span>Profile</span></div>*/}
                    </Header>}
                    <div style={{height:10, color:"#C8C8C8",marginTop:65}}/>

                    <Content style={{ minHeight: height - 64, backgroundColor: '#fff' }}>
                            <Routes {...this.props} />
                    </Content>

                {path !== "#/thankyou" &&
                    <FooterClass />
                }
            </Layout >
        )
    }
}

export const LayoutWrapper = (LayoutClass);

