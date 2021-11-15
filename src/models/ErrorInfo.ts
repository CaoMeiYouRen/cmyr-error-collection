export type ErrorType = 'Web' | 'Node' | 'Unknown'

export class ErrorMeta {
    /**
     *  错误类型 Web/Node/...
     */
    type: ErrorType

    /**
     * 附加数据
     */
    extraData?: any
}

export class ErrorInfo extends ErrorMeta {
    constructor(obj?: ErrorInfo) {
        super()
        if (obj) {
            Object.assign(this, obj)
        }
    }

    name?: string
    /**
     * 错误信息
     */
    message: string
    /**
     * 错误堆栈
     */
    stack?: string
}
