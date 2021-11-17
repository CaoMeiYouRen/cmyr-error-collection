import { AV, AvOption } from './models/AV'
import { ErrorInfo, ErrorMeta, ErrorType } from './models/ErrorInfo'
import { errorFormat, getBrowserInfo, getCpuInfo, getRuntimeEnv } from './utils/helper'

export { AvOption, ErrorInfo, errorFormat, ErrorMeta, ErrorType }

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

    public static async pushError(err: unknown, meta: ErrorMeta = { type: getRuntimeEnv() }) {
        console.error(err)
        const error: Error = errorFormat(err)
        if (!error) {
            return false
        }
        const info = new ErrorInfo({
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
        this.pushError(error, {
            type: 'Web',
            extraData: {
                info,
                browser: getBrowserInfo(),
                href: location.href,
            },
        })
    }

    private static initWebErrorHandler() {
        if (globalThis.addEventListener) {

            const getExtraData = () => ({
                browser: getBrowserInfo(),
                href: location.href,
            })

            globalThis.addEventListener('error', (eventError) => {
                const error: Error = eventError.error
                this.pushError(error, {
                    type: 'Web',
                    extraData: {
                        ...getExtraData(),
                    },
                })
            }, true)

            globalThis.addEventListener('unhandledrejection', (event) => {
                const error: Error = event.reason
                this.pushError(error, {
                    type: 'Web',
                    extraData: {
                        ...getExtraData(),
                    },
                })
            }, true)
        }
    }

    private static initNodeErrorHandler() {
        if (globalThis.process) {

            globalThis.process.on('uncaughtException', (error) => {
                this.pushError(error, {
                    type: 'Node',
                    extraData: {
                        nodeVersion: process.versions.node,
                        os: getCpuInfo(),
                    },
                })
            })

            globalThis.process.on('unhandledRejection', (reason: any) => {
                const error: Error = reason
                this.pushError(error, {
                    type: 'Node',
                    extraData: {
                        nodeVersion: process.versions.node,
                        os: getCpuInfo(),
                    },
                })
            })
        }
    }
}
