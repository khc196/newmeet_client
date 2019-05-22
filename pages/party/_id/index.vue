<template>
  <main class="container-fluid">
    <div class="party-name">
        <tt>{{ party.name }} {{ party.type_name }}</tt>
      </div> 
      <div class="party-date-and-loc">
        <tt class="time-and-loc">{{ party.start_datetime.month2 }}.{{ party.start_datetime.date }} {{ party.start_datetime.day2 }} {{ party.start_datetime.hour }}:{{ party.start_datetime.minute }} {{ party.place_name }} </tt>
      </div>
    <div class="row">
      <div class="col-sm-10 col-md-10 col-lg-5" style="margin-left:auto; margin-right:auto;">
        <div class="card">
          <div class="party-img">
            <div class="party-img-inner">
              <ul id="image-list" class="image-list">
                  <template v-for="image in party.party_images">
                  <li>
                  <!--img
                  class="img-fluid"
                  :src="'http://localhost:8000'+image.image"/-->
                  <img
                  class="img-fluid"
                  :src="image.image"/>
                  </li>
                  </template>
              </ul>
              <div v-if="party.party_images.length > 1" class="bt-left" v-on:click="plusDivs(-1)">&#10094;</div>
              <div v-if="party.party_images.length > 1" class="bt-right" v-on:click="plusDivs(1)">&#10095;</div>
              <!--img
                class="img-fluid"
                :src="party.image"
                alt
              -->
            </div>
          </div>
        </div>
      </div>
      
      <div class="col-sm-10 col-md-10 col-lg-5" style="margin:auto">
        <div class="card">
          <div class="party-detail-wrapper">
            <span class="party-details">
              <div v-for="(line, index) in party['detail_lines']" :key="index" class="detail_line">
                <tt>{{ line }}</tt>
              </div> 
            </span>
          </div> 
          <div class="button-div">
            <button v-if="party['can_buy_ticket']" class="button button-ticket" @click="(event) => { event.stopPropagation(); }"> 
            <img class="button-img" src="~/static/images/ticket.png"/> 
            <b class="fa">Ticket</b>
            </button>
            <button v-else class="button button-ticket no" @click="(event) => { event.stopPropagation(); }"> 
            <img class="button-img" src="~/static/images/ticket.png"/> 
            <b class="fa">Ticket</b>
            </button>
            <button class="button button-share" id="kakao-link-btn" v-on:click="kakaoShare()">
            <img class="button-img" src="~/static/images/share.png"/> 
            <b class="fa">Share</b>
            </button>
            <button class="button button-map" @click= "(event) => { toggleMap() }">
            <img class="button-img" src="~/static/images/location2.png"/> 
            <b class="fa">Map</b>
            </button>
            <button v-if="!party.is_liked" class="button button-like" @click= "(event) => { like(event, party) }">
            <img class="button-img" src="~/static/images/heart2.png"/> 
            <b class="fa">{{ party.like_count }}</b>
            </button>
            <button v-else class="button button-like liked" @click="(event) => { like(event, party); }"> 
            <img class="button-img" src="~/static/images/heart2_liked.png"/> 
            <b class="fa"> {{ party.like_count }}</b>
            </button>
            
          </div>
        </div>
        
        <div class="card">
          <div class="party-comment-wrapper">
            <div class="party-comment-header">
              <tt>댓글 {{ party.comment_count }}</tt>
            </div>
            <div class="comment-write-wrapper">
              <button class="comment-write-button" @click="(event) => { send_comment(event, party) }">작성</button>
              <div class="comment-write">
                <input class="input-comment" :id="'ic-'+party.id" @keyup.enter="send_comment(null, party)" @click="(event) => { event.stopPropagation(); }" type="text" placeholder="내용을 입력해주세요"/>
              </div>
            </div>
            <template v-for="(comment, index) in party.party_comments">
               <Comment :key="index" :comment="comment"/>
            </template>
          </div>
        </div>
      </div>
      </div>

      <div v-if="mapShow" class="map-backdrop" @click="toggleMap">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-2 col-md-1"/>
              <div class="col-xs-8 col-md-10">
                <div class="map-container">
                  <div class="map-card">
                    <Map 
                    :appKey="appKey"
                    :center.sync="center"
                    :level.sync="level"
                    :mapTypeId="mapTypeId"
                    :libraries="libraries"
                    @load="mapLoad" 
                    @center_changed="onMapEvent('center_changed', $event)"
                    @zoom_start="onMapEvent('zoom_start', $event)"
                    @zoom_changed="onMapEvent('zoom_changed', $event)"
                    @bounds_changed="onMapEvent('bounds_changed', $event)"
                    @click="onMapEvent('click', $event)"
                    @dblclick="onMapEvent('dblclick', $event)"
                    @rightclick="onMapEvent('rightclick', $event)"
                    @mousemove="onMapEvent('mousemove', $event)"
                    @dragstart="onMapEvent('dragstart', $event)"
                    @drag="onMapEvent('drag', $event)"
                    @dragend="onMapEvent('dragend', $event)"
                    @idle="onMapEvent('idle', $event)"
                    @tilesloaded="onMapEvent('tilesloaded', $event)"
                    @maptypeid_changed="onMapEvent('maptypeid_changed', $event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import Comment from '~/components/Comment.vue';
