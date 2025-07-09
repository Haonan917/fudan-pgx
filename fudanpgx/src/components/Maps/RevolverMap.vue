<template>
  <div id="revolver-map">
    <!-- 这里将显示 RevolverMaps 地球仪 -->
  </div>
</template>


<script>
export default {
  name: "ResolverMap",
  mounted() {
    // 创建 RevolverMaps 脚本
    // <script type="text/javascript" src="//rf.revolvermaps.com/0/0/6.js?i=53n502xkgsi&amp;m=1c&amp;c=ff0000&amp;cr1=ffffff&amp;f=arial&amp;l=1&amp;cw=ffffff&amp;cb=000000" async="async">
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "//rf.revolvermaps.com/0/0/8.js?i=53n502xkgsi&m=1&c=ff0000&cr1=ffffff&f=arial&l=33&s=171";
    script.async = true;
    // 将脚本添加到指定的 `revolver-map` 容器中
    document.getElementById("revolver-map").appendChild(script);
  },
}
</script>

<style scoped>
#revolver-map {
  /*width: 300px;  !* 设置地球仪宽度 *!*/
  /*height: 300px; !* 设置地球仪高度 *!*/
  /*margin: 0 auto; !* 居中显示 *!*/
}
</style>