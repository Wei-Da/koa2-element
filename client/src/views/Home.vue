<template>
  <div></div>
</template>

<script>
import axios from 'axios'

export default {
  mounted() {
    axios.get('/api/users').then((res) => {
      console.log(res)
    })
  },
}
</script>