import Map from '~/components/Map.vue';
export default {
  head() {
    return {
      title: "NewMeet - "+this.party.name,
      script: [
        { src: "//developers.kakao.com/sdk/js/kakao.min.js" }
      ]
    };
  },
  async asyncData({ $axios, params }) {
    try {
      let party = await $axios.$get(`/parties/${params.id}`);
      var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      var days2 = ["일", "월", "화", "수", "목", "금", "토"];
      var monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "Sebtember", "October", "November", "December"]
      var b = party['start_datetime'].split(/\D+/);
      var d = new Date(b[0]+'-'+b[1]+'-'+b[2]);
      party['start_datetime'] = {};
      party['start_datetime']['year'] = b[0];
      party['start_datetime']['month'] = monthes[parseInt(b[1])-1];
      party['start_datetime']['month2'] = parseInt(b[1]);
      party['start_datetime']['date'] = parseInt(b[2]);
      party['start_datetime']['hour'] = b[3];
      party['start_datetime']['minute'] = b[4];
      party['start_datetime']['day'] = days[d.getDay()];
      party['start_datetime']['day2'] = days2[d.getDay()];
      party['detail_lines'] = party['description'].split('\n');
      for(var i = 0; i < party['party_comments'].length; i++ ) {
        var c = party['party_comments'][i]['created_at'].split(/\D+/);
        var e = new Date(c[0]+'-'+c[1]+'-'+c[2]);
        party['party_comments'][i]['created_at'] = {}
        party['party_comments'][i]['created_at']['year'] = c[0];
        party['party_comments'][i]['created_at']['month'] = monthes[parseInt(c[1])-1];
        party['party_comments'][i]['created_at']['month2'] = parseInt(c[1]);
        party['party_comments'][i]['created_at']['date'] = parseInt(c[2]);
        party['party_comments'][i]['created_at']['hour'] = c[3];
        party['party_comments'][i]['created_at']['minute'] = c[4];
        party['party_comments'][i]['created_at']['day'] = days[e.getDay()];
        party['party_comments'][i]['created_at']['day2'] = days2[e.getDay()];
        
      }
      let center = { lat:parseFloat(party['place_lat']), lng:parseFloat(party['place_lon']) };
      return { party, center };
    } catch (e) {
      return { party: {}, center: {} };
    }
  },
  components: {
    Comment,
    Map,
  },
  methods: {
    send_comment: function(event, party) {
      if(this.$store.state.userInfo == null) {
        alert('로그인 후 이용 바랍니다.');
        return;
      }
      let form = new FormData();
      var content = document.getElementById('ic-'+party.id).value
      form.append('content', content)
      this.$axios.$post('/parties/' + party.id + '/comment/create/', form)
      .then((response) => {
        var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        var days2 = ["일", "월", "화", "수", "목", "금", "토"];
        var monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "Sebtember", "October", "November", "December"]
        var c = response['created_at'].split(/\D+/);
        var e = new Date(c[0]+'-'+c[1]+'-'+c[2]);
        response['created_at'] = {}
        response['created_at']['year'] = c[0];
        response['created_at']['month'] = monthes[parseInt(c[1])-1];
        response['created_at']['month2'] = parseInt(c[1]);
        response['created_at']['date'] = parseInt(c[2]);
        response['created_at']['hour'] = c[3];
        response['created_at']['minute'] = c[4];
        response['created_at']['day'] = days[e.getDay()];
        response['created_at']['day2'] = days2[e.getDay()];
        party['party_comments'].push(response);
        party['comment_count'] += 1;
        document.getElementById('ic-'+party.id).value = '';
        
      })
    },
    like: function(event, party) {
      if(this.$store.state.userInfo == null) {
        alert('로그인 후 이용 바랍니다.');
        return;
      }
      this.$axios.$post('/parties/' + party.id + '/like/')
      .then((response) => {
          if(response=='success') {
            if(party.is_liked) party.like_count--;
            else party.like_count++;
            party.is_liked = !party.is_liked;
            if(event.target.classList[0] != 'fa') {
              event.target.classList.toggle('liked');
            }
          }
          else {
            alert('알 수 없는 오류가 발생하였습니다')
          }
      })
    },
    mapLoad(map) {
      // 지도의 현재 영역을 얻어옵니다
      var bounds = map.getBounds();
      // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
      var boundsStr = bounds.toString();
      console.log('Daum Map Loaded', boundsStr);
      this.mapObject = map;
    },
    onMapEvent (event, params) {
      console.log(`Daum Map Event(${event})`, params);
      if(event == 'click'){
        params.stopPropagation()
      }
    },
    toggleMap() {
      this.mapShow = !this.mapShow;
    },
    plusDivs: function(n) {
      this.showDivs(this.slideIndex += n);
    },
    showDivs: function(n) {
      var i;
      var x = document.getElementById("image-list");
      if (n > this.party.party_images.length) {this.slideIndex = 1} 
      if (n < 1) {this.slideIndex = this.party.party_images.length}
      x.style.marginLeft = (this.slideIndex - 1) * -100 + '%';
    },
    kakaoShare: function() {
      try {
        Kakao.init(this.appKey);
      }
      catch(e) {
        console.log(e);
      }
      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: this.party.name + ' ' + this.party.type_name,
          description: '#뉴밋 #NewMeet #'+ this.party.type_name + ' #'+ this.party.place_name,
          imageUrl: process.env.apihost+this.party.party_images[0].image,
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com'
          }
        },
        social: {
          likeCount: this.party.like_count,
          commentCount: this.party.comment_count,
          viewCount: this.party.view_count
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: 'https://developers.kakao.com',
              webUrl: 'https://developers.kakao.com'
            }
          },
        ]
      })
    },
  },
  mounted() {
    this.showDivs(this.slideIndex);
    
    var vm = this;
    var element = document.querySelector('.party-img-inner');
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
  },
  data() {
    return {
      appKey: process.env.APPKEY,
      level: 3,
      mapTypeId: Map.MapTypeId.NORMAL,
      libraries: [],
      mapObject: null,
      mapShow: false,
      slideIndex: 1,
    };
  }
};
</script>
<style scoped>
.card {
  background-color: #fefefe;
}
.party-name {
  padding: 1%;
  text-align: center;
}
.party-name tt{
  font-size: 20px;
}
.party-date-and-loc {
  text-align: center;
}
.party-date-and-loc .time-and-loc{
  color: gray;
  font-size: 18px;
}


