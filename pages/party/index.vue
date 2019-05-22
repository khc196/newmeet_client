<template>
  <div class="container-fluid">
  
    <div class="row">
      <div class="col-sm-1 col-md-2 col-lg-3">
      </div>
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 nopadding">
        <section class="party-container">
          <div class="party-list-div">
            <div id="banner" class="banner">
              <ul id="banner-list" class="banner-list">
                <template v-for="banner in banner_list">
                <li>
                <img
                class="img-banner"
                :src="banner"/>
                </li>
                </template>
              </ul>
              <div class="bt-left" v-on:click="plusDivs(-1)">&#10094;</div>
              <div class="bt-right" v-on:click="plusDivs(1)">&#10095;</div>
            </div>         
            <div id="nav-container" class="nav-container">
              <navtab />
            </div>
            <template v-for="(party, index) in partylist">
              <div :class="['mix party'+party.party_type]">
              <div :key="'md_'+index" class="month-div" v-if="activeMonth(party, index)">
                <div class="top-div"/>
                <div class="text-div">
                <p>{{ party.start_datetime.month }}</p>
                </div>
              </div>
              <div :key="'db_'+index" :id="'db_'+index" v-if="(party_tabs[0].active || party_tabs[parseInt(party.party_type)].active) && index > 0 && !activeMonth(party, index) && !isFirst(party, index) && party.start_datetime.date != partylist[index-1].start_datetime.date" class="day-bound"></div>
              <party-card :party="party"/>
              </div>
            </template>
          </div>
        </section>
      </div>
      <div class="col-sm-1 col-md-2 col-lg-3">
      </div>
    </div>
  </div>
  
</template>
<script>
import Navtab from '~/components/party/Navtab.vue';
import PartyCard from '~/components/party/PartyCard.vue';
import moment from 'moment'

let mixitup
if (process.client) {
  mixitup = require('mixitup')
}

