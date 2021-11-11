export class ErrorInfo {

    constructor(obj?: ErrorInfo) {
        if (obj) {
            Object.assign(this, obj)
        }
    }
    /**
     *  错误类型 Web/Node/...
     */
    type: 'Web' | 'Node'

    name?: string
    /**
     * 错误信息
     */
    message: string
    /**
     * 错误堆栈
     */
    stack?: string
    /**
     * 附加数据
     */
    extraData?: any
}
