import { OPTIONS } from '@/filters/options'

// 获取value对应的label
function filterValue(list, value, labelKey = 'label', valueKey = 'value') {
  let label = ''
  list.forEach(item => {
    if (item[valueKey] === value) {
      label = item[labelKey]
    }
  })

  return label
}

// 获取多个value对应的label
function filterValueMultiple(list = [], values, labelKey = 'label', valueKey = 'value') {
  let label = []
  let valueArr = values ? values.split(',') : []
  list.forEach(item => {
    if (valueArr.includes(item[valueKey])) {
      label.push(item[labelKey])
    }
  })

  return label.join(',')
}

function filterValueByOptions(value, key) {
  return filterValue(OPTIONS[key], value)
}

function filterValueMultipleByOptions(values, key) {
  return filterValueMultiple(OPTIONS[key], values)
}


export const filtersCb = (app) => {
  app.config.globalProperties.$filters = {
    filterValue,
    filterValueMultiple,
    filterValueByOptions,
    filterValueMultipleByOptions
  }
}