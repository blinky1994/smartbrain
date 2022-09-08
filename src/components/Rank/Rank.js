import React, { Component } from 'react'

export default class Rank extends Component {
  
	constructor() {
		super();
		this.state = {
			rank: ''
		}
	}

	componentDidMount() {
		this.generateEmoji(this.props.entries);
	};

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.entries !== this.props.entries) {
			this.generateEmoji(this.props.entries);
		}
		
	}

	generateEmoji = (entries) => {
		fetch(`https://4onba5y346.execute-api.ap-southeast-1.amazonaws.com/rank?rank=${entries}`)
		.then(resp => resp.json())
		.then(data => this.setState({ rank: data.input }))
		.catch(console.log);
	}

	render() {
	return (
	<div>
		<div className='white f3'>
		{`Hi ${this.props.name}, your current entry count is...`}
		</div>

		<div className='white f1'>
		{this.props.entries}
		</div>

		<div className='white f3'>
		{`Rank Badge: ${this.state.rank}`}
		</div>
	</div>
	)
  }
}