<template>
  <div id="app">
    <Application></Application>
  </div>
</template>

<script>
import Application from "./pages/application";
export default {
  name: 'app',
  components: {
    Application
  }
}
</script>

<style>
.toast-top-right{
  position: absolute;
  top: 25px;
  right: 25px;

}

.toast-error{
  border: 2px solid red;
  padding: 5px;
}
</style>
