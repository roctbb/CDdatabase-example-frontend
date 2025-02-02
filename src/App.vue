<template>
    <NavBar />
    <ArtistsCatalog />
</template>

<script>

import NavBar from "@/components/NavBar.vue";
import ArtistsCatalog from "@/components/ArtistsCatalog.vue";

export default {
    name: 'App',
    components: {ArtistsCatalog, NavBar}
}
</script>

<style>
</style>
