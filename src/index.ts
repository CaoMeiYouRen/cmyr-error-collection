import * as AV from 'leancloud-storage'
import { ErrorInfo } from './models/ErrorInfo'
export { ErrorInfo }
export type InitOption = Parameters<typeof AV.init>[0] & {
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

            const obj = new AV.Object('ErrorInfo')
            for (const key in info) {
                obj.set(key, (info as any)[key])
            }
            obj.set('projectName', this.projectName)
            obj.set('collectTime', new Date())

            const acl = new AV.ACL()
            acl.setPublicReadAccess(true) // 允许公开读取
            acl.setPublicWriteAccess(false) // 禁止公开写入
            obj.setACL(acl)

            try {
                await obj.save()
                return true
            } catch (error) {
                console.error(error)
                return false
            }
        } catch (error2) {
            console.error(error2)
        }
    }

    private static initWebErrorHandle() {
        if (globalThis.addEventListener) {
            globalThis.addEventListener('error', (eventError) => {
                let error: Error
                if (eventError.error instanceof Error) {
                    error = eventError.error
                } else if (typeof eventError.error === 'string') {
                    error = new Error(eventError.error)
                } else {
                    console.error(error)
                    return
                }
                const info = new ErrorInfo({
                    type: 'Web',
                    name: error.name,
                    message: error.message,
                    stack: error.stack,
                    extraData: {
                        appCodeName: navigator.appCodeName,
                        appName: navigator.appName,
                        appVersion: navigator.appVersion,
                        userAgent: navigator.userAgent,
                        language: navigator.language,
                        platform: navigator.platform,
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
            globalThis.process.on('uncaughtException', (error) => {
                if (!(error instanceof Error)) {
                    console.error('uncaughtException', error)
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
            globalThis.process.on('unhandledRejection', (reason: any, p) => {
                let error: Error
                if (reason instanceof Error) {
                    error = reason
                } else if (typeof reason === 'string') {
                    error = new Error(reason)
                } else {
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
