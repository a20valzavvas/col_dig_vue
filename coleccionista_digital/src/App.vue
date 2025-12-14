<template>
  <div id="app">
    <TheNavbar />
    <main class="app-content" role="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import TheNavbar from "@/components/TheNavbar.vue";
</script>

<style>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-content {
  flex: 1;
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
