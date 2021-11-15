import { ErrorType } from '@/models/ErrorInfo'

/**
 * 只处理 Error 和 string 类型的错误，并将 string 类型的包装为 Error 类型，其余返回 null
 * @param error
 * @returns
 */
export function errorFormat(error: unknown): Error | null {
    if (error instanceof Error) {
        return error
    }
    if (typeof error === 'string') {
        return new Error(error)
    }
    return null
}

export function getBrowserInfo() {
    return {
        appCodeName: navigator.appCodeName,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
    }
}

export function getCpuInfo() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const os = require('os')
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

/**
 *  获取执行环境
 */
export function getRuntimeEnv(): ErrorType {
    if (globalThis.window) {
        return 'Web'
    }
    if (globalThis.process) {
        return 'Node'
    }
    return 'Unknown'
}
