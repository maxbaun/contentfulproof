import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import * as contentful from 'contentful';

import logo from './logo.svg';
import './App.css';
import Page from './page';
import Home from './home';
import CSS from './test.module.scss';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pages: []
		};

		this.client = contentful.createClient({
			space: 'fjim08cxylhm',
			accessToken: '8ef291369cb11a132801a1f3ae6c233b3fc177943172ab5e54da9029bfd3cdab'
		});
	}

	componentDidMount() {
		this.getPages();
	}

	getPages() {
		this.client
			.getEntries({
				content_type: 'page'
			})
			.then(res => {
				this.setState({
					pages: res.items
				});
			});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code>src/App.js</code> and save to reload.
					</p>
					<h1 className={CSS.test}>Test</h1>
					<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
						Learn React
					</a>
				</header>
				<BrowserRouter>
					<div>
						<nav>
							<ul>
								{this.state.pages.map(page => {
									return (
										<li key={page.fields.slug}>
											<Link to={`/${page.fields.slug}`}>{page.fields.title}</Link>
										</li>
									);
								})}
							</ul>
						</nav>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/:slug" component={Page} />
						</Switch>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