.party-detail-wrapper {
  text-align: center;
  padding: 3%;
}
.party-details {
  font-size: 12px;
  text-align: left;
}
.button-div {
  padding-top: 2%;
  padding-bottom: 5%;
  text-align: center;
}
.button-img {
  float:left;
  margin-top: 5%;
  width: 15px;
  height: 15px;
}
.button-share {
  width: 20%;
  height: 30px;
  border: 2px solid	#2E8B57;
  background-color:	#2E8B57;
  text-decoration: none;
  vertical-align: middle;
  text-align: center;
  border-radius: 0.5rem;
  color: #ffffff;
  transition: all ease 0.4s;
  display: table-cell;
  margin: 0.5%;
}
.button-ticket {
  width: 20%;
  height: 30px;
  border: 2px solid #FF8C00;
  background-color: #FF8C00;
  text-decoration: none;
  vertical-align: middle;
  text-align: center;
  border-radius: 0.5rem;
  color: #ffffff;
  transition: all ease 0.4s;
  display: table-cell;
  margin: 0.5%;
}
.no {
  border: 2px solid #CCCCCC;
  background-color: #CCCCCC;
}
.button-map {
  width: 20%;
  height: 30px;
  border: 2px solid #4169E1;
  background-color: #4169E1;
  text-decoration: none;
  vertical-align: middle;
  text-align: center;
  border-radius: 0.5rem;
  color: #ffffff;
  transition: all ease 0.4s;
  display: table-cell;
  margin: 0.5%;
}
.button-like {
  width: 20%;
  height: 30px;
  border: 2px solid #DC143C;
  background-color: #DC143C;
  text-decoration: none;
  vertical-align: middle;
  text-align: center;
  border-radius: 0.5rem;
  color: #ffffff;
  transition: all ease 0.4s;
  display: table-cell;
  margin: 0.5%;
}
.fa{
  font-size: 12px;
  transition: all ease 0.4s;
  font-style: normal;
}
.button-like:hover {
  opacity: 0.5;
}
.button-share:hover {
  opacity: 0.5;
}
.button-map:hover {
  opacity: 0.5;
}
.button-ticket:hover {
  opacity: 0.5;
}
.no:hover {
  opacity: 1.0;
  cursor: default;
}
.liked {
  background-color: #FF0000;
  border-color: #FF0000;
  color: #fefefe,
}

