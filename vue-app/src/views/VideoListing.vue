<template>
  <div id="video-list">
    <Video
        class="video-list-item"
        v-for="video in videos"
        :key="video.id"
        :video="video"
        :data-id="video.id"
    ></Video>
  </div>
</template>

<script>
import Video from "@/components/Video";
import {API} from "@/api";

export default {
  name: "VideoListing",
  components: {Video},
  data(){
    return{
      videos:[],
    }
  },
  async mounted() {
    const api = new API(process.env.VUE_APP_BASE_API_URL)
    this.videos = await api.getVideoList()
    //console.log(this.videos)
  },
  methods:{

  }
}
</script>

<style scoped>
#video-list{
  width: 1280px;
  display: flex;
  flex-wrap: wrap;
  margin:auto;
  flex-direction: row;
}
</style>
