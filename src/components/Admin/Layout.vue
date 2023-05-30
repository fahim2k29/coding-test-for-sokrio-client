<template>
  <div id="app">
    <Sidebar />
    <div class="content">
      <Header />
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script>
import Footer from "./Footer.vue";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";

export default {
  name: "Layout",
  components: { Header, Sidebar, Footer },

};
</script>


<style>
  #app {
    display: flex;
    min-height: 30vh;
  }

  .content {
    flex: 1;
    padding: 10px;
    background-color: #f3f6f9;
  }

/*  @media (min-width: 968px) {
    .content {
      padding: 5px;
    }
  }*/
</style>
