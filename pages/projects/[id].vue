<template>
  <main class="flex flex-col flex-auto lg:flex-row overflow-hidden">
    <div id="mobile-page-title">
      <h2>_project-details</h2>
    </div>

    <div class="flex flex-col w-full overflow-hidden">
      <!-- windows tab -->
      <div class="tab-height w-full hidden lg:flex border-bot items-center">
        <div class="flex items-center border-right h-full">
          <p class="font-fira_regular text-menu-text text-sm px-3">
            {{ project.title }}
            <NuxtLink to="/projects" class="close-button">
              <img src="/icons/close.svg" alt="" class="m-3 inline-block" />
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- windows tab mobile -->
      <div id="tab" class="flex lg:hidden items-center">
        <span class="text-white"> // </span>
        <p class="font-fira_regular text-white text-sm px-3">project</p>
        <span class="text-menu-text"> / </span>
        <p class="font-fira_regular text-menu-text text-sm px-3">
          {{ project.name }}
        </p>
      </div>

      <!-- project details -->
      <div
        class="flex flex-col lg:flex-row max-w-full h-full overflow-scroll lg:self-center font-fira_regular"
      >
        <div class="lg:w-1/2 p-8">
          <h2 class="text-2xl font-fira_bold mb-4">{{ project.name }}</h2>
          <p class="text-menu-text mb-4">{{ project.description }}</p>
          <div class="flex flex-wrap mb-4">
            <img
              v-for="tech in project.tech"
              :key="tech"
              :src="`/icons/techs/filled/${tech.toLowerCase()}.svg`"
              :alt="tech"
              class="w-8 h-8 mr-2 mb-2"
            />
          </div>
          <a
            :href="project.github"
            target="_blank"
            class="text-blue-400 hover:underline"
            >View on GitHub</a
          >
        </div>
        <div class="lg:w-1/2 p-8">
          <img
            :src="project.img"
            :alt="project.name"
            class="w-full rounded-lg"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import DevConfig from "~/developer.json";

const route = useRoute();
const projectId = route.params.id;
const project = ref(
  Object.values(DevConfig.projects).find((p) => p.id === projectId)
);
</script>

<style>
.close-button:hover {
  background-color: #1e2d3d74;
}
</style>
