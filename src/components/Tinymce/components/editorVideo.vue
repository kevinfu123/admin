<template>
   <div class="upload-container">
       <el-button icon='el-icon-upload1' size="mini" :style="{background:color,borderColor:color}"
               @click=" dialogVisible1=true" type="primary">上传视频
       </el-button>
       <el-dialog append-to-body :visible.sync="dialogVisible1">
        <el-upload class="avatar-uploader el-upload--text"
                    :headers="fileHeaders"
                    :action="uploadUrl" 
                    :show-file-list="false"
                    name="video"
                    accept=".mp4"  
                    :limit="1"
                    :on-success="handleVideoSuccess"  
                    :before-upload="beforeUploadVideo" 
                    :on-progress="uploadVideoProcess">  
            <video v-if="this.global.showVideoPath !='' && !videoFlag"  
                    :src="this.global.showVideoPath"  
                    class="avatar video-avatar"
                    controls="controls">您的浏览器不支持视频播放</video> 
            <i v-else-if="this.global.showVideoPath =='' && !videoFlag"
                class="el-icon-plus avatar-uploader-icon"></i>  
            <el-progress v-if="videoFlag == true"
                            type="circle"
                            :percentage="videoUploadPercent"
                            style="margin-top:30px;"></el-progress>
            <el-button class="video-btn"
                        slot="trigger"
                        size="small"
                        v-if="isShowUploadVideo"
                        type="primary">上传视频</el-button>
        </el-upload>
        <p v-if="isShowUploadVideo" class="text">请保证视频格式正确，且不超过200M</p>
        <el-button @click="handlecansel">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </el-dialog>
    </div>
</template>

<script>
  import { getToken } from '@/utils/auth';
  export default {
    name: 'editorSlideUpload',
    props: {
      color: {
        type: String,
        default: '#1890ff'
      }
    },
    data() {
      return {
        fileHeaders: { 'Authorization':'Bearer '+getToken()},
        imgurl:'http://ltzm1.oss-cn-shenzhen.aliyuncs.com/',
        dialogVisible1: false,
        listObj: {},
        fileList: [],
        global:{
          showVideoPath:'',
        },
        uploadUrl:"http://47.106.240.143/api/admin/upvideo",//你要上传视频到你后台的地址
        videoFlag:false , //是否显示进度条
        videoUploadPercent:"", //进度条的进度，
        isShowUploadVideo:false, //显示上传按钮
      }
    },
    methods: {
      //上传前回调
        beforeUploadVideo (file) {
            const isLt200M = file.size / 1024 / 1024 < 200;
            if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
                this.$message.error('请上传正确的视频格式');
                return false;
            }
            if (!isLt200M) {
                this.$message.error('上传视频大小不能超过200MB哦!');
                return false;
            }
            this.isShowUploadVideo = false;
        },
        handleSubmit() {
            if(this.global.showVideoPath !='') {
               this.$emit('successVBK', this.global.showVideoPath);
            }else{
              this.$message.error('没有上传视频无法提交!!');
              return
            }
            this.dialogVisible1 = false;
        },
        //进度条
        uploadVideoProcess (event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage.toFixed(0) * 1;
        },
        
        //上传成功回调
        handleVideoSuccess (res, file) {
            this.isShowUploadVideo = true;
            this.videoFlag = false;
            this.videoUploadPercent = 0;
            if (res.code == 1) {
                this.global.showVideoPath = this.imgurl + res.data;
            } else {
                this.$message.error('视频上传失败，请重新上传！');
            }
        },

        handlecansel() {
           this.dialogVisible1 = false;
           this.videoFlag = true;
           this.global.showVideoPath = '';
        }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .video-avatar {
    width: 500px;
    height: 250px;
  }
</style>