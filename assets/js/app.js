const places = ["Sillicon Valley, California, USA","Vila Verde, La Romana, Republica Dominicana","Romana Del Oeste, La Romana, Republica Dominicana"]
const locations = []



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
    places: places,
    locations: locations
  },
  mounted: function(){
    var select = $("#select-search").select2();
    select.on('select2:select',function(e){
      var attributes = e.params.data.element.attributes
      var lat = attributes.getNamedItem('data-lat').value
      var lng = attributes.getNamedItem('data-lng').value
      selectView.setMapCenter({lat: Number(lat),lng: Number(lng)},true)
    })

    // var option = document.createElement('option')
    // option.attributes.getNamedItem('data-lat').val
  },
  methods:{
    showElement: function(){
   
    },
    setMapCenter: function(coords,zoom){
      mymap.setCenter(coords,zoom)
    }
  }
});

const locationView = new Vue({
  el: '#location-list',
  data: {
    locations: locations,
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
    places: places
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



