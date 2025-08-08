<template>
  <div class="image-display-container w-full h-full p-4 overflow-y-auto grid grid-cols-2 gap-4">
    <div v-for="(image, index) in images" :key="index" class="break-inside-avoid" :class="{ 'col-span-2': image.wide }">
      <img :src="image.src" :alt="image.title" class="w-full h-auto object-contain rounded-lg shadow-md" />
      <p class="text-center text-menu-text mt-2">{{ image.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
};
</script>