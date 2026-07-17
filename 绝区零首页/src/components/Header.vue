<template>
    <div class="header">
        <div class="header-middle">
            <div class="header-middle-left">
                <div class="ju-qu-li">
                    <img src="../assets/image/绝区零.png" alt="" />
                </div>
                <PanRouterLink v-for="(item, index) in panRouterLinkText" :key="index" :text="item.name"
                    :RouterLinkData="['RouterLinkStyle']"
                    :to="item.path" ></PanRouterLink>
            </div>
            <div class="header-middle-right">
                <PanRouterLink :text="'成长关爱系统'" to="growth" :RouterLinkData="['RouterLinkStyle', 'RouterLinkStyleGrow']">
                </PanRouterLink>
                <PanRouterLink :text="'立即下载'" to="fastload" :RouterLinkData="['RouterLinkStyleLoad']"></PanRouterLink>
                <Music></Music>
            </div>
        </div>
    </div>

</template>

<script setup>
import PanRouterLink from "./PanRouterLink.vue";
import Music from "./Music.vue";
import { reactive, ref } from "vue";

//头部按钮的数据 
const panRouterLinkText = reactive([
    {
        name: "首页",
        path: '/',
    },
    {
        name: "角色介绍",
        path: 'job',
    },
    {
        name: "新闻资讯",
        path: 'news',
    },
    {
        name: "档案设定",
        path: 'setting',
    },
]);
</script>

<style scoped lang="less">
@import "@/varibleLess/index.less";

.header {
    height: 76px;
    background-color: #000;
    position: sticky;
    top: 0;
    z-index: 10;

    .header-middle {
        width: @wrap;
        height: 100%;
        margin: @margin;
        .flex-between(stretch);

        .header-middle-left {
            width: 740px;
            height: 100%;
            .flex-between(center);

            .ju-qu-li {
                width: 100px;
                height: 177px;
                margin-top: 110px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    transform: scale(1.3);
                }
            }
        }

        .header-middle-right {
            width: 440px;
            height: 100%;
            .flex-between(center);
        }
    }
}

// 按钮组件导航栏按钮
.RouterLinkStyle {
    width: 105px;
    height: 40px;
    background-color: #000;
    color: #787868;
    font-weight: bold;

    &:hover {
        background-color: #fff;
        color: #000;
        font-weight: bolder;
    }
}

.router-link-active {
    background-color: #fff;
}

.RouterLinkStyleGrow {
    width: 120px;
}

.RouterLinkStyleLoad {
    width: 105px;
    height: 40px;
    background-color: #d8fa00;
    color: #000;
    font-weight: bold;
}
</style>
