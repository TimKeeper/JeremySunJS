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
  
  changeRoute = (route) => {
    // this.props.history.push(route.key)
    console.log(route) 
  }
	
	render () {
		return (
			<Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Link to='/' className="logo">JeremySun</Link>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.changeRoute}>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="about"><Link to='/first'>first</Link></Menu.Item>
              <Menu.Item key="4"><Link to='/second'>second</Link></Menu.Item>
              <Menu.Item key="5"><Link to='/third'>third</Link></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
		)
	}
}