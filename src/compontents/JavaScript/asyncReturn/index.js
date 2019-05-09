import React, { PureComponent } from 'react'
import { Statistic, Row, Col, Button } from 'antd'
import './index.scss'



export default class asyncReturn extends PureComponent {

    state = {
        asycnValue: 112893,
        sycnValue:112893
    }

    asycnChangeValue = () => {
        this.setState({
            asycnValue: 19960527
        })
        console.log(this.consoleResult('async'))
    }

    sycnChangeValue = () => {
        this.setState({
            asycnValue: 19960527
        })
        console.log(this.consoleResult('sync'))
    }

    consoleResult = (type) => {
        let result = '这是默认结果'
        if (type === 'async') {
            result = '这是异步返回'
            setTimeout(() => {
                return result
            }, 0)
        } else if (type === 'sync') {
            result = '这是同步返回'
            return result
        }
    }
    

    render () {
        return (
            <div className="container">
                <Row gutter={16}>
                    <Col span={12}>
                        <Statistic title="Account Balance (CNY)" value={this.state.asycnValue} precision={2} />
                        <Button style={{ marginTop: 16 }} type="primary" onClick={this.asycnChangeValue}>asycnChangeValue</Button>
                    </Col>
                    <Col span={12}>
                        <Statistic title="Account Balance (CNY)" value={this.state.sycnValue} precision={2} />
                        <Button style={{ marginTop: 16 }} type="primary" onClick={this.sycnChangeValue}>sycnChangeValue</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}