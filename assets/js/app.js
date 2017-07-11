const collection = {
  currentPlace: {},
  places: ["Eiffel Tower","Big Ben","Google, Mountain View","Yankee Stadium","Wembley","Great Cayon"],
  locations: [],
  streetView: false
}


const header = new Vue({
  el: '#header',
  data:{

  },
  methods:{
    toggleMenu: function(){
      locationView.toggle();
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
    var select = $("#select-search").select2();
    select.on('select2:select',function(e){
      var attributes = e.params.data.element.attributes
      var lat = attributes.getNamedItem('data-lat').value
      var lng = attributes.getNamedItem('data-lng').value
      collection.currentPlace = {lat: Number(lat),lng: Number(lng)}
      selectView.setMapCenter(collection.currentPlace,true)
      if(collection.streetView) mainMap.setStreetView(collection.currentPlace)
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
        mainMap.setStreetView(collection.currentPlace)
        $('#street-view').css({visibility:"visible"})
      }else{
        $('#street-view').css({visibility:"hidden"})
      }
      collection.streetView = !collection.streetView

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



