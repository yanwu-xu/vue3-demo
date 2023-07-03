<template>
  <video
    :key="props.keyId"
    ref="videoPlayer"
    id="my-player"
    :class="{ 'video-js': true, 'full-video': props.fullContainer }"
    data-setup="{}"
  >
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank"> supports HTML5 video </a>
    </p>
  </video>
</template>

<script setup lang="ts" name="Videojs">
  import videojs from 'video.js'
  import 'video.js/dist/video-js.css'
  import type Player from 'video.js/dist/types/player'
  import { ref, reactive, useAttrs, onMounted, onBeforeUnmount } from 'vue'

  const attrs = useAttrs()
  const props = withDefaults(
    defineProps<{
      keyId: string | number
      fullContainer: boolean
      option?: any
    }>(),
    {
      keyId: 'player',
      fullContainer: true,
      option: {}, // See: [Options Guide](https://docs.videojs.com/tutorial-options.html)
    }
  )
  const emit = defineEmits<{
    (event: 'callback', player: Player): void
  }>()

  let player = ref<Player | null>(null)
  let videoPlayer = ref<HTMLVideoElement | null>(null)
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
        type: 'video/mp4',
      },
    ],
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
    player.value = videojs(
      videoPlayer.value as HTMLVideoElement,
      option,
      function onPlayerReady(): void {
        if (!attrs.callback && typeof attrs.callback !== 'function') {
          const callback = function (that) {
            that.play()
          }
          callback(player.value)
        } else {
          emit('callback', player.value as Player)
        }
      }
    )
  }

  const pauseVideo = (): void => {
    if (!player.value) return
    player.value.pause()
  }

  const updateVideoPlayerSrc = (sources): void => {
    if (!player.value) return
    player.value.pause()
    player.value.src(sources)
    player.value.load()
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
    destoryPlayer,
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
