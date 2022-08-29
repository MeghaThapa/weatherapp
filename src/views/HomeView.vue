<template>
  <div class="home">
    <dashboard></dashboard>
  </div>
</template>

<script>
// @ is an alias to /src
import dashboard from '../components/dashboard.vue'

export default {
  name: 'HomeView',
  components: {
    dashboard
  }
}
</script>
