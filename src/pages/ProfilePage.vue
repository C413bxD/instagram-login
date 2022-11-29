<template>
  <v-container class="pa-10">
    <stories-section />
    <feed-section ref="feedSection"/>
  </v-container>
</template>

<script>
import StoriesSection from "../components/StoriesSection";
import FeedSection from "../components/FeedSection";
export default {
  components: {
    StoriesSection,
    FeedSection
  },
  methods:{
    GetPosts(){
      this.$refs.feedSection.getPosts();
    }
  }
};
</script>

<style>
</style>