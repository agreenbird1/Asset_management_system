<template>
  <div class="assets-statistics">
    <div class="button-wrapper">
      <n-button color="#6a83d0" size="small" @click="$router.back()"
        >返回</n-button
      >
    </div>
    <div class="echarts-wrapper">
      <div id="echarts-line"></div>
      <div id="echarts-pie"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { MONITOR_TYPE } from '@/config/common'
import MonitorApi, { IMonitor } from '@/api/monitor'
import dayjs from 'dayjs'

type ECUnitOption = {
  name: string
  type: string
  stack: string
  data: number[]
}

const data = ref<IMonitor[]>([])
const generateLineOptions = async () => {
  await MonitorApi.get({
    pageNum: 1,
    assetName: '',
    applyUserName: '',
    handleUserName: '',
    pageSize: 999,
  }).then((res) => {
    data.value = res.data.list.filter((item) => {
      return dayjs(new Date()).diff(item.createTime, 'days') <= 7
    })
  })
  const dates: string[] = []
  const now = dayjs(new Date())
  for (let index = 0; index < 7; index++) {
    dates.push(now.subtract(index, 'days').format('MM/DD'))
  }
  const seriesNames = Object.values(MONITOR_TYPE)
  const series: ECUnitOption[] = []
  seriesNames.forEach((name) => {
    const seriesData = data.value.filter(
      (item) => MONITOR_TYPE[item.type] == name
    )
    series.push({
      name: name,
      type: 'line',
      stack: 'Total',
      data: dates.map((date) => {
        return seriesData.filter(
          (data) => date == dayjs(data.createTime).format('MM/DD')
        ).length
      }),
    })
  })
  const options = {
    title: {
      text: '近七日资产流通记录折线图',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: seriesNames,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dates,
    },
    yAxis: {
      type: 'value',
    },
    series,
  }

  return options
}
const generatePieOptions = async () => {
  const map: Record<string, number> = {}
  const seriesNames = Object.values(MONITOR_TYPE)
  await MonitorApi.get({
    pageNum: 1,
    assetName: '',
    applyUserName: '',
    handleUserName: '',
    pageSize: 999,
  }).then((res) => {
    res.data.list.forEach((item) => {
      if (map[MONITOR_TYPE[item.type]] == undefined)
        map[MONITOR_TYPE[item.type]] = 1
      else map[MONITOR_TYPE[item.type]]++
    })
  })
  const option = {
    title: {
      text: '资产流通总体情况图',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '统计图',
        type: 'pie',
        radius: '50%',
        data: seriesNames.map((name) => {
          return { value: map[name], name: name }
        }),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  return option
}
onMounted(async () => {
  const lineDom = document.getElementById('echarts-line')!
  let lineChart: echarts.ECharts = echarts.init(lineDom)
  lineChart && lineChart.setOption(await generateLineOptions())

  const pieDom = document.getElementById('echarts-pie')!
  let pieChart: echarts.ECharts = echarts.init(pieDom)
  pieChart && pieChart.setOption(await generatePieOptions())
})
</script>

<style scoped lang="less">
.assets-statistics {
  background-color: #fff;
  height: 100%;
  border-radius: 15px;
  padding: 20px;
  .button-wrapper {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 20px;
  }
}
#echarts-line {
  height: calc(100vh - 220px);
  flex: 65%;
}

#echarts-pie {
  height: calc(100vh - 220px);
  flex: 35%;
}
.echarts-wrapper {
  width: 100%;
  display: flex;
}
</style>
