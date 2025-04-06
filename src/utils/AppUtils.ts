import router from '@/router/router';
import StringUtil from "@/utils/StringUtil"; // 引入路由实例

const replaceUrlQuery = (key: string, value: string) =>{
    // 获取当前 URL
    const currentUrl = new URL(window.location.href);

    // 使用 URLSearchParams 操作查询参数
    const searchParams = new URLSearchParams(currentUrl.search);

    // 更新或新增参数
    searchParams.set(key, value); // set 方法会自动新增或更新参数

    // 将更新后的查询参数重新设置到 URL 中
    currentUrl.search = searchParams.toString();

    // 使用 history.pushState 更新浏览器 URL
    window.history.pushState({}, '', currentUrl.toString());
}

const getUrlQuery = (key:string): string => {
    const currentRoute = router.currentRoute.value; // 当前路由对象
    const value = currentRoute.query[key]
    return StringUtil.isEmpty(value) ? '' : String(value);
}


export default {
    replaceUrlQuery: (key, value) => replaceUrlQuery(key, value),
    getUrlQuery: (key): string => getUrlQuery(key)
}
