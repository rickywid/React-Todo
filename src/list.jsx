var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var Url = "https://bucketlist2016.firebaseio.com/";
var ListItem = require("./list-item");

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				{this.renderList()}
			</div>
		)
	},
	renderList: function(){
		var children = [];

		for(var key in this.props.items){

			var eachItem = this.props.items[key];
			eachItem.key = key;

			children.push(
				<ListItem eachItem={eachItem} key={key}	/>
			)
		}
		return children;
	}
})