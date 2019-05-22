<template>
  <nuxt-link :class="['card', 'party-card']" :to="{ path: '/party/'+party.id }"  tag="div">
   <div class="card-date-div">
    <span class='centered'>
    <span class='horizon'>
    <span class='item'>
    <b :style="{ color: party.color }">{{ party.start_datetime.date }}<br>{{ party.start_datetime.day2 }}</b>
    </span>
    </span>
    </span>
   </div>
   <div class="card-img-wrapper">
        <div class="card-img">
            <div class="centered">
                <img :src="party.party_image.image"> 
                <!--img :src="'http://localhost:8000'+party.party_image.image"--> 
            </div>
        </div>
    </div>
    <div class="card-info-div">
      <div class="card-name-div">
        <tt class="card-name">{{ party.name }}</tt>
      </div>
      <div class="card-place-div">
        <img class="img-location" src="~/static/images/location.png"/>
        <tt class="card-place">{{ party.place_name }}</tt>
      </div>
      <div class="card-time-div">
        <img class="img-clock" src="~/static/images/clock.png"/>
        <tt class="card-time">{{ party.start_datetime.month2 }}.{{ party.start_datetime.date }} {{ party.start_datetime.day2 }} {{ party.start_datetime.hour }}:{{ party.start_datetime.minute }}</tt>
      </div>
       <div class="coupon-div">
        <span v-if="party.can_buy_ticket" class="box-coupon-yellow">
        <b>할인쿠폰</b>
        </span>
        <span v-if="party.can_prepurchase" class="box-coupon-blue">
        <b>사전예매</b>
        </span>
      </div>
      <div class="card-count-div">
        <div class="like-count-div">
            <span class="img-span">
            <img class="like-img" src="~/static/images/heart.png"/>
            </span>
            <span class="count-span">
            <tt>{{ party.like_count }}</tt>
            </span>
        </div>
        <div class="comment-count-div">
            <span class="img-span">
            <img class="comment-img" src="~/static/images/comment.png"/>
            </span>
            <span class="count-span">
            <tt>{{ party.comment_count }}</tt>
            </span>
        </div>
        <div class="view-count-div">
            <span class = "img-span">
            <img class="view-img" src="~/static/images/view.png"/>
            </span>
            <span class = "count-span">
            <tt>{{ party.view_count }}</tt>
            </span>
        </div>
      </div>
    </div>
    <div class="party-type-div">
      <span class="party-type-span">
      <tt>{{ party.type_name }}</tt>
      </span>
    </div>
  </nuxt-link>
</template>
<script>
export default {
    head:{
      link: [
      ]
    },
    props: ["party"],
    computed: {
      writing_comment_id() {
        return this.$store.state.writingCommentID;
      }
    },
    methods : {
        
    }
};
</script>
<style>
.like {
    background:url(/images/heart-icon.png)
}
.comment {
    background:url(/images/comment-icon.png)
}
.party-card {
    box-shadow: 0 0.2rem 0.2rem rgba(0,0,0,.2);
    display: block;
}
.card-date-div {
    text-align: center;
    display: table-cell;
}
.card-date-div .centered {
    width: 35px;
    display: table;
    margin-left: auto;
    margin-right: auto;
}
.card-date-div .centered .horizon {
    width: 35px;
    position: absolute;
    left: 0;
    top: 35px;
}
.card-date-div .centered .horizon .item b {
    font-weight: bold;
    opacity: 0.6;
}
    

.card-img-wrapper {
    width:100px;
    height:120px;
    display: table-cell;
    position: relative;
}
.card-img {
    padding-top: 100%;
    overflow: hidden;
}
.card-img .centered {
    posiition: absolute;
}
.card-img .centered img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    height: 120px;

}
.card-info-div {
    padding-left: 3%;
    padding-right: 0;
    margin-right: 0;
    width: 200px;
    right:0;
    position: relative;
    display: table-cell;
}
.card-info-div .card-name-div {
    position: absolute;
    top: 7%;
}
.card-info-div .card-name-div .card-name{
    font-weight: 400;
    font-size: 12px;
}
.card-info-div .card-time-div {
    position: absolute;
    top:35%;
}
.card-time{
    font-size: 11px;
    color: gray;
}
.card-info-div .card-place-div {
    position: absolute;
    top:22%;
}
.card-info-div .card-place-div .img-location {
    width: 13px;
    height: 13px;
}
.card-info-div .card-time-div .img-clock {
    width: 13px;
    height: 13px;
}
.coupon-div {
    position: absolute;
    top:60%;
}
.card-info-div .card-place-div .card-place{
    font-size: 11px;
    color: grey;
    -webkit-text-stroke: 1px rgba(0,0,0,0.1)
}

.card-info-div .card-count-div {
    position: absolute;
    text-align: center;
    justify-content: center;
    top: 75%;
    display: table;
    margin-left: -3px;
}

.img-span {
  display: inline-block;
  width:13px;
  text-align: left;
}
.count-span {
  margin-left: -3px;
  width: 24px;
}
.like-count-div {
  display: table-cell;
  width : 37px;
  text-align: left;
}
.like-img {
  width:13px;
  height:13px;
}
.view-count-div {
  display: table-cell;
  width : 37px;
  text-align: left;
}
.view-img{
  width:13px;
  height:13px;
}
.comment-count-div {
  display: table-cell;
  width : 37px;
  text-align: left;
}
.comment-img{
  margin-top: 1px;
  width:12px;
  height:12px;
}
.like-count-div tt,
.view-count-div tt,
.comment-count-div tt{
  font-size:7px;
  color:grey;
}
.party-type-div {
  position: absolute;
  float: right;
  top: 75%;
  right: 5%;
}
.party-type-div tt {
  color: #f75727;
  text-transform: uppercase;
  font-size: 12px;
}


.box-coupon-blue { 
  width:60px;
  background-color: transparent;
  text-decoration: none;
  border-radius: 0.2rem;
  color: #8a8a8a;
  transition: all ease 0.4s;
  display: table-cell;
}
.box-coupon-yellow {
  width:60px;
  background-color: transparent;
  text-decoration: none;
  border-radius: 0.2rem;
  color: #8a8a8a;
  transition: all ease 0.4s;
  display: table-cell;
}
.box-coupon-blue b {
  font-size:11px;
  font-weight: 300;
  color: #556bcc;
}
.box-coupon-yellow b {
  font-size:11px;
  font-weight: 300;
  color: #FF8C00;
}




</style>