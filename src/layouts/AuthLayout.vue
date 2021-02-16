<template>
  <q-layout class="bg-primary">
    <router-view></router-view>
  </q-layout>
</template>

<script>
export default {
name: "AuthLayout"
}
</script>

<style lang="sass">
.card-container
  width: 500px
.text-decoration-none
  text-decoration: none
  text-indent: inherit
  color: #000
</style>
