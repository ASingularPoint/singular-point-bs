# singular-point-bs

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

#### 遇到问题与解决：

问题：由于项目使用动态路由，在第一次进入路由守卫时，菜单路由数据未添加导致出现找不到路由的警告
解决：通过设置错误页面(404)来解决

```
{
path: "/:catchAll(.\*)",
component: () => import("@/views/error/index.vue"),
},
```
