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
  methods:{
    showElement: function(){
      var el = $('#select-search').find('option:checked')
      var lat = el.attr('data-lat')
      var lng = el.attr('data-lng')
      selectView.setMapCenter({lat: Number(lat),lng: Number(lng)},true)
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



