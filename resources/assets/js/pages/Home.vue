<style>

</style>

<template>
    <div id="home">
        <span v-show="cafesLoadStatus == 1">加载中...</span>
        <span v-show="cafesLoadStatus == 2">数据加载成功！</span>
        <span v-show="cafesLoadStatus == 3">数据加载失败！</span>
    </div>
</template>

<script>
    export default {
        created() {
            this.$store.dispatch( 'loadCafes' );
        },
        /**
         * 定义组件的计算属性
         */
        computed: {
            // 获取 cafes 加载状态
            cafesLoadStatus(){
                return this.$store.getters.getCafesLoadStatus;
            },

            // 获取 cafes
            cafes(){
                return this.$store.getters.getCafes;
            }
        }
    }
</script>
