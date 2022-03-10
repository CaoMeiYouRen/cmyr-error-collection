import { uuid } from '../utils/helper'

export type ErrorType = 'Web' | 'Node' | 'Unknown'

export interface ErrorMeta {
    /**
     *  错误类型 Web/Node/...
     */
    type: ErrorType

    /**
     * 附加数据
     */
    extraData?: any
}

export class ErrorInfo implements ErrorMeta {
    constructor(obj?: ErrorInfo) {
        if (obj) {
            Object.assign(this, obj)
        }
    }

    uuid?: string = uuid()

    type: ErrorType

    extraData?: any

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
