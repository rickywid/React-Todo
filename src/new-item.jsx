var React = require('react');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
var Url = "https://bucketlist2016.firebaseio.com/";

module.exports = React.createClass({
	mixins:  [ReactFireMixin],
	getInitialState: function(){
		return {
			text: ''
		}
	},
	handleClick: function(e){
		this.props.itemStore.push({
			text: this.state.text,
			done: false
		});
		this.setState({
			text: ''
		});
		console.log(this.state.text);
	},
	handleChange: function(e){
		this.setState({
			text: e.target.value
		});
	},
	render: function(){
		return (
			<div className="input-group">
				<span className="input-group-btn">
					<button className="btn btn-default" type="button" onClick={this.handleClick} >Go!</button>
				</span>
			<input type="text" className="form-control" placeholder="Search for..."  value={this.state.text} onChange={this.handleChange} />
			</div>
		)
	}
})