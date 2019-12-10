# 后台管理商城项目接口文档

## 用户模块

域名：http://132.232.89.22:8033

1.  用户注册
    接口地址 : /register
    请求方式：post
    参数:
    |参数名| 类型 |是否必须|
    |---|---|----|
    |adminName |String | 是|
    |email|String | 是|
    |password|String | 是|
    |pass|String | 是|
    \*\*\*

    返回值：
    | 值 | 类型 | 说明 |
    | ---- | ------ | ------------------ |
    | code | int | 20000 相应成功 |
    | data | String | success 成功 error 失败|
    | message | String | 失败的信息 |

    请求示例子

    ```js
    axios.post("/register", {
      adminName: "sss",
      email: "123456@qq.com",
      password: "123456",
      pass: '123456'
    );
    ```

2.  用户登录

    接口地址 : /login
    请求方式：post
    参数:
    |参数名| 类型 |是否必须|
    |---|---|----|
    |username 或 email |String | 是|
    |password|String | 是|

    ***

    返回值：
    | 值 | 类型 | 说明 |
    | ---- | ------ | ------------------ |
    | code | int | 60204 该用户未注册，201 密码不正确 20000 登录成功 |
    | msg 和 message | string | 请求失败原因 |

    请求示例子

    ```js
    axios.post("/login", {
      username: "lili", //或者 email: "123456@qq.com",
      password: "123456"
    });
    ```

3.  获取当前登录用户信息

    接口地址 : /info
    请求方式：get
    参数:
    |参数名| 类型 |是否必须|
    |---|---|----|
    |token |String | 是|

    ***

    返回值：
    | 值 | 类型 | 说明 |
    | ---- | ------ | ------------------ |
    | code | int | 5005 登录时间已过期，请重新登录，20000 密码不正确 20000 登录成功 50008 登录失败，无法获取用户详细信息 |
    | message | string | 请求失败原因 |

    请求示例子

    ```js
    axios.get("/info?token= sadasdsad");
    ```

4.  退出登录

    接口地址 : /logout
    请求方式：post
    参数:
    |参数名| 类型 |是否必须|
    |---|---|----|
    |无 |

    ***

    返回值：
    | 值 | 类型 | 说明 |
    | ---- | ------ | ------------------ |
    | code | int | 20000 相应成功 |
    | data | string | success 成功 |

    请求示例子

    ```js
    axios.post("/logout");
    ```

5.  添加首页轮播图片

    接口地址 : /homebanner
    请求方式：post
    参数:
    |参数名| 类型 |是否必须|
    |---|---|----|
    |form | form 表单 | 是|

    ***

    返回值：
    | 值 | 类型 | 说明 |
    | ---- | ------ | ------------------ |
    | code | int | 20000 相应成功 |
    | data | string | success 上传成功 |
    | image| string | 数据库里面的图片地址 |
    | message | string | 请求后的提示信息 |

    请求示例子

    ```js
    <el-upload action="http://127.0.0.1:3088/homebanner"></el-upload>
    ```

6.  删除首页轮播图片

    接口地址 : /removebanner
    请求方式：post
    参数:
    |参数名| 类型 |是否必须|
    |---|---|----|
    |image | string | 是|

    ***

    返回值：
    | 值 | 类型 | 说明 |
    | ---- | ------ | ------------------ |
    | code | int | 20000 相应成功 |
    | data | string | success 删除成功 error 删除失败|
    | message | string | 请求后的提示信息 |

    请求示例子

    ```js
    axios.post("/removebanner", {
      image: "数据库里面的图片地址"
    });
    ```
