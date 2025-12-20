<template>
  <view class="number-picker">
    <picker-view :value="pickerValue" @change="onPickerChange" class="picker-view" :indicator-style="indicatorStyle">
      <!-- 整数列 -->
      <picker-view-column>
        <view class="picker-item" v-for="(item, index) in intNumbers" :key="`int-${index}`">
          {{ item }}
        </view>
      </picker-view-column>

      <!-- 小数列（当有小数范围时显示） -->
      <picker-view-column v-if="hasFloat">
        <view class="picker-item" v-for="(item, index) in floatNumbers" :key="`float-${index}`">
          {{ item }}
        </view>
      </picker-view-column>
    </picker-view>
  </view>
</template>

<script>
export default {
  name: 'NumberPicker',

  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    intRange: {
      type: Array,
      default: () => [1, 200],
      validator: val => val.length === 2 && val[0] <= val[1]
    },
    floatRange: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      pickerValue: [0, 0], // picker-view的值，对应各列选中项的索引
      indicatorStyle: 'height: 50px;' // 选择器样式
    }
  },

  computed: {
    hasFloat() {
      return this.floatRange && this.floatRange.length === 2
    },

    // 整数数字列表
    intNumbers() {
      const [min, max] = this.intRange
      const numbers = []
      for (let i = min; i <= max; i++) {
        numbers.push(i)
      }
      return numbers
    },

    // 小数数字列表
    floatNumbers() {
      if (!this.hasFloat) return []

      const [min, max] = this.floatRange
      const numbers = []
      for (let i = min; i <= max; i++) {
        numbers.push(i)
      }
      return numbers
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        this.setValue(newVal)
      }
    }
  },

  methods: {
    // 设置初始值
    setValue(val) {
      let intValue = this.intRange[0]
      let floatValue = 0

      if (val !== null && val !== undefined && val !== '') {
        const numVal = Number(val)
        if (!isNaN(numVal)) {
          if (this.hasFloat) {
            const strVal = numVal.toString()
            if (strVal.includes('.')) {
              const parts = strVal.split('.')
              intValue = parseInt(parts[0]) || this.intRange[0]
              floatValue = parseInt(parts[1].charAt(0)) || 0
            } else {
              intValue = parseInt(numVal) || this.intRange[0]
              floatValue = 0
            }
          } else {
            intValue = parseInt(numVal) || this.intRange[0]
          }
        }
      }

      // 找到对应的索引
      const intIndex = this.intNumbers.indexOf(intValue)
      if (intIndex !== -1) {
        this.$set(this.pickerValue, 0, intIndex)
      }

      if (this.hasFloat) {
        const floatIndex = this.floatNumbers.indexOf(floatValue)
        if (floatIndex !== -1) {
          this.$set(this.pickerValue, 1, floatIndex)
        }
      }
    },

    // picker-view变化事件
    onPickerChange(e) {
      this.pickerValue = e.detail.value

      // 获取实际值
      const intIndex = this.pickerValue[0] || 0
      let intValue = this.intNumbers[intIndex] || this.intRange[0]

      let emitValue
      if (this.hasFloat) {
        const floatIndex = this.pickerValue[1] || 0
        const floatValue = this.floatNumbers[floatIndex] || 0
        if (floatValue !== 0) {
          emitValue = parseFloat(`${intValue}.${floatValue}`)
        } else {
          emitValue = intValue
        }
      } else {
        emitValue = intValue
      }

      this.$emit('input', emitValue)
    }
  }
}
</script>

<style scoped>
.number-picker {
  width: 100%;
  height: 240px;
  background-color: #fff;
}

.picker-view {
  width: 100%;
  height: 100%;
}

.picker-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #7D7E83;
}

/* picker-view 会自动处理选中项的样式，这里可以保持简洁 */
</style>