import md5 from 'md5'
import { SafeJsonType } from 'safe-json-type/dist/browser.esm'
import { ajax, AjaxConfig } from '@/utils/ajax2'

export interface AvOption {
    appId: string
    appKey: string
    // masterKey?: string
    baseURL?: string
}

export class AV {

    private static appId: string
    private static appKey: string
    private static baseURL?: string
    private static isInit: boolean = false

    public static init(option: AvOption) {
        Object.assign(this, option)
        this.isInit = true
    }

    public static async request(config: AjaxConfig) {
        if (!this.isInit) {
            throw new Error('cmyr-error-collection 未初始化！')
        }
        if (!this.appId || !this.appKey) {
            throw new Error('appId 或 appKey 为空！')
        }
        const timestamp = Date.now()
        return ajax({
            baseURL: this.baseURL || `https://${this.appId.slice(0, 8).toLowerCase()}.api.lncldglobal.com/1.1`,
            headers: {
                'Content-Type': 'application/json',
                'X-LC-Id': this.appId,
                'X-LC-Sign': `${md5(timestamp + this.appKey)},${timestamp}`,
            },
            ...config,
        })
    }

    public static async createObject(className: string, obj: Record<string, unknown>) {
        return this.request({
            url: `/classes/${className}`,
            method: 'POST',
            data: SafeJsonType.toSafeJson(obj),
        })
    }
}
