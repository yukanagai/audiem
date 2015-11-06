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


var key = '91bd759fe1d84066ace0dae19428c7c6';

var MainBody = React.createClass({
	getInitialState: function() {
		return {hashtag: null, imageData: null}
	},
	handleInstagramSearch: function(hashtag) {
		this.InstagramSearch(hashtag);
	},
	InstagramSearch: function(hashtag) {
		this.setState({hashtag: hashtag});
		$.ajax({
			url: "https://api.instagram.com/v1/tags/"+hashtag+"/media/recent?client_id=91bd759fe1d84066ace0dae19428c7c6",
			method: 'GET',
			data: {
				next_url: {}
			},
			dataType: 'jsonp',
			success: function(result) {
				console.log(result);
				var instagramData = result.data;

				var imageArr = [];

				for (var i=0; i<instagramData.length; i++) {
					var imageLink = instagramData[i].images.standard_resolution.url;
					
					console.log("imagelink", imageLink);
					var img = $('<img />', { 
  						id: hashtag,
  						src: imageLink,
  						alt: 'MyAlt',
  						width: 200
					});
					img.appendTo($('#photos'));

					imageArr.push(imageLink);
				};
						
				this.setState({imageData: imageArr});
			}.bind(this)
		});
	},
	render: function() {
		return (
			<div>
				<SearchBar onInstagramSearch={this.handleInstagramSearch}  />
				<SpotifyPlayer hashtag={this.state.hashtag} />
				<InstagramBackground imageData={this.state.imageArr} />
			</div>
		);
	}
});

var InstagramBackground = React.createClass({

	render: function() {
		return (
			<div>
				<section id="photos"></section>
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