import axios, { AxiosResponse, Method } from 'axios'

export interface AjaxConfig {
    url: string
    query?: Record<string, unknown>
    data?: Record<string, unknown>
    method?: Method
    headers?: Record<string, string>
    baseURL?: string
}

/**
 * axios 接口封装
 *
 * @author CaoMeiYouRen
 * @export
 * @param {AjaxConfig} config
 * @returns {PPromise<AxiosResponse<any, any>>}
 */
export async function ajax(config: AjaxConfig): Promise<AxiosResponse<any, any>> {

    try {
        const { url, query = {}, data = {}, method = 'GET', headers = {}, baseURL } = config
        const resp = await axios(url, {
            method,
            headers,
            params: query,
            data,
            timeout: 10000,
            baseURL,
        })
        return resp
    } catch (error) {
        if (error.response) {
            console.error(error.toJSON())
        }
        console.error(error)
        throw error
    }
}
