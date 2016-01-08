var React = require('react');
var ReactDOM = require('react-dom');
var Firebase = require('firebase');
var ReactFire = require('reactfire');
var Url = "https://bucketlist2016.firebaseio.com/";
var NewItem = require('./new-item');
var List = require('./list');

var BucketListContainer = React.createClass({

	mixins: [ ReactFire ],
	getInitialState: function(){
		return {
			items: {},
			loaded: false
		}
	},
	componentWillMount: function(){
		fb = new Firebase(Url + "items/");
		this.bindAsObject( fb, 'items');
		fb.on("value", this.handleLoadedData);
	},	
	handleLoadedData: function(){
		this.setState({
			loaded: true
		})
	},
	render: function(){
		return (
			<div>

				<h1>Bucket List 2016</h1>
				<NewItem itemStore={this.firebaseRefs.items} />
				<div className={"content " + (this.state.loaded ? "loaded" : '')}>
					<List items={this.state.items} />
					{}
				</div>
			</div>
		)
	}
});

ReactDOM.render(<BucketListContainer />, document.getElementById("app"));
