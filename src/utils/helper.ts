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
