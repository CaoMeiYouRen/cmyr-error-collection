import { AV } from './models/AV'
import { ajax } from './utils/ajax2'
export * from './custom'

AV.setAjax(ajax)
