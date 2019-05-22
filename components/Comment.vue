<template>
  <div class="comment-card">
    <div class="comment-name">
        <tt>{{ comment.user_name }}</tt>
    </div>
    <div class="comment-content">
        <tt>{{ comment.comment }}</tt>
    </div>
    <div class="comment-time">
        <tt class="time-and-loc">{{ comment.created_at.month2 }}/{{ comment.created_at.date }} {{ comment.created_at.day2 }} {{ comment.created_at.hour }}:{{ comment.created_at.minute }}</tt>
    </div>
  </div>
</template>
<script>
export default {
    head:{
      link: [
      ]
    },
    props: ["comment"],
    computed: {
   
    },
    methods : {
        
    }
};
</script>
<style>
.comment-card {
    padding:2%;
    border-bottom: 0.1px solid #cecece;
}
.comment-name {
    font-weight: bold;
    font-size: 11px;
}
.comment-content {
    font-size: 11px;
    padding-top: 1%;
}
.comment-time {
    font-weight: bold;
    color: gray;
    font-size: 10px;
    padding-top: 2%;
}

</style>