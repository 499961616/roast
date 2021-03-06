<style lang="scss">
@import '~@/abstracts/_variables.scss';

div#cafe-map-container {
    position: absolute;
    top: 75px;
    left: 0px;
    right: 0px;
    bottom: 0px;

    div#cafe-map {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }

    div.cafe-info-window {

        div.cafe-name {
            display: block;
            text-align: center;
            color: $dark-color;
            font-family: 'Josefin Sans', sans-serif;
        }

        div.cafe-address {
            display: block;
            text-align: center;
            margin-top: 5px;
            color: $grey;
            font-family: 'Lato', sans-serif;
            span.street {
                font-size: 14px;
                display: block;
            }
            span.city {
                font-size: 12px;
            }
            span.state {
                font-size: 12px;
            }
            span.zip {
                font-size: 12px;
                display: block;
            }
            a {
                color: $secondary-color;
                font-weight: bold;
            }
        }
    }
}
</style>

<template>
    <div id="cafe-map-container">
        <div id="cafe-map">

        </div>
    </div>
</template>

<script>
import  {ROAST_CONFIG} from "../../config";

export default {
    props: {
        'latitude': {  // 经度
            type: Number,
            default: function () {
                return 120.21
            }
        },
        'longitude': {  // 纬度
            type: Number,
            default: function () {
                return 30.29
            }
        },
        'zoom': {   // 缩放级别
            type: Number,
            default: function () {
                return 4
            }
        }
    },
    data() {
        return {
            markers: [],
            infoWindows: []
        }
    },
    mounted() {
        this.map = new AMap.Map('cafe-map', {
            center: [this.latitude, this.longitude],
            zoom: this.zoom
        });
        // 清除并重构点标记
        this.clearMarkers();
        this.buildMarkers();
    },
    computed: {
        cafes(){
            return this.$store.getters.getCafes;
        }
    },
    methods: {
        // 为所有咖啡店创建点标记
        buildMarkers() {
            // 初始化点标记数组
            this.markers = [];

            // 自定义点标记
            var image = ROAST_CONFIG.APP_URL + '/storage/img/coffee-marker.png';
            var icon = new AMap.Icon({
                image: image,  // Icon的图像
                imageSize: new AMap.Size(19, 33)
            });

            // 遍历所有咖啡店创建点标记
            var infoWindow = new AMap.InfoWindow();
            for (var i = 0; i < this.cafes.length; i++) {

                // 为每个咖啡店创建点标记并设置经纬度
                var marker = new AMap.Marker({
                    position: new AMap.LngLat(parseFloat(this.cafes[i].latitude), parseFloat(this.cafes[i].longitude)),
                    title: this.cafes[i].location_name,
                    icon: icon,
                    extData: {
                        'cafe': this.cafes[i]
                    }
                });

                // 自定义信息窗体
                var contentString = '<div class="cafe-info-window">' +
                    '<div class="cafe-name">' + this.cafes[i].name +  '</div>' +
                    '<div class="cafe-address">' +
                    '<span class="street">' + this.cafes[i].address + '</span>' +
                    '<span class="city">' + this.cafes[i].city + '</span> ' +
                    '<span class="state">' + this.cafes[i].state + '</span>' +
                    '<span class="zip">' + this.cafes[i].zip + '</span>' +
                    '<a href="/#/cafes/' + this.cafes[i].id + '">Visit</a>' +
                    '</div>' +
                    '</div>';
                marker.content = contentString;

                // 绑定点击事件到点标记对象，点击打开上面创建的信息窗体
                marker.on('click', mapClick);

                // 将点标记放到数组中
                this.markers.push(marker);
            }

            function mapClick(mapEvent) {
                infoWindow.setContent(mapEvent.target.content);
                infoWindow.open(this.getMap(), this.getPosition());
            }

            // 将所有点标记显示到地图上
            this.map.add(this.markers);
        },
        // 从地图上清理点标记
        clearMarkers() {
            // 遍历所有点标记并将其设置为 null 从而从地图上将其清除
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
        }
    },
    watch: {
        // 一旦 cafes 有更新立即重构地图点标记
        cafes () {
            this.clearMarkers();
            this.buildMarkers();
        }
    }
}
</script>
