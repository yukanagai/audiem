var MainApp = React.createClass({
	render: function() {
		return (
			<div>
				<Title />
				<MainBody />
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
		var hashtag = this.refs.hashtag.value;
		console.log(hashtag)
		this.props.onInstagramSearch(hashtag);
	},
	render: function() {
		return ( 
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="artistname" ref="hashtag" placeholder="Enter, song, artists, genre..." />
			</form>
		);
	}
});

var MainBody = React.createClass({
	getInitialState: function() {
		return {hashtag: null, imageURs: null}
	},
	handleInstagramSearch: function(hashtag) {
		this.InstagramSearch(hashtag);
	},
	InstagramSearch: function(hashtag) {
		this.setState({hashtag: hashtag});
		console.log("THIS IS WORKING", hashtag);
		$.ajax({
			url: "https://api.instagram.com/v1/tags/"+hashtag+"/media/recent?client_id=91bd759fe1d84066ace0dae19428c7c6",
			dataType: 'jsonp',
			success: function(result) {

				
				console.log(result.data);
			}
		});
	},
	render: function() {
		return (
			<div>
				<SearchBar onInstagramSearch={this.handleInstagramSearch}  />
				<SpotifyPlayer hashtag={this.state.hashtag} />
				<InstagramBackground hashtag={this.state.hashtag} />
			</div>
		);
	}
});

var InstagramBackground = React.createClass({
	
	render: function() {
		return (
			<div>
			</div>
		);
	}
});


var SpotifyPlayer = React.createClass({
	render: function() {
		return (
			<div>
				SPOTIFY PLAYER: {this.props.hashtag}
			</div>
		);
	}
});





ReactDOM.render(<MainApp />, document.getElementById('content') );