<template>
  <div class="cd-tab-filter-wrapper">
    <div class="cd-tab-filter">
      <ul>
        <template v-for="(tab, index) in party_tabs"> 
        <li v-if="tab.active" :key="index" class="filter" @click="toggle(tab)" data-mixitup-control :data-filter="tab.value">
        <a class="selected">{{ tab.name }}</a>
        </li>
        <li v-else :key="index" class="filter" @click="toggle(tab)" data-mixitup-control :data-filter="tab.value">
        <a>{{ tab.name }}</a>
        </li>
        </template>
      </ul> <!-- cd-filters -->
    </div> <!-- cd-tab-filter -->
  </div> <!-- cd-tab-filter-wrapper -->
</template>


<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    party_tabs() {
      return this.$store.state.party_tabs.list;
    }
  },
  data: function() {
    return {
    }
  },
  methods: {
    select_all: function() {

    },
    ...mapMutations({
      toggle: 'party_tabs/toggle'
    })
  },
}
</script>

<style>

/* -------------------------------- 
Primary style
-------------------------------- */
*, *::after, *::before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

html {
  font-size: 66%;
}

html * {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-size: 1.6rem;
  color: #331d35;
  background-color: #e7e7e7;
}

a {    
  cursor: pointer;
  //color: #41307c;
  color: #f75727;
  text-decoration: none;
}

/* -------------------------------- 
Main Components 
-------------------------------- */
/* -------------------------------- 
xtab-filter 
-------------------------------- */
.cd-tab-filter-wrapper {
  background-color: #ffffff;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
  z-index: 1;
}
.cd-tab-filter-wrapper:after {
  content: "";
  display: table;
  clear: both;
}

.cd-tab-filter {
  /* tabbed navigation style on mobile - dropdown */
  position: relative;
  height: 50px;
  width: 140px;
  margin: 0 auto;
  z-index: 1;
}
.cd-tab-filter::after {
  /* small arrow icon */
  content: '';
  position: absolute;
  right: 14px;
  top: 50%;
  bottom: auto;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  display: inline-block;
  width: 16px;
  height: 16px;
  background: url("~static/images/arrow.svg") no-repeat center center;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
  pointer-events: none;
}
.cd-tab-filter ul {
  position: absolute;
  list-style-type: none;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  background-color: #ffffff;
  box-shadow: inset 0 -2px 0 #41307c;
}
.cd-tab-filter li {
  display: none;
}
.cd-tab-filter a {
  display: block;
  /* set same size of the .cd-tab-filter */
  cursor: pointer;
  height: 50px;
  width: 140px;
  line-height: 50px;
}
.cd-tab-filter a.selected {
  background: #41307c;
  color: #f75727;
  color: #ffffff;
  cursor: pointer;
}
.cd-tab-filter.is-open::after {
  /* small arrow rotation */
  -webkit-transform: translateY(-50%) rotate(-180deg);
  -moz-transform: translateY(-50%) rotate(-180deg);
  -ms-transform: translateY(-50%) rotate(-180deg);
  -o-transform: translateY(-50%) rotate(-180deg);
  transform: translateY(-50%) rotate(-180deg);
}
.cd-tab-filter.is-open ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  box-shadow: inset 0 -2px 0 #41307c, 0 2px 10px rgba(0, 0, 0, 0.2);
}
.cd-tab-filter.is-open ul li {
  display: block;
}
.cd-tab-filter.is-open .placeholder a {
  /* reduces the opacity of the placeholder on mobile when the menu is open */
  opacity: .4;
}
  .cd-tab-filter {
    /* tabbed navigation style on medium devices */
    width: auto;
    cursor: pointer;
  }
  .cd-tab-filter::after {
    /* hide the arrow */
    display: none;
  }
  .cd-tab-filter ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    background: transparent;
    position: static;
    box-shadow: none;
    text-align: center;
  }
  .cd-tab-filter li {
    display: inline-block;
  }
  .cd-tab-filter a {
    display: inline-block;
    padding: 0 1em;
    width: auto;
    color: #9a9a9a;
    text-transform: uppercase;
    font-size: 1.3rem;
    cursor: pointer;
  }
  .no-touch .cd-tab-filter a:hover {
    color: #41307c;
  }
  .cd-tab-filter a.selected {
    background: transparent;
    //color: #41307c;
    color: #f75727;
    /* create border bottom using box-shadow property */
    //border-bottom: 2px #41307c solid;
    border-bottom: 2px #f75727 solid;
  }
  .cd-tab-filter.is-open ul li {
    display: inline-block;
  }
@media only screen and (min-width: 1170px) {
  .cd-tab-filter {
    /* tabbed navigation on big devices */
    width: 100%;
    float: right;
    margin: 0;
    -webkit-transition: width 0.3s;
    -moz-transition: width 0.3s;
    transition: width 0.3s;
  }
  .cd-tab-filter.filter-is-visible {
    /* reduce width when filter is visible */
    width: 80%;
  }
}
</style>