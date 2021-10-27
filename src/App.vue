<template>
  <router-link
    :to="{ name: 'HomePage' }"
    class="bg-red-400 w-24 h-8 flex justify-center items-center p-2 mt-4 ml-4 rounded text-white shadow-md cursor-pointer"
    >Ana Sayfa</router-link
  >
  <router-view></router-view>
</template>

<script>
export default {


};
</script>
