<template>
  <div class="sponsor-info">
    <div class="sponsor-header">
      <h3>{{ title }}</h3>
      <p class="sponsor-description">{{ description }}</p>
    </div>
    
    <!-- Buy Me A Coffee 按钮 -->
    <div class="buy-me-coffee">
      <a 
        :href="buyMeCoffeeUrl" 
        target="_blank" 
        rel="noopener noreferrer"
        class="bmc-button"
      >
        <img 
          src="" 
          alt="Buy Me A Coffee" 
          class="bmc-image"
          :style="{ height: '40px' }"
        >
      </a>
    </div>
    
    <!-- 支付平台二维码 -->
    <div class="payment-platforms">
      <div class="platform-grid">
        <div 
          v-for="platform in platforms" 
          :key="platform.name"
          class="platform-item"
          @click="showQrCode(platform.name)"
        >
          <div class="platform-icon" :class="`icon-${platform.name.toLowerCase()}`">
            {{ getPlatformIcon(platform.name) }}
          </div>
          <span class="platform-name">{{ platform.name }}</span>
        </div>
      </div>
    </div>
    
    <!-- 二维码弹窗 -->
    <div v-if="showQrModal" class="qr-modal" @click="closeQrModal">
      <div class="qr-modal-content" @click.stop>
        <div class="qr-modal-header">
          <h4>{{ currentPlatform?.name }} 赞助二维码</h4>
          <button class="qr-modal-close" @click="closeQrModal">&times;</button>
        </div>
        <div class="qr-modal-body">
          <img 
            v-if="currentPlatform?.qrCodeUrl" 
            :src="currentPlatform.qrCodeUrl" 
            alt="{{ currentPlatform.name }} QR Code"
            class="qr-code-image"
          >
          <div v-else class="qr-placeholder">
            <p>二维码图片加载中...</p>
          </div>
          <p v-if="currentPlatform?.tip" class="qr-tip">{{ currentPlatform.tip }}</p>
        </div>
      </div>
    </div>
    
    <!-- 统计信息 -->
    <div v-if="showStats" class="sponsor-stats">
      <div class="stats-item">
        <span class="stats-number">{{ totalSponsors }}</span>
        <span class="stats-label">赞助人数</span>
      </div>
      <div class="stats-item">
        <span class="stats-number">{{ totalAmount }}</span>
        <span class="stats-label">总赞助金额</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SponsorInfo',
  props: {
    // 标题
    title: {
      type: String,
      default: '支持我们'
    },
    // 描述
    description: {
      type: String,
      default: '如果您觉得这个项目对您有帮助，请考虑赞助我们一杯咖啡！'
    },
    // Buy Me A Coffee URL
    buyMeCoffeeUrl: {
      type: String,
      default: 'https://www.buymeacoffee.com/leemuzi'
    },
    // 支付平台信息
    platforms: {
      type: Array,
      default: () => [
        {
          name: '微信',
          qrCodeUrl: 'https://img.lideshan.cn/i/2025/11/03/690816cd14b5c.jpg',
          tip: '扫描二维码支持我们'
        },
        {
          name: '支付宝',
          qrCodeUrl: 'https://img.lideshan.cn/i/2025/11/03/690816dfde70f.jpg',
          tip: '扫描二维码支持我们'
        },
        {
          name: 'QQ',
          qrCodeUrl: 'https://img.lideshan.cn/i/2025/11/03/690816ecbc8d9.jpg',
          tip: '扫描二维码支持我们'
        },
        {
          name: 'U1',
          qrCodeUrl: 'https://img.lideshan.cn/i/2025/11/03/69081499909ee.jpg',
          tip: '扫描二维码支持我们'
        },
        {
          name: 'U2',
          qrCodeUrl: 'https://img.lideshan.cn/i/2025/11/03/690814c25334a.jpg',
          tip: '扫描二维码支持我们'
        }
      ]
    },
    // 是否显示统计信息
    showStats: {
      type: Boolean,
      default: false
    },
    // 赞助人数
    totalSponsors: {
      type: Number,
      default: 0
    },
    // 总赞助金额
    totalAmount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showQrModal: false,
      currentPlatform: null
    }
  },
  methods: {
    // 显示二维码
    showQrCode(platformName) {
      this.currentPlatform = this.platforms.find(p => p.name === platformName)
      if (this.currentPlatform) {
        this.showQrModal = true
      }
    },
    // 关闭二维码弹窗
    closeQrModal() {
      this.showQrModal = false
      this.currentPlatform = null
    },
    // 获取平台图标
    getPlatformIcon(name) {
      const icons = {
        '微信': '💚',
        '支付宝': '💙',
        'QQ': '💜',
        'PayPal': '💛'
      }
      return icons[name] || '💖'
    }
  }
}
</script>

<style scoped>
.sponsor-info {
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 24px;
  margin: 20px 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.sponsor-header h3 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
}

.sponsor-description {
  margin: 0 0 24px 0;
  color: #666;
  font-size: 16px;
  line-height: 1.6;
}

.buy-me-coffee {
  margin-bottom: 24px;
}

.bmc-button {
  display: inline-block;
  transition: transform 0.2s;
}

.bmc-button:hover {
  transform: scale(1.05);
}

.bmc-image {
  border-radius: 6px;
}

.payment-platforms {
  margin-bottom: 24px;
}

.platform-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
}

.platform-item {
  cursor: pointer;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.platform-item:hover {
  transform: translateY(-2px);
  border-color: #007bff;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
}

.platform-icon {
  font-size: 28px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f0f0f0;
}

.icon-wechat {
  background-color: #07c160;
  color: white;
}

.icon-alipay {
  background-color: #1677ff;
  color: white;
}

.icon-qq {
  background-color: #12b7f5;
  color: white;
}

.icon-paypal {
  background-color: #0070ba;
  color: white;
}

.platform-name {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

/* 二维码弹窗 */
.qr-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.qr-modal-content {
  background-color: white;
  border-radius: 12px;
  padding: 0;
  max-width: 320px;
  width: 100%;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.qr-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.qr-modal-header h4 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.qr-modal-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
}

.qr-modal-close:hover {
  background-color: #f0f0f0;
  color: #333;
}

.qr-modal-body {
  padding: 20px;
  text-align: center;
}

.qr-code-image {
  max-width: 100%;
  height: auto;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 16px;
}

.qr-placeholder {
  width: 200px;
  height: 200px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  border-radius: 8px;
  color: #999;
}

.qr-tip {
  margin: 0;
  font-size: 14px;
  color: #666;
}

/* 统计信息 */
.sponsor-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.stats-item {
  text-align: center;
}

.stats-number {
  display: block;
  font-size: 24px;
  font-weight: 600;
  color: #007bff;
  margin-bottom: 4px;
}

.stats-label {
  display: block;
  font-size: 14px;
  color: #666;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sponsor-info {
    padding: 20px 16px;
    margin: 16px 0;
  }
  
  .sponsor-header h3 {
    font-size: 18px;
  }
  
  .sponsor-description {
    font-size: 14px;
  }
  
  .platform-grid {
    gap: 12px;
  }
  
  .platform-item {
    padding: 12px;
  }
  
  .platform-icon {
    font-size: 24px;
    width: 40px;
    height: 40px;
  }
  
  .sponsor-stats {
    gap: 24px;
  }
  
  .stats-number {
    font-size: 20px;
  }
  
  .qr-modal-content {
    max-width: 100%;
  }
}
</style>