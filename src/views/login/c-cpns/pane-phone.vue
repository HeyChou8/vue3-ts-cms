<template>
  <div class="pane-phone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input></el-input>

          <el-button class="el-btn" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.verify-code {
  display: flex;
  .el-btn {
    margin-left: 10px;
  }
}
</style>
