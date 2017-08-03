const collection = {
  currentPlace: {},
  currentPos: {},
  places: ["Eiffel Tower","Big Ben","Google, Mountain View","Yankee Stadium","Wembley","Great Cayon"],
  locations: [],
  streetView: false,
  placeImage: false,
  appDetails: {
    name: 'Neighborhood Tour',
    shortName: 'Tour',
    largeName: 'Neighborhood Tour'
  },
  test: []
}

const header = new Vue({
  el: '#header',
  data:{
    appDetails: collection.appDetails
  },
  mounted: function(){
    this.checkSize();

    $(window).on('resize',function(){
      header.checkSize()
    })  
  },
  methods:{
    toggleMenu: function(){
      locationView.toggle();
    },
    checkSize: function(){
      var width = window.innerWidth
      if(width <= 768){
        this.appDetails.name = this.appDetails.shortName
      }else{
        this.appDetails.name = this.appDetails.largeName
      }
    }
  }
});

const selectView = new Vue({
  el: '#search-info',
  data: {
    places: collection.places,
    locations: collection.locations
  },
  mounted: function(){
    var select      = $("#select-search").select2()
    var $placeImage = $('#place-image')
    var attributes

    select.on('select2:select',function(e){
      attributes =            e.params.data.element.attributes
      var id                  = attributes.getNamedItem('data-id').value
      var theLocation         = collection.locations[id]
      var latlng              = {lat: theLocation.lat, lng: theLocation.lng}
      collection.currentPos   = latlng
      $placeImage.html()
      placeImage.currentPlace = theLocation
      selectView.setMapCenter(collection.currentPos,true)
      if(collection.streetView) mainMap.setStreetView(collection.currentPos)
    })
  },
  methods:{
    showElement: function(){
    },
    setMapCenter: function(coords,zoom){
      mymap.setCenter(coords,zoom)
    },

    toggleStreetView: function(){
      if(!collection.streetView){
        mainMap.setStreetView(collection.currentPos)
        $('#street-view').css({visibility:"visible"})
      }else{
        $('#street-view').css({visibility:"hidden"})
      }
      collection.streetView = !collection.streetView
    },
    showPictures: function(){
      placeImage.showPictures()
    }
  }
});

const locationView = new Vue({
  el: '#location-list',
  data: {
    locations: collection.locations,
    visible: false
  },
  methods:{
    
    toggle:function(){
     this.visible = !this.visible
    }
  }
});

const mymap = new Vue({
  el: '#map',
  data: {
    places: collection.places
  },
  mounted: function(){
    this.init(this.places)
  },
  methods:{
    init: function(places){
      mainMap.init(places)
    },
    setCenter: function(coords,zoom){
      mainMap.setCenter(coords,zoom)
    }
  }
});

const placeImage = new Vue({
  el: '#place-image',
  data: {
    currentPlace: collection.currentPlace
  },
  methods:{
    showPictures: function(){
      if(!collection.placeImage){
        $('#place-image').css({visibility:"visible"})
      }else{
        $('#place-image').css({visibility:"hidden"})
      }
      collection.placeImage = !collection.placeImage
    }
  }
})



