console.log('script loaded in');

$(document).ready(function(){
  bindSearch();
})

function bindSearch(){
  $('#search-form').submit(function(e){
    e.preventDefault();
    var query = $('#query').val();
    console.log('clicked');
    console.log(query);
    searchArtist(query);
  })
}

function searchArtist(query) {
  $.ajax({
    method: 'get',
    url: 'https://api.spotify.com/v1/search',
    data: {
      q: query,
      type: 'artist'
    },
    success: function(data) {
      var artistId = data.artists.items[0].id;
      fetchTopTracks(artistId);
    }
  })
}

function fetchTopTracks(id) {
  $.ajax({
    method: 'get',
    url: 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US',
    data: {
      country: 'US'
    },
    success: function(data) {
      console.log(data);
    }
  })
}