export default {
  head() {
    return {
      title: "NewMeet"
    };
  },
  computed: {
    party_tabs() {
      return this.$store.state.party_tabs.list;
    }
  },
  components: {
    Navtab,
    PartyCard,
    moment,
    mixitup,
  },

  data: function() {
    return {
      slideIndex: 1,
      banner_list: ["/images/banner.jpg", "/images/banner2.jpg", "/images/banner3.jpg"],
      usereventon: false,
      timeoutevent: 0,
    }
  },
  async asyncData ({ $axios, params, store}) {
    let respartylist = [];
    let partylist = [];
    let active_tabs = [true, true, true];
    await $axios.$get('/parties/')
    .then( response => {
      partylist = response['results'];
      partylist.forEach(function(party) {
        var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        var days2 = ["일", "월", "화", "수", "목", "금", "토"];
        var color = ["red", "grey", "grey", "grey", "grey", "grey", "blue"];
        var monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "Sebtember", "October", "November", "December"]
        var monthes2 = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "11월", "12월"]
        var b = party['start_datetime'].split(/\D+/);
        var d = new Date(b[0]+'-'+b[1]+'-'+b[2]);
        party['start_datetime'] = {};
        party['start_datetime']['year'] = b[0];
        party['start_datetime']['month'] = monthes2[parseInt(b[1])-1];
        party['start_datetime']['month2'] = parseInt(b[1]);
        party['start_datetime']['date'] = parseInt(b[2]);
        party['start_datetime']['hour'] = b[3];
        party['start_datetime']['minute'] = b[4];
        party['start_datetime']['day'] = days[d.getDay()];
        party['start_datetime']['day2'] = days2[d.getDay()];
        party['color'] = '#e74717'
        respartylist.push(party);
      });
    }
    )
    return { 
      partylist: respartylist,
    };
  },
  methods: {
    isFirst: function(party, index) {
      var res1 = this.party_tabs.findIndex(
        function checkActive(obj) {
          return obj.active;
        }
      ) == parseInt(party.party_type);
      var res2 = this.partylist.findIndex(
        function checkFirst(obj) {
          return obj.party_type == party.party_type;
        }) == index;
      return res1 && res2
    },
    activeMonth: function(party, index) {
      var party_tabs = this.party_tabs;
      var res = this.partylist.findIndex(function checkMonth(obj) {
        return ((party_tabs[0].active || party_tabs[parseInt(obj.party_type)].active) && obj.start_datetime.month == party.start_datetime.month);
      })
      return res == index;
    },
    plusDivs: function(n) {
      this.showDivs(this.slideIndex += n);
    },
    showDivs: function(n) {
      var i;
      var x = document.getElementById("banner-list");
      if (n > this.banner_list.length) {this.slideIndex = 1} 
      if (n < 1) {this.slideIndex = this.banner_list.length}
      x.style.marginLeft = (this.slideIndex - 1) * -100 + '%';
      // for (i = 0; i < x.length; i++) {
      //   x[i].style.display = "none"; 
      // }
      // x[this.slideIndex-1].style.display = "block"; 
    },
    carousel: function() {
      this.slideIndex += 1; 
      this.showDivs(this.slideIndex);
      this.timeoutevent = setTimeout(this.carousel, 3000);
    },
    swipeLeftHandler: function() {
    },
    swipeRightHandler: function() {
    }
  },
  mounted() {
    var containerEl = document.querySelector('.party-list-div');
    var mixer = mixitup(containerEl, {
      selectors: {
        target: '.mix',
        control: '[data-mixitup-control]',
      },
      animation: {
        duration: 600
      }
    });
    var vm = this;

    var element = document.querySelector('.banner');
    var touch_start_y = 0;
    var touch_start_x = 0;
    var save_x = 0;
    var save_y = 0;
    var move_dx = 0;

    element.addEventListener( 'touchstart', function( e ) {
        
        if ( e.type === 'touchstart' && e.touches.length === 1 ) {
            touch_start_x = e.touches[ 0 ].pageX;
            touch_start_y = e.touches[ 0 ].pageY;
        }
    }, false );

    element.addEventListener( 'touchmove', function( e ) {
        var drag_dist = 0;
        var scroll_dist = 0;

        if ( e.type === 'touchmove' && e.touches.length === 1 ) {
            drag_dist = e.touches[ 0 ].pageX - touch_start_x;
            scroll_dist = e.touches[ 0 ].pageY - touch_start_y;
            move_dx = ( drag_dist / element.getBoundingClientRect().width ) * 100;

            if ( Math.abs( drag_dist ) > Math.abs( scroll_dist ) ) {
                // ... move slide element
                e.preventDefault( );
            }
        }
    }, false );
    element.addEventListener( 'touchend', function( e ) {

        if ( e.type === 'touchend' && e.touches.length === 0 ) {

            if (move_dx > 40 ) {
              vm.plusDivs(-1);
            } 
            else if(move_dx < -40) {
              vm.plusDivs(1);
            }
            else {
                // ... move slide element to save_x or save_y position
            }

            touch_start_y = 0;
            touch_start_x = 0;
            save_x = 0;
            save_y = 0;
            move_dx = 0;

        }
        vm.usereventon = false;
    }, false );
    this.carousel();
    window.onscroll = function() {
      myFunction()
    };
    // Get the navbar
    var navbar = document.getElementById("nav-container");

    // Get the offset positi of the navbar
    var sticky = navbar.offsetTop;
    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function fade() {
      navbar.style['opacity'] = 1.0;
    }

    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.style['opacity'] = 0.5;
        setTimeout(fade, 2000);
        navbar.classList.add("sticky")
      } else {
        navbar.style['opacity'] = 1.0;
        navbar.classList.remove("sticky");
      }
    }
    
  },
  watch: {
    party_tabs(val, oldVal) {
      party_tabs = val;
    }
  }

}
</script>
<style>
.button-div {
  width: 100%;
}
.bt-left {
  color: #ffffff;
  position: absolute;
  top:50%;
  left:1%; 
  z-index: 2;
}
.bt-right {
  position: absolute;
  color: #ffffff;
  top:50%;
  right: 1%;
  z-index: 2;
}
.nopadding {
   padding: 0 !important;
   margin: 0 !important;
}
.banner {
  width: 100%;
  background-color: #ffffff;
  text-align: center;
  left:0;
  right:0;
  position: relative;
  overflow: hidden;
}
.banner ul{
  list-style-type: none;
  margin-left: 0%;
  width: 300%;
  transition: 1s;
  padding: 0;
}
.banner .ul:after {
  content: "";
  display: block;
  clear:both;
}
.banner li{
  display: inline-block;
  float:left;
  width:33.3333%;
}
.img-banner {
  width: 100%;
}
.nav-container {
  width: 100%;
  height: 50px;
  text-align: center;
  right: 0;
  z-index: 99;
}
.sticky {
  position: fixed;
  top: 0;
  padding-top: 60px;
  z-index: 99;
  right: 0;
  left: 0;
}
.party-container {
  height: 100%;
  background-color: #e7e7e7;
}
.party-list-div {
  width: 100%;
  background-color: #e7e7e7;
}
.month-div {
  border: 0 0 0 0;
}
.month-div .top-div{
  height: 15px;
  background-color: #e7e7e7;

}
.month-div .text-div {
  background-color: #e7e7e7;
  padding: 1.5%;
}
.month-div p{
  margin-top: -1%;
  margin-bottom: -1%;
  font-weight: bold;
  font-size: 20px;
  color: #f75727;
}

.day-bound {
  height: 15px;
}
.day-bound .hidden {
  display: none;
}
</style>