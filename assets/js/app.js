const places = ["La Romana, Repubica Dominicana","Vila Verde, La Romana, Republica Dominicana","Romana Del Oeste, La Romana, Republica Dominicana"]
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

const placename = new Vue({
  el: '#place-name',
  data: {
    place: places[0]
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
    place: places[1]
  },
  mounted: function(){
    this.init()
  },
  methods:{
    init: function(){
      mainMap.init()
    }
  }
});



