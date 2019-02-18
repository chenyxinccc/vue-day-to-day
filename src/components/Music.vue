<template>
  <div class="music">
    <el-card class="music-box" shadow="hover" :class="{'music-box__hidden': showShrink}">
      <h2 class="music-box__title" :title="activeMusicName+'____'+activeMusicSinger">
        {{activeMusicName}}&nbsp;<span>&nbsp;&nbsp;{{activeMusicSinger}}</span>
      </h2>
      <i class="el-icon-minus music-box__close" @click="showShrink = true" title="缩小应用"></i>
      <!-- 音量控制 -->
      <div class="music-box__volume" @click="stopBubble">
        <i class="fa fa-volume-off fa-2x" @click="isSetVolume=!isSetVolume" title="切换音量"></i>
        <el-slider
          vertical
          v-model="volumeNum"
          v-show="isSetVolume"
          class="music-volume__slider"
          @change="setVolume"
          height="100px">
        </el-slider>
      </div>
      <!-- 封面展示 -->
      <div class="music-box__cover" :class="{rotate: isPlay}">
        <img :src="coverImage">
      </div>
      <!-- 进度条 -->
      <div class="music-box__schedule">
        <el-slider
          v-model="nowWidth"
          :show-tooltip="false"
          @change="setCurrentTime"
          :disabled="!durationTime">
        </el-slider>
      </div>
      <div class="music-box__time">
        <span class="music-time__current" v-show="currentTime">{{currentTime}}</span>
        <span class="music-time__duration" v-show="durationTime">{{durationTime}}</span>
      </div>
      <!-- audio -->
      <audio :src="audioUrl" ref="audio_box" :autoplay="isAutoplay" @canplay="canplay">
        老铁,该换浏览器了。
      </audio>
      <div class="music-box__operation">
        <i class="fa fa-fast-backward fa-1x" @click="lastPlay" title="上一首"></i>
        <i class="fa fa-pause-circle fa-3x music-play__icon" v-show="isPlay" @click="checkPlay" title="暂停"></i>
        <i class="fa fa-play-circle fa-3x music-play__icon" v-show="!isPlay" @click="checkPlay" title="开始"></i>
        <i class="fa fa-fast-forward fa-1x" @click="nextPlay" title="下一首"></i>
        <el-popover
          ref="popover"
          placement="top"
          width="200"
          trigger="click">
          <div class="music-list__box">
            <ul>
              <li v-for="(item, i) of musics" :key="i"  @click="setPlay(item, i)">
                <i
                  class="fa fa-chevron-right fa-1x music-list__now"
                  title="当前播放"
                  v-if="i == activeNum"></i>
                <span>{{item.name}}</span>
                <span class="music-list__singer">{{item.singer}}</span>
              </li>
            </ul>
          </div>
        </el-popover>
        <i class="fa fa-list fa-1x music-box__list" title="播放列表" v-popover:popover></i>
      </div>
    </el-card>
    <div class="music-shirink" :class="{'music-box__hidden': !showShrink}" @click="showShrink = false" title="打开应用">
      <i class="el-icon-service" :class="{rotate: isPlay}"></i>
    </div>
  </div>
</template>

