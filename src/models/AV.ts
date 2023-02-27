import md5 from 'md5'
import { SafeJsonType } from 'safe-json-type/dist/browser.esm'
import { AjaxConfig, AjaxFunction } from '../utils/ajax2'

export interface AvOption {
    appId: string
    appKey: string
    // masterKey?: string
    /**
     * rest api 地址，例如：https://api.example.com/1.1
     *
     * @author CaoMeiYouRen
     * @date 2022-07-20
     */
    baseURL?: string
    /**
     * rest api 基础地址，例如：https://api.example.com，和 baseURL 的不同之处在于只需要域名部分即可
     *
     * @author CaoMeiYouRen
     * @date 2022-07-20
     */
    serverURL?: string
    /**
     * 提交数据的地址，例如 https://api.example.com/1.1/classes/ErrorInfo。该地址为最高优先级，可自定义地址，然后处理提交的数据。提交方式为 POST
     *
     * @author CaoMeiYouRen
     * @date 2023-02-27
     */
    createObjectURL?: string

    ajax?: AjaxFunction
}

export class AV {
    private static appId: string
    private static appKey: string
    private static baseURL?: string
    private static serverURL?: string
    private static createObjectURL?: string
    private static isInit: boolean = false
    private static ajax: AjaxFunction

    public static init(option: AvOption) {
        Object.assign(this, option)
        this.isInit = true
    }

    public static setAjax(_ajax: AjaxFunction) {
        this.ajax = _ajax
    }

    public static async request(config: AjaxConfig) {
        if (!this.isInit) {
            throw new Error('cmyr-error-collection 未初始化！')
        }
        if (!this.ajax) {
            throw new Error('ajax 未初始化！')
        }
        if (!this.createObjectURL) {
            if (!this.appId || !this.appKey) {
                throw new Error('appId 或 appKey 为空！')
            }
        }
        let baseURL = `https://${this.appId.slice(0, 8).toLowerCase()}.api.lncldglobal.com/1.1`
        if (this.serverURL) {
            baseURL = `${this.serverURL}/1.1`
        } else if (this.baseURL) {
            baseURL = this.baseURL
        }
        const timestamp = Date.now()
        return this.ajax({
            baseURL,
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
            url: this.createObjectURL || `/classes/${className}`,
            method: 'POST',
            data: SafeJsonType.toSafeJson(obj),
        })
    }
}
