import md5 from 'md5'
import { SafeJsonType } from 'safe-json-type'
import { ajax, AjaxConfig } from '../utils/ajax'

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

    public static init(option: AvOption) {
        Object.assign(this, option)
    }

    public static async request(config: AjaxConfig) {
        const timestamp = Date.now()
        return ajax({
            baseURL: this.baseURL || 'https://yrvulqtr.api.lncldglobal.com/1.1',
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
