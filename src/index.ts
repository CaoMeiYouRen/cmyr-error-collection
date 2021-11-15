import { AV, AvOption } from './models/AV'
import { ErrorInfo } from './models/ErrorInfo'
import { errorFormat, getBrowserInfo, getCpuInfo } from './utils/helper'

export { AvOption, ErrorInfo, errorFormat }

export type InitOption = AvOption & {
    /**
     * 项目名称
     */
    projectName: string
    /**
     *  项目说明
     */
    description?: string
}

export class ErrorCollection {

    /**
     * 项目名称
     */
    private static projectName: string
    /**
     *  项目说明
     */
    private static description?: string

    public static init(option: InitOption) {
        const { projectName, description, ...avOption } = option
        AV.init(avOption)

        this.projectName = projectName
        this.description = description

        this.initWebErrorHandler()
        this.initNodeErrorHandler()
    }

    public static async pushError(info: ErrorInfo) {
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

    public static vueErrorHandler(err: unknown, instance: any, info: string) {
        const error: Error = errorFormat(err)
        if (!error) {
            console.error(err)
            return
        }
        this.pushError({
            type: 'Web',
            name: error.name || 'VueError',
            message: error.message,
            stack: error.stack,
            extraData: {
                info,
                browser: getBrowserInfo(),
                href: location.href,
            },
        })
    }

    private static initWebErrorHandler() {
        if (globalThis.addEventListener) {

            globalThis.addEventListener('error', (eventError) => {
                const error: Error = errorFormat(eventError.error)
                if (!error) {
                    console.error(eventError.error)
                    return
                }
                const info = new ErrorInfo({
                    type: 'Web',
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    extraData: {
                        browser: getBrowserInfo(),
                        href: location.href,
                    },
                })
                this.pushError(info)
            }, true)

            globalThis.addEventListener('unhandledrejection', (event) => {
                const error: Error = errorFormat(event.reason)
                if (!error) {
                    console.error('unhandledRejection', event.reason)
                    return
                }
                const info = new ErrorInfo({
                    type: 'Web',
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    extraData: {
                        browser: getBrowserInfo(),
                        href: location.href,
                    },
                })
                this.pushError(info)
            }, true)
        }
    }

    private static initNodeErrorHandler() {
        if (globalThis.process) {
            globalThis.process.on('uncaughtException', (err) => {
                const error: Error = errorFormat(err)
                if (!error) {
                    console.error('uncaughtException', err)
                    return
                }
                const info = new ErrorInfo({
                    type: 'Node',
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    extraData: {
                        os: getCpuInfo(),
                    },
                })
                this.pushError(info)
            })
            globalThis.process.on('unhandledRejection', (reason: any) => {
                const error: Error = errorFormat(reason)
                if (!error) {
                    console.error('unhandledRejection', reason)
                    return
                }
                const info = new ErrorInfo({
                    type: 'Node',
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    extraData: {
                        os: getCpuInfo(),
                    },
                })
                this.pushError(info)
            })
        }
    }

}
