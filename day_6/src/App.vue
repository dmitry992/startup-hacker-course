<template>

  <div class="s-app">

    <nav class="s-nav">
      <RouterLink class="s-nav-link" to="/">Главная</RouterLink>
      <RouterLink class="s-nav-link" to="/about">О нас</RouterLink>
    </nav>

    <RouterView />

  </div>

</template>



<style>

.s-app{
  padding-left: 20px;
  padding-top: 20px;
}
.s-nav{
  display: flex;
  grid-gap: 10px;
  margin-bottom: 10px;
  font-size: 20px;
}
.s-nav-link:hover{
  text-decoration: underline;
}

</style>
