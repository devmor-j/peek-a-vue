<script>
export default {
  props: {
    value: {
      type: String,
      requied: true,
    }
  }
};
</script>

<template>
  <div class="card">
    {{ value }}
  </div>
</template>

<style>
.card {
  border: 5px solid #ccc
}

</style>
