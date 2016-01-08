var React = require('react');
var Url = "https://bucketlist2016.firebaseio.com/";
var Firebase = require('firebase');

module.exports = React.createClass({
	getInitialState: function(){
		return {
			text: this.props.eachItem.text,
			done: this.props.eachItem.done
		}
	},
	componentWillMount: function(){
		this.fb = new Firebase(Url + 'items/' + this.props.eachItem.key);
	},
	handleChange: function(e){
		this.setState({ done: e.target.checked });
		this.fb.update({ done: e.target.checked });
	},
	handleDeleteClick: function(){
		this.fb.remove();
	},
	render: function(){
		return (
			<div className="input-group">
				<span className="input-group-addon">
					<input type="checkbox" onChange={this.handleChange} checked={this.state.done} />
				</span>
				<input type="text" className="form-control" value={this.state.text} />
				<span className="input-group-btn">
					<button className="btn btn-danger" onClick={this.handleDeleteClick}>Delete</button>
				</span>
			</div>
		)
	}
})