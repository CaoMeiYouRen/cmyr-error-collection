import fetch from 'isomorphic-unfetch'
import { AbortController } from 'node-abort-controller'

export type Method =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK'

export interface AjaxConfig {
    url: string
    query?: Record<string, string>
    data?: Record<string, unknown>
    method?: Method
    headers?: Record<string, string>
    baseURL?: string
    timeout?: number
}

export type AjaxFunction = (config: AjaxConfig) => Promise<any>

/**
 * 接口封装
 * @param config
 * @returns
 */
export async function ajax(config: AjaxConfig) {
    try {
        const { url, query = {}, data = {}, method = 'GET', headers = {}, baseURL = '', timeout = 10000 } = config
        const isFullURL = url.startsWith('https://') || url.startsWith('http://')
        const _url = isFullURL ? new URL(url, baseURL) : new URL(baseURL + url, baseURL)
        _url.search = new URLSearchParams(query).toString()
        const controller = new AbortController()
        return Promise.race([
            fetch(_url.toString(), {
                method,
                headers,
                body: JSON.stringify(data),
                signal: controller.signal as AbortSignal,
            }).then((resp) => resp.json()),
            new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('Ajax timeout!'))
                    controller.abort(new Error('Ajax timeout!'))
                }, timeout)
            }),
        ])
    } catch (error) {
        console.error(error)
        throw error
    }
}
