<template>
  <div class="home">
    <VideoListing></VideoListing>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import VideoListing from "@/views/VideoListing";

export default {
  name: 'Home',
  components: {
    Header,
    VideoListing
  }
}
</script>
