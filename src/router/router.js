import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { PureComponent, Suspense, lazy } from 'react'
// const IndexComponent = lazy(() => import('../compontents/index'))
// const First = lazy(() => import('../compontents/first/index'))
// const Second = lazy(() => import('../compontents/second/index'))
// const Third = lazy(() => import('../compontents/third/index'))
import Home from '../compontents/home/index'
import First from '../compontents/first/index'
import Second from '../compontents/second/index'
import Third from '../compontents/third/index'



export default class AppRouter extends PureComponent {
	render () {
		return (
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<Home>
						<Route exact path="/" component={First}/>
						<Route path="/second" component={Second}/>
						<Route path="/third" component={Third}/>
					</Home>
				</Suspense>
			</Router>
		)
	}
}