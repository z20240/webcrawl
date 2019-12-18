<script>
export default {
    name: 'Layout',
    computed: {
        key() {
            return this.$route.path;
        }
    }
};
</script>

<template>
    <section>
        this is template
        <router-view :key="key" />
    </section>
</template>