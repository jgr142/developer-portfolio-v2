<template>
  <div class="timeline-container w-full h-full flex items-center justify-center font-fira_retina">
    <div class="relative w-px h-4/5 bg-menu-text">
      <!-- Static Nodes -->
      <div
        v-for="(item, index) in sortedItems"
        :key="item.key"
        class="timeline-node-container absolute left-1/2 -translate-x-1/2 transition-opacity duration-500"
        :class="{ 'opacity-50': !isActive(item.key) }"
        :style="{ top: `${(index / (sortedItems.length - 1)) * 100}%` }"
      >
        <div
          class="timeline-node w-4 h-4 rounded-full border-2 border-menu-text bg-blue-background"
        ></div>
        <div class="timeline-label absolute left-full ml-4 text-white whitespace-nowrap">
          {{ item.year }} - {{ item.title }}
        </div>
      </div>

      <!-- Moving Slider -->
      <div
        class="timeline-slider absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-greenfy shadow-lg transition-all duration-500 ease-in-out"
        :style="{ top: sliderPosition }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    activeItem: {
      type: String,
      required: true,
    },
  },
  computed: {
    sortedItems() {
      return [...this.items].sort((a, b) => b.year - a.year);
    },
    activeIndex() {
      return this.sortedItems.findIndex(item => item.key === this.activeItem);
    },
    sliderPosition() {
      if (this.activeIndex === -1) return '-100%';
      return `${(this.activeIndex / (this.sortedItems.length - 1)) * 100}%`;
    },
  },
  methods: {
    isActive(key) {
      return this.activeItem === key;
    },
  },
};
</script>

<style scoped>
.timeline-slider {
  box-shadow: 0 0 10px #43d9ad, 0 0 20px #43d9ad;
}
</style>