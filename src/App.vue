<template>
  <div id="app">
    <section id="header">
      <header>
        <h1>Mirror Mirror</h1>
      </header>
      <footer>
        <a href="#banner" class="button style2 scrolly-middle">Practice magic your way.</a>
      </footer>
    </section>

    <router-view />
    <section id="footer">
      <!-- <footer> -->
      <router-link to="/" class="a">Back to all characters</router-link>
      <!-- </footer> -->
    </section>
  </div>
</template>

<style></style>
