<template>
  <VVerticalCarousel :images="images" />
</template>

<script>
import { mapGetters } from "vuex"
import VVerticalCarousel from "@/components/VVerticalCarousel"

export default {
  components: { VVerticalCarousel },
  computed: mapGetters({ images: "gallery/images" })
}
</script>
