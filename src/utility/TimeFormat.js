import moment from 'moment'

const moments = require('moment-timezone')

moments().tz("Asia/Bangkok").format()

const monthNames = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]

export default class TimeFormat {
  strToDate(str) {
    const date = new Date(str)

    return str !== undefined && moment(date).isValid() ? date : ''
  }

  toDateStr(date) {
    return date !== undefined && moment(date).isValid() ? moment.utc(date).tz("Asia/Bangkok").format('YYYY-MM-DD') : ''
  }

  toTimeStr(date) {
    return date !== undefined && moment(date).isValid() ? moment.utc(date).tz("Asia/Bangkok").format('HHmm') : ''
  }

  toDateTimeStr(date) {
    return date !== undefined && moment(date).isValid() ? moment.utc(date).tz("Asia/Bangkok").format('YYYY-MM-DD HH:mm:ss') : ''
  }

  showDateTH(date) {
    const day = moment.utc(date).tz("Asia/Bangkok").format('DD')
    const month = moment.utc(date).tz("Asia/Bangkok").format('MM')
    const year = moment.utc(date).tz("Asia/Bangkok").format('YYYY')
    return  date !== undefined && moment(date).isValid() ? `${day}/${month}/${year}` :''
  }

  showDateTimeTH(date) {
    const day = moment.utc(date).tz("Asia/Bangkok").format('DD')
    const month = moment.utc(date).tz("Asia/Bangkok").format('MM')
    const year = moment.utc(date).tz("Asia/Bangkok").format('YYYY')
    const time = moment.utc(date).tz("Asia/Bangkok").format('HH:mm')
    return  date !== undefined && moment(date).isValid() ? `${day}/${month}/${year} ${time}` :''
  }

  showFullDateTH(date) {
    const day = moment.utc(date).tz("Asia/Bangkok").format('DD')
    const month = moment.utc(date).tz("Asia/Bangkok").format('MM')
    const year = moment.utc(date).tz("Asia/Bangkok").format('YYYY')
    return  date !== undefined && moment(date).isValid() ? `${day} ${monthNames[parseInt(month) - 1]} ${year}` :''
  }

  showFullDateTimeTH(date) {
    const day = moment.utc(date).tz("Asia/Bangkok").format('DD')
    const month = moment.utc(date).tz("Asia/Bangkok").format('MM')
    const year = moment.utc(date).tz("Asia/Bangkok").format('YYYY')
    const time = moment.utc(date).tz("Asia/Bangkok").format('HH:mm')
    return  date !== undefined && moment(date).isValid() ? `${day} ${monthNames[parseInt(month) - 1]} ${year} เวลา ${time} น.` :''
  }
}