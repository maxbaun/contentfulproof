import React, { Component } from 'react';
import * as contentful from 'contentful';
import Helmet from 'react-helmet';

import NotFound from './notFound';

export default class Page extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			data: null
		};

		this.client = contentful.createClient({
			space: 'fjim08cxylhm',
			accessToken: '8ef291369cb11a132801a1f3ae6c233b3fc177943172ab5e54da9029bfd3cdab'
		});
	}

	componentDidMount() {
		this.getPage();
	}

	componentWillUpdate(nextProps) {
		if (nextProps.match.params.slug !== this.props.match.params.slug) {
			this.getPage(nextProps.match.params.slug);
		}
	}

	getPage(slug = this.props.match.params.slug) {
		this.client
			.getEntries({
				content_type: 'page',
				'fields.slug[in]': slug
			})
			.then(res => {
				this.setState({
					loading: false,
					data: res.items[0]
				});
			});
	}

	render() {
		if (!this.state.loading && !this.state.data) {
			return <NotFound />;
		}

		if (this.state.loading) {
			return <h1>Loading...</h1>;
		}

		const { fields } = this.state.data;
		const { image: pageImage } = fields;

		return (
			<div>
				<Helmet
					title={fields.title}
					meta={[
						{ property: 'og:image', content: pageImage.fields.file.url },
						{ property: 'og:type', content: 'website' },
						{ property: 'og:title', content: fields.title }
					]}
				/>
				<img src={`${pageImage.fields.file.url}?fm=jpg&w=200&h=200&fit=thumb`} alt="" />
				<h1>
					this is the page: <strong>{fields.title}</strong>
				</h1>
			</div>
		);
	}
}
