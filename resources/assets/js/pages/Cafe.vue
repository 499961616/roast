<style>

</style>

<template>
    <div>

    </div>
</template>

<script>
    export default {
// 页面创建时通过路由中的参数ID加载咖啡店数据
        created() {
            this.$store.dispatch('loadCafe', {
                id: this.$route.params.id
            });
        },
    }
</script>
