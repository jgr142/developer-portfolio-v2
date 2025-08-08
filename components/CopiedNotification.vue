<template>
  <transition name="slide-up">
    <div
      v-if="visible"
      class="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      default: "Copied!",
    },
  },
  data() {
    return {
      touchStartY: 0,
      touchMoveY: 0,
    };
  },
  methods: {
    onTouchStart(event) {
      this.touchStartY = event.touches[0].clientY;
    },
    onTouchMove(event) {
      this.touchMoveY = event.touches[0].clientY;
    },
    onTouchEnd() {
      if (this.touchMoveY > this.touchStartY + 50) { // 50px swipe down threshold
        this.$emit("close");
      }
      this.touchStartY = 0;
      this.touchMoveY = 0;
    },
  },
};
</script>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from {
  transform: translate(-50%, 100px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translate(-50%, 100px);
  opacity: 0;
}
</style>
