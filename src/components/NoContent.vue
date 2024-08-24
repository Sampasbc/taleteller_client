<script setup lang="ts">
</script>

<template>
  <div class="relative flex flex-col justify-center items-center space-y-1 text-body-lg font-light text-slate-300 no-content z-10">
    <span>No content to show yet.</span>
    <span>Please generate a new quest on the left.</span>
  </div>
</template>

<style scoped>
  .no-content::before {
    content: '';
    position: absolute;
    background: url('../../TaleTeller_no content icon.png');
    /* background-image: url('../../public/TaleTeller_Logo.png'); */
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    height: 300px;
    width: 300px;
    z-index: -1;
  }
</style>