import { AV, AvOption } from './models/AV'
import { ErrorInfo, ErrorMeta, ErrorType } from './models/ErrorInfo'
import { AjaxConfig, AjaxFunction, Method } from './utils/ajax2'
import { errorFormat, getBrowserInfo, getExtraData, getRuntimeEnv } from './utils/helper'

export { AvOption, ErrorInfo, errorFormat, ErrorMeta, ErrorType, AjaxFunction, AjaxConfig, Method }

export type InitOption = AvOption & {
    /**
     * 项目名称
     */
    projectName: string

}

export class ErrorCollection {

    /**
     * 项目名称
     */
    private static projectName: string

    public static init(option: InitOption) {
        const { projectName, ...avOption } = option
        AV.init(avOption)

        this.projectName = projectName

        this.initWebErrorHandler()
        this.initNodeErrorHandler()
    }

    public static async pushError(err: unknown, meta: ErrorMeta = { type: getRuntimeEnv() }) {
        console.error(err)
        const error: Error = errorFormat(err)
        if (!error) {
            return false
        }
        const info = new ErrorInfo({
            extraData: getExtraData(),
            ...meta,
            name: error.name,
            message: error.message,
            stack: error.stack,
        })
        return this.pushErrorInfo(info)
    }

    public static async pushErrorInfo(info: ErrorInfo) {
        try {
            const obj = {
                ...info,
                projectName: this.projectName,
                collectTime: new Date(),
                ACL: { // ACL 只读
                    '*': {
                        read: true,
                    },
                },
            }

            try {
                await AV.createObject('ErrorInfo', obj)
                return true
            } catch (error) {
                console.error(error)
                return false
            }
        } catch (error2) {
            console.error(error2)
            return false
        }
    }

    public static vueErrorHandler(error: unknown, instance: any, info: string) {
        ErrorCollection.pushError(error, {
            type: 'Web',
            extraData: {
                href: location.href,
                info,
                browser: getBrowserInfo(),
            },
        })
    }

    private static initWebErrorHandler() {
        if (typeof globalThis.addEventListener === 'function') {
            globalThis.addEventListener('error', (eventError) => {
                const error: Error | string = eventError.error || eventError.message
                this.pushError(error)
            }, true)
            globalThis.addEventListener('unhandledrejection', (event) => {
                const error: Error = event.reason
                this.pushError(error)
            }, true)
        }
    }

    private static initNodeErrorHandler() {
        if (globalThis.process && typeof globalThis.process.on === 'function') {
            globalThis.process.on('uncaughtException', (error) => {
                this.pushError(error)
            })
            globalThis.process.on('unhandledRejection', (reason: any) => {
                const error: Error = reason
                this.pushError(error)
            })
        }
    }
}
