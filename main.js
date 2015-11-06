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
			<div id="titleBox">
				<h1 id="title">AUDIEM</h1>
				<h3 id="titleTag"s>Hear the moment</h3>
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
				<input type="text" id="searchBox" name="artistname" ref="hashtag" placeholder="Enter, song, artists, genre..." />
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

				for (var i=0; i<instagramData.length; i++) {
					var imageLink = instagramData[i].images.standard_resolution.url;
					
					console.log("imagelink", imageLink);
					
					var img = $('<img />', { 
  						id: hashtag,
  						src: imageLink,
  						alt: 'MyAlt',
  						height: 200
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