<script>
import cover1 from '@/assets/images/1.jpg'
import cover2 from '@/assets/images/2.jpg'
import cover3 from '@/assets/images/0.jpg'
import cover4 from '@/assets/images/3.jpg'
import audio1 from '@/assets/music/1.mp3'
import audio2 from '@/assets/music/2.mp3'
import audio3 from '@/assets/music/3.mp3'
import audio4 from '@/assets/music/4.mp3'
export default {
  data () {
    return {
      showShrink: false,
      gridData: [],
      activeMusicName: '',
      activeMusicSinger: '',
      coverImage: '',
      audioUrl: '',
      isPlay: false,
      isAutoplay: false,
      isSetVolume: false,
      nowProgressBar: null,
      nowWidth: 0,
      volume: 0.1,
      volumeNum: 10,
      activeNum: 0,
      musics: [{
        name: 'LOSER',
        singer: '米津玄師',
        cover: cover1,
        audio: audio1
      }, {
        name: 'DROP',
        singer: "ROOKiEZ is PUNK'D",
        cover: cover2,
        audio: audio2
      }, {
        name: 'Terror',
        singer: 'まふまふ',
        cover: cover3,
        audio: audio3
      }, {
        name: '我们的天空',
        singer: '黄艺明',
        cover: cover4,
        audio: audio4
      }],
      currentTime: null,
      durationTime: null
    }
  },
  props: [],
  components: {
  },
  watch: {
    activeNum () {
      const vm = this
      if ((vm.activeNum + 1) > vm.musics.length) {
        vm.activeNum = 0
        return
      } else if (vm.activeNum < 0) {
        vm.activeNum = vm.musics.length - 1
        return
      }
      vm.initMusic()
      if (vm.isPlay) {
        vm.isAutoplay = true
      } else {
        vm.isAutoplay = false
      }
    }
  },
  mounted () {
    this.initMusic()
    window.onclick = this.checkShow
    this.$refs['audio_box'].volume = this.volume
  },
  destroy () {
    window.onclick = null
  },
  methods: {
    // 初始化歌曲信息
    initMusic () {
      const vm = this
      const mowMusic = vm.musics[vm.activeNum]
      vm.activeMusicName = mowMusic.name
      vm.activeMusicSinger = mowMusic.singer
      vm.coverImage = mowMusic.cover
      vm.audioUrl = mowMusic.audio
      vm.nowWidth = 0
    },
    // 暂停or播放
    checkPlay () {
      const vm = this
      vm.isPlay = !vm.isPlay
      if (vm.isPlay) {
        vm.$refs['audio_box'].play()
      } else {
        vm.$refs['audio_box'].pause()
      }
      vm.setProgressBar()
    },
    // 列表跳转
    setPlay (item, i) {
      if (i !== this.activeNum) {
        this.activeNum = i
      }
    },
    // 上一首
    lastPlay () {
      const vm = this
      vm.activeNum--
    },
    // 下一首
    nextPlay () {
      const vm = this
      vm.activeNum++
    },
    // 缓冲完成
    canplay () {
      const vm = this
      const audio = vm.$refs['audio_box']
      vm.currentTime = vm.formatTime(Math.floor(audio.currentTime))
      vm.durationTime = vm.formatTime(Math.floor(audio.duration))
    },
    // 进度条
    setProgressBar () {
      const vm = this
      const time = 200
      const audio = vm.$refs['audio_box']
      vm.nowProgressBar = vm.nowProgressBar ? clearInterval(vm.nowProgressBar) : vm.nowProgressBar = setInterval(() => {
        vm.currentTime = vm.formatTime(Math.floor(audio.currentTime))
        vm.durationTime = vm.formatTime(Math.floor(audio.duration))
        vm.nowWidth = Math.floor(audio.currentTime) / Math.floor(audio.duration) * 100
        if (audio.ended) {
          vm.activeNum++
        }
      }, time)
    },
    // 格式化时间
    formatTime (seconds) {
      if (isNaN(seconds)) {
        return '00:00'
      }
      return [
        // parseInt(seconds / 60 / 60),
        parseInt(seconds / 60 % 60),
        parseInt(seconds % 60)
      ].join(':').replace(/\b(\d)\b/g, '0$1')
    },
    // 音量设置
    setVolume (val) {
      if (val > 80) {
        this.$message({
          message: '注意保护耳朵(最大音量80)',
          type: 'success'
        })
        this.volumeNum = 80
        this.$refs['audio_box'].volume = 0.8
      } else {
        this.$refs['audio_box'].volume = val / 100
      }
    },
    // 时间跳转
    setCurrentTime (val) {
      this.$refs['audio_box'].currentTime = Math.floor(this.$refs['audio_box'].duration * val / 100)
    },
    checkShow () {
      this.isSetVolume = false
    },
    stopBubble (e) {
      window.event ? window.event.cancelBubble = true : e.stopPropagation()
    }
  }
}
</script>
<style type="text/css">
  .music-box__schedule .el-slider__bar{
    background-color: #ff8c26;
  }
  .music-box__schedule .el-slider__button{
    border: #ff8c26;
  }
  .music-box__volume .music-volume__slider .el-slider__runway{
    margin-right: 0;
    margin-left: 16px;
  }
  .music .el-card{
    border: none;
  }
