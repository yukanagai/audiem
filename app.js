var Instagram = React.createClass({
  getInitialState: function(){
    return {data: []}
  },

  componentDidMount: function(){
    this.loadImages(this.props.instaHashtag)
  },

  loadImages: function(search){
    $.ajax({
      url: 'https://api.instagram.com/v1/tags/'+ search + /media/recent?client_id=91bd759fe1d84066ace0dae19428c7c6'
    })
  }
})
