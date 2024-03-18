提供基于浏览器的`storage`、`cookie`的简易操作，支持`storage`过期、序列化、返序列化、加密、解密等功能。

# 安装
```bash
npm add @coderlzw/web-store
```

# 使用

```ts
import { Cookie, Storage, CryptoJS } from 'web-storage';
import {getStorage, setStorage, removeStorage, clearStorage} from "@coderlzw/web-store/storage"
import {setCookie, removeCookie, getCookie, clearCookie} from "@coderlzw/web-store/cookie"
```
## storage
1.  存储
    ```js
    // 存储
    setStorage({
        key: 'name',
        value: 'zhangsan',
        type: 'localStorage'
    })
    // 设置过期时间
    setStorage({
        key: 'name',
        value: 'zhangsan',
        type: 'localStorage',
        expire: 1000  // ms
    })
    // 加密存储
    setStorage({
        key: 'name',
        value: 'zhangsan',
        type: 'localStorage',
        encrypt: true,
        secretKey: "secretKey"
    })
    ```
2. 获取
    ```js
    // 获取
    getStorage<string>({
        key: 'name',
        type: 'localStorage'
    });
    ```
3. 删除
    ```js
    // 通过传递密钥获取解密后的值
    getStorage({
        key: 'name',
        type: 'localStorage',
        secretKey: "secretKey"
    })
 
    // 获取所有值
    getAllStorage('localStorage')
    
    // 删除
    removeStorage({
        key: 'name',
        type: 'localStorage'
    })
    
    // 清空
    clearStorage('localStorage')
    ```

## cookie

```js
// 设置 cookie
setCookie({
    key: 'name',
    value: 'vite',
    expires: '2022-12-31 23:59:59'
})

// 获取 cookie
getCookie('name')

// 删除 cookie
removeCookie('name')

// 清空 cookie
clearCookie();
```