</style>
<style type="text/css" scoped>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  body{
    font-family: 'PT Serif', 'Microsoft YaHei', serif;
    color: white;
  }
  .music{
    position: fixed;
    right: 5px;
    top: 30%;
    z-index: 99;
  }
  .music-shirink{
    width: 40px;
    height: 40px;
    right: 0;
    top: 0;
    line-height: 40px;
    position: absolute;
    text-align: center;
    background: #c62f2f;
    color: #FFF;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    cursor: pointer;
    transition: all .2s;
    z-index: 97;
    overflow: hidden;
  }
  .music-box{
    background: #c62f2f;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: all .2s;
    z-index: 98;
  }
  .music-box h2{
    color: #FFF;
    border-bottom: 1px solid #FFF;
    line-height: 40px;
  }
  .music-box{
    width: 300px;
    height: 420px;
    margin: 0 auto;
  }
  .music-box__hidden{
    width: 0px;
    height: 0px;
  }
  .music-box__title span{
    font-size: 12px;
  }
  .music-box__close{
    position: absolute;
    right: 10px;
    top: 5px;
    color: #FFF;
    cursor: pointer;
  }
  .music-box__volume{
    width: 34px;
    float: right;
    color: #FFF;
    position: absolute;
    right: 6px;
    display: inline-block;
    text-align: center;
  }
  .music-box__volume i{
    cursor: pointer;
  }
  .music-box__cover{
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    background: #FFF;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: 30px;
    position: relative;
    overflow: hidden;
  }
  .music-box__cover img{
    width: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .music-box__time span{
    color: #FFF;
    font-size: 12px;
  }
  .music-time__current{
    float: left;
  }
  .music-time__duration{
    float: right;
  }
  .music-box__operation{
    height: 80px;
    line-height: 80px;
    text-align: center;
    position: relative;
  }
  .music-box__operation i{
    color: #FFF;
    cursor: pointer;
  }
  .music-box__operation .music-box__list{
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
  }
  .music-list__box{
    max-height: 300px;
  }
  .music-list__box li {
    line-height: 30px;
    text-indent: 6px;
    color: #c62f2f;
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .music-list__box li:hover{
    color: #ff8c26;
  }
  .music-list__now{
    text-indent: 0;
  }
  .music-list__singer{
    margin-left: 4px;
    font-size: 12px;
  }
  .music-play__icon{
    margin: 0 15px;
    -webkit-transform: translate(0%, 25%);
    -moz-transform: translate(0%, 25%);
    -o-transform: translate(0%, 25%);
    transform: translate(0%, 25%);
  }
  .rotate{
    -webkit-transition-property: -webkit-transform;
    -webkit-transition-duration: 1s;
    -moz-transition-property: -moz-transform;
    -moz-transition-duration: 1s;
    -webkit-animation: rotate 12s linear infinite;
    -moz-animation: rotate 12s linear infinite;
    -o-animation: rotate 12s linear infinite;
    animation: rotate 12s linear infinite;
  }
  @-webkit-keyframes rotate{from{-webkit-transform: rotate(0deg)}
    to{-webkit-transform: rotate(360deg)}
  }
  @-moz-keyframes rotate{from{-moz-transform: rotate(0deg)}
    to{-moz-transform: rotate(359deg)}
  }
  @-o-keyframes rotate{from{-o-transform: rotate(0deg)}
    to{-o-transform: rotate(359deg)}
  }
  @keyframes rotate{from{transform: rotate(0deg)}
    to{transform: rotate(359deg)}
  }
</style>
