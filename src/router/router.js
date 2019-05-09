import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { PureComponent, Suspense, lazy } from 'react'
// const IndexComponent = lazy(() => import('../compontents/index'))
// const First = lazy(() => import('../compontents/first/index'))
// const Second = lazy(() => import('../compontents/second/index'))
// const Third = lazy(() => import('../compontents/third/index'))
import Home from '../compontents/home/index'
import JeremySun from '../compontents/JeremySun/index'
import asyncReturn from '../compontents/JavaScript/asyncReturn/index'
import reactScroll from '../compontents/React/scroll/index'



export default class AppRouter extends PureComponent {
	render () {
		return (
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<Home>
						<Route exact path="/" component={JeremySun}/>
						<Route path="/asyncReturn" component={asyncReturn}/>
						<Route path="/reactScroll" component={reactScroll}/>
					</Home>
				</Suspense>
			</Router>
		)
	}
}