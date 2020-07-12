<template>
  <div class="top-navigation">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
$yellow: #ece71f;
$gray: #d1d2d4;
$black: #000;
$red: #ec2228;
.top-navigation {
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $yellow;
  z-index: 9;
  position: absolute;
  width: 100%;
}
</style>
