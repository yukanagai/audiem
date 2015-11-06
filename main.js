var MainApp = React.createClass({
	render: function() {
		return (
			<div id="content">
				<Title />
				<MainBody />
			</div>
		);
	}
});

var Title = React.createClass ({
	render: function() {
		return (
			<div id="header">
				<div id="playlist"></div>
				<div id="titleBox">
					<h1 id="title">AUDIEM</h1>
					<h3 id="titleTag">Hear the moment</h3>
				</div>
			</div>
		);
	}
});

var SearchBar = React.createClass({
	handleSubmit: function(event) {
		event.preventDefault();
		var hashtag = this.refs.hashtag.value;
		$('#background').empty();
		this.props.onInstagramSearch(hashtag);
		this.props.onSpotifySearch(hashtag);
	},
	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" id="searchBox" name="artistname" ref="hashtag" placeholder="Enter a song or artist..." />
			</form>
		);
	}
});


var key = '91bd759fe1d84066ace0dae19428c7c6';

var MainBody = React.createClass({
	getInitialState: function() {

		return {hashtag: null, imageData: null, song: null}
	},
	handleInstagramSearch: function(hashtag) {
		this.InstagramSearch(hashtag); this.SpotifySearch(hashtag);
	},

	SpotifySearch: function(hashtag){
		$.ajax({
			method: 'get',
			url: 'https://api.spotify.com/v1/search',
			data: {
				q: hashtag,
				type: 'artist'
			},
			success: function(data) {
				var artistId = data.artists.items[0].id;
				console.log("Searching for artist ID", artistId);
				fetchAlbum(artistId);
			}.bind(this)
		});

		function fetchAlbum(artistId) {
			$.ajax({
				method: 'get',
				url: 'https://api.spotify.com/v1/artists/'+artistId+'/albums',
				success: function(data) {
					var albumID = data.items[0].id;
					var embed = '<iframe src="https://embed.spotify.com/?uri=spotify%3Aalbum%3A'+albumID+'&theme=white&view=coverart" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>';
					
					$('#playlist').html(embed);
				}
			});
		};
	},
	InstagramSearch: function(hashtag) {
		var hashJoin = hashtag.split(' ').join('');
		$.ajax({
			url: "https://api.instagram.com/v1/tags/"+hashJoin+"/media/recent?client_id=91bd759fe1d84066ace0dae19428c7c6",
			method: 'GET',
			data: {
				next_url: {}
			},
			dataType: 'jsonp',
			success: function(result) {
				var instagramData = result.data;
				for (var i=0; i<instagramData.length; i++) {
				var imageLink = instagramData[i].images.standard_resolution.url;
					// Creating the img tag
					var img = $('<img />', {
  						id: hashtag,
  						src: imageLink,
  						height: 200
					});

					// callAPI();

					// function callAPI() {
					// 	this.InstagramSearch(result.url_next, hashtag);
					// }

					img.appendTo($('#background'));
					$('#searchBox').val('');
					$('#searchBox').attr("placeholder", 'Hear more moments...');
				};

				this.setState({hashtag: hashtag});
			}.bind(this)
		});
	},
	render: function() {
		return (
			<div>
				<SearchBar onInstagramSearch={this.handleInstagramSearch} onSpotifySearch={this.SpotifySearch}/>
			</div>
		);
	}
});



var SpotifyPlayer = React.createClass({
	render: function() {
		return (
			<div id="spotifyPlayer">
				SPOTIFY PLAYER GOES HERE
			</div>
		);
	}
});


ReactDOM.render(<MainApp />, document.getElementById('content') );

