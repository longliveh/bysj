import axios from "axios";
import store from "../../store";
import storage from "../../utils/storage";
import router from "../../router";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api 的 base_url
  timeout: 5000000, // 请求超时时间
  method: "post",
  headers: {
    "Content-Type": "application/json"
  } //请求头
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.userInfo) {
      config.headers["X-Token"] = store.getters.token;
    }
    if (config.method === "post") {
      config.data = config.params;
      config.params = "";
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    let { data, code, msg } = response.data;
    if (code == 20001 && store.state.user.islogin) {
      router.go(0);
      console.log("清理storage");
      storage.cle();
    }

    return response.data;

    // if (code == 200) {
    //   // if(status===500) 处理token过期等
    //   return Promise.resolve(false);
    // }
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
