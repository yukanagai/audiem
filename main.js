var MainApp = React.createClass({
	render: function() {
		return (
			<div id="free-wall">
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
		this.props.onSpotifySearch(hashtag);
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

				var instagramData = result.data;

				var imageArr = [];

				for (var i=0; i<instagramData.length; i++) {
					var imageLink = instagramData[i].images.standard_resolution.url;

					var img = $('<img />', {
  						id: hashtag,
  						src: imageLink,
  						alt: 'MyAlt',
  						width: 200
					});
					img.appendTo($('#free-wall'));
				};

				$("#free-wall").each(function() {
			        var wall = new freewall(this);
			        wall.reset({
			            selector: '.size320',
			            cellW: function(container) {
			                var cellWidth = 320;
			                if (container.hasClass('size320')) {
			                    cellWidth = container.width()/2;
			                }
			                return cellWidth;
			            },
			            cellH: function(container) {
			                var cellHeight = 320;
			                if (container.hasClass('size320')) {
			                    cellHeight = container.height()/2;
			                }
			                return cellHeight;
			            },
			            fixSize: 0,
			            gutterY: 20,
			            gutterX: 20,
			            onResize: function() {
			                wall.fitWidth();
			            }
			        })
			        wall.fitWidth();
			    });
	   			$(window).trigger("resize");
				this.setState({imageData: imageArr});
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




ReactDOM.render(<MainApp />, document.getElementById('content') );
