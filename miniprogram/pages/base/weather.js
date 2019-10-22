//汉语转拼音
function chinese2letter(chinese) {
  var weather = ''
  switch (chinese) {
    case '晴' || '大部晴朗':
      weather = 'qing'
      break
    case '中到大雨' || '大雨':
      weather = 'dayu'
      break
    case '中雨' || '小到中雨':
      weather = 'zhongyu'
      break
    case '小雨' || '雨' || '冻雨':
      weather = 'xiaoyu'
      break
    case '大到暴雨' || '大暴雨' || '暴雨':
      weather = 'baoyu'
      break
    case '小阵雨' || '强阵雨' || '局部阵雨' || '阵雨' || '雷阵雨' || '雷阵雨伴有冰雹':
      weather = 'leizhenyu'
      break
    case '特大暴雨':
      weather = 'tedabaoyu'
      break
    case '暴雪':
      weather = 'dabaoxue'
      break
    case '阵雪' || '雪' || '小阵雪' || '小雪':
      weather = 'xiaoxue'
      break
    case '雨夹雪':
      weather = 'yujiaxue'
      break
    case '大雪':
      weather = 'daxue'
      break
    case '小到中雪' || '中雪':
      weather = 'zhongxue'
      break
    case '阴天' || '阴':
      weather = 'yin'
      break
    case '多云' || '少云':
      weather = 'duoyun'
      break
    case '冰雹' || '冰粒' || '冰针':
      weather = 'yujiabingbao'
      break
    case '尘卷风' || '强沙尘暴' || '扬沙' || '沙尘暴' || '沙尘':
      weather = 'shachen'
      break
    case '浮尘':
      weather = 'fuchen'
      break
    case '雷暴' || '雷电':
      weather = 'dalei'
      break
    case '雾' || '冻雾':
      weather = 'wu'
      break
    case '雾霾' || '霾':
      weather = 'wumai'
      break
    case '大风':
      weather = 'dafeng'
      break
    case '风' || '阵风' || '轻风':
      weather = 'feng'
      break
    case '飓风':
      weather = 'jufeng'
      break
    case '龙卷风':
      weather = 'longjuanfeng'
      break
    default:
      weather = 'duoyun'
      break
  }
  return weather
}

module.exports = {
  chinese2letter: chinese2letter
}