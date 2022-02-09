<template>
  <h1>Cerrar Sesión</h1>
</template>

<script>
export default {
  asyncData() {
    $nuxt.$fire.auth.signOut()
  }
}
</script>