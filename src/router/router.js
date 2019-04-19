import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { PureComponent, Suspense, lazy } from 'react'
const Home = lazy(() => import('../compontents/home/index'))
const About = lazy(() => import('../compontents/about/index'))



export default class AppRouter extends PureComponent {
	render () {
		return (
			<Router>
				<Suspense fallback={<div>Loading...</div>}>
					<Switch>
						<Route exact path="/" component={Home}/>
						<Route path="/about" component={About}/>
					</Switch>
				</Suspense>
			</Router>
		)
	}
}