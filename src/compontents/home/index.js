import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import {Layout, Menu, Icon} from 'antd'
import './index.css'
const {Header, Content, Footer, Sider} = Layout
const SubMenu = Menu.SubMenu


export default class Home extends PureComponent {

	state = {
    collapsed: false,
	}

	onCollapse = (collapsed) => {
    this.setState({
			collapsed
		})
  }
  
  // changeRoute = (route) => {
  //   this.props.history.push(route.key)
  //   console.log(route) 
  // }
	
	render () {
		return (
			<Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          {/* <Link to='/' className="logo">JeremySun</Link> */}
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.changeRoute}>
            <Menu.Item key="9">
              <Icon type="home" />
              <span>JeremySun</span>
              <Link to='/'></Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="html5" /><span>JavaScript</span></span>}
            >
              <Menu.Item key="asyncReturn"><Link to='/asyncReturn'>asyncReturn</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="apple" /><span>React</span></span>}
            >
              <Menu.Item key="reactScroll"><Link to='/reactScroll'>reactScroll</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              title={<span><Icon type="android" /><span>Vue</span></span>}
            >
            </SubMenu>
            <SubMenu
              key="sub4"
              title={<span><Icon type="wechat" /><span>小程序</span></span>}
            >
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            JeremySun ©2019 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
		)
	}
}