var MainApp = React.createClass({
	render: function() {
		return (
			<div>
				<Title />
				<SearchBar onInstagramSearch={this.handleInstagramSearch}  />
			</div>
		);
	}
});

var Title = React.createClass ({
	render: function() {
		return (
			<div id="title">
				<h1>AUDIEM</h1>
				<h3>Hear the moment</h3>
			</div>
		);
	}
});

var SearchBar = React.createClass({
	handleSubmit: function(event) {
		event.preventDefault();
		this.props.onInstagramSearch(hashtag);
	},
	render: function() {
		return ( 
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="artistname" placeholder="Enter, song, artists, genre..." />
			</form>
		);
	}
});

var MainBody = React.createClass({
	getInitialState: function() {
		return {hashtag: null}
	},
	InstagramSearch: function(hashtag) {
		console.log("THIS IS WORKING");
	},
	render: function() {
		return (
			<div>
				<SpotifyPlayer />
				<InstagramBackground />

			</div>
		);
	}
});


ReactDOM.render(<MainApp />, document.getElementById('content') );