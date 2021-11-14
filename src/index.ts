import { AV, AvOption } from './models/AV'
import { ErrorInfo } from './models/ErrorInfo'
import { errorFormat } from './utils/helper'

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

        this.initWebErrorHandle()
        this.initNodeErrorHandle()
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

    private static initWebErrorHandle() {
        if (globalThis.addEventListener) {
            const getBrowserInfo = () => ({
                appCodeName: navigator.appCodeName,
                appName: navigator.appName,
                appVersion: navigator.appVersion,
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
            })
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

    private static initNodeErrorHandle() {
        if (globalThis.process) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const os = require('os')
            const getCpuInfo = () => {
                const hostname = os.hostname() // 操作系统的主机名
                const type = os.type() // 操作系统名
                const platform = os.platform() // 编译时的操作系统名
                const arch = os.arch() // 操作系统 CPU 架构
                const release = os.release() // 操作系统的发行版本
                const totalmem = os.totalmem() // 系统内存总量
                const freemem = os.freemem() // 系统空闲内存量
                const cpuNum = os.cpus().length // CPU 数量
                return {
                    hostname,
                    type,
                    platform,
                    arch,
                    release,
                    totalmem,
                    freemem,
                    cpuNum,
                }
            }
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
