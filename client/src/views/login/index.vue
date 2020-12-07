<template>
  <div class="login-containe">
    <el-form
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-containe">
        <h1 class="title">系统登录</h1>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">

</style>