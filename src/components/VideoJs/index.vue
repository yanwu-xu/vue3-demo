<template>
  <video :key="props.keyId" ref="videoPlayer" id="my-player" :class="{ 'video-js': true, 'full-video': props.fullContainer }" data-setup="{}">
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank">
        supports HTML5 video
      </a>
    </p>
  </video>
</template>

<script setup lang="ts" name="Videojs">
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { ref, reactive, useAttrs, onMounted, onBeforeUnmount } from 'vue'

const attrs = useAttrs()
const props = defineProps({
  keyId: {
    type: [String, Number],
    default: 'player'
  },
  fullContainer: {
    type: Boolean,
    default: true
  },
  // See: [Options Guide](https://docs.videojs.com/tutorial-options.html)
  option: {
    type: Object,
    default: () => { }
  }
})

let player = ref(null)
let videoPlayer = ref(null)
let defaultOptions = reactive({
  muted: true,
  loop: true,
  preload: 'auto',
  autoplay: true,
  fluid: true,
  controls: true,
  poster: '',
  sources: [
    {
      src: '//vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4'
    }
  ]
})

onMounted(() => {
  initVideoPlayer()
})

onBeforeUnmount(() => {
  destoryPlayer()
  player.value = null
})

const initVideoPlayer = (): void => {
  const option = { ...defaultOptions, ...props.option }
  player.value = videojs(videoPlayer.value, option, function onPlayerReady(): void {
    if (!attrs.callback && typeof attrs.callback !== 'function') {
      const callback = function (that) {
        that.play()
      }
      callback(this)
    } else {
      this.$emit('callback', player)
    }
  })
}

const pauseVideo = (): void => {
  player.value.pause()
}

const updateVideoPlayerSrc = (sources): void => {
  if (!player.value) return
  player.value.pause()
  player.value.src(sources)
  player.value.load(sources)
  player.value.play()
}

const destoryPlayer = (): void => {
  pauseVideo()
  player.value && player.value.dispose()
}


defineExpose({
  player,
  initVideoPlayer,
  pauseVideo,
  updateVideoPlayerSrc,
  destoryPlayer
})
</script>

<style lang="scss" scoped>
.video-js {
  width: 100%;
  height: 100% !important;
  cursor: pointer;
}

.full-video {
  object-fit: cover;
}
</style>
