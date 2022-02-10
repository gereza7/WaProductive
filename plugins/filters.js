import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/es'

Vue.filter('formatDate', (value) => {
  if (!value) return ''
  return moment(value).format('dddd, D MMMM  YYYY')
})