.liked .fa{
  color: #fefefe,
}

.party-comment-wrapper {

}
.comment-write-wrapper {
  height : 40px;
}
.comment-write {
  overflow: hidden;
}
.comment-write input{
  width: 100%;
  height: 40px;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #DDD;
  box-shadow: inset 0 0 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF;
  padding: 2%;
}
.comment-write-button{
  border-radius: 0.5rem;
  background-color:#1bd5a7;
  border:none;
  color: white;
  width: 50px;
  height: 40px;
  float: right;
}
.party-comment-header {
  padding: 1%;
  text-align: center;
  font-size: 15px;
  border-bottom: 1px solid #cecece;
}

.map-backdrop {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position:fixed;
  z-index: 1000;
  top: 60px;
  left: 0;
}
.map-container {
  width: 100%;
  height: 60vh;
  padding-top: 50px;
  text-align: center;
  justify-content: center; 
}
.map-card {
  width: 100%;
  height: 100%;
}
.party-img {
  padding: 5%;
  text-align: center;
}
.img-fluid {
  width: 90%;
  border-radius: 10px; 
}
.party-img-inner {
  width: 100%;
  background-color: #ffffff;
  text-align: center;
  left:0;
  right:0;
  position: relative;
  overflow: hidden;
}
.party-img-inner ul{
  list-style-type: none;
  margin-left: 0%;
  width: 300%;
  transition: 1s;
  padding: 0;
}
.party-img-inner .ul:after {
  content: "";
  display: block;
  clear:both;
}
.party-img-inner li{
  display: inline-block;
  float:left;
  width:33.3333%;
}

.bt-left {
  color: #000000;
  position: absolute;
  top:50%;
  left:1%; 
  z-index: 2;
  cursor: pointer;
}
.bt-right {
  position: absolute;
  color: #000000;
  top:50%;
  right: 1%;
  z-index: 2;
  cursor: pointer;
}
</style>