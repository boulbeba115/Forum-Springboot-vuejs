<template>
<div>
<h1>Hi</h1>

</div>
</template>

<script>


export default {
    data() {
        return {
            isCollapse: false
        };
    },
    computed: {
        currentRoute() {
            console.log(this.$route)
            return this.$route.name;
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style>

</style>
