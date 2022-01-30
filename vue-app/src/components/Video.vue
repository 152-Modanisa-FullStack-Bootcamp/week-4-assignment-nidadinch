<template>
  <div class="video-container">
    <img
        id="video-image"
        class="video-cover-image"
        :src="videoImage"
        :alt="video.title"
        @mouseover="videoImage = video.hoverImage"
        @mouseleave="videoImage = video.coverImage"
    />
    <h3 id="video-title" @click="goToWatchPage"> {{ video.title }} </h3>
  </div>
</template>

<script>
export default {
  name: "Video",
  props: {
    video: Object
  },
  data() {
    return {
      videoImage: this.video.coverImage,
      videoId: this.video.id,
    }
  },
  methods: {
    goToWatchPage(){
      this.$router.push("/watch/" + this.videoId);
    },
  },
}
</script>

<style scoped>

.video-container {
  width: 360px;
  margin: 0 25px 40px 25px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
}
.video-cover-image {
  cursor: pointer;
  display: block;
  width: 360px;
  height: 200px;
}
h3 {
  cursor: pointer;
}
h3:hover{
  cursor: pointer;
  color: #42b983;
}

</style>
