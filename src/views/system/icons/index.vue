<template>
  <div class="icons-container">
    <div class="icons-wrapper">
      <div v-for="item of iconsMap" :key="item" @click="handleClipboard(generateIconCode(item), $event)">
        <el-tooltip placement="top">
          <div slot="content">
            {{ generateIconCode(item) }}
          </div>
          <div class="icon-item">
            <svg-icon :icon-class="item" class-name="disabled" />
            <!-- <span>{{ item }}</span> -->
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import icons from './requireIcons'
// import clipboard from '@/utils/clipboard'

export default {
  name: 'Icons',
  data() {
    return {
      iconsMap: icons
    }
  },
  methods: {
    generateIconCode(symbol) {
      return `${symbol}`
    },
    handleClipboard(text, event) {
      this.$emit('iconSelectedEvent', text)
      // clipboard(text, event)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icons-container {
  margin: 0;
  height: 200px;
  overflow: hidden;
  overflow-y: auto;
  .icons-wrapper {
    margin: 0 auto;
  }
  .icon-item {
    margin: 5px;
    height: 32px;
    text-align: center;
    width: 32px;
    float: left;
    font-size: 20px;
    color: #24292e;
    cursor: pointer;
  }
  span {
    display: block;
    font-size: 16px;
    margin-top: 5px;
  }
  .disabled{
    pointer-events: none;
  }
}
</style>
