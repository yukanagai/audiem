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
			console.log("DATA!", data);
			var artistId = data.artists.items[0].id;
			fetchTopTracks(artistId);
		}.bind(this)
	})
		function fetchTopTracks(id){
			$.ajax({
				method: 'get',
				url: 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US',
				data: {
					country: 'US'
				},
				success: function(data) {
				console.log('trackID', data.tracks[0].id);
				var track = data.tracks[0].id
				var embed = '<iframe src="https://embed.spotify.com/?uri=spotify:track:'+track+'" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'
				$('#playlist').html(embed);
				}
			})
		}
	},

	InstagramSearch: function(hashtag) {
		$.ajax({
			url: "https://api.instagram.com/v1/tags/"+hashtag+"/media/recent?client_id=91bd759fe1d84066ace0dae19428c7c6",
			method: 'GET',
			data: {
				next_url: {}
			},
			dataType: 'jsonp',
			success: function(result) {

				console.log("RESULT", result);
				console.log("RESULT URL", result.pagination.next_url);
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

