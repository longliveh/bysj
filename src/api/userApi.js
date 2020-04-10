import request from "@/utils/baseRequest/json";

const user = {
  //登录
  login(form) {
    return request({
      url: "/login",
      method: "post",
      params: form
    });
  },
  //用户信息
  getInfo({ token }) {
    return request({
      url: "/userInfo",
      method: "post",
      params: {
        token
      }
    });
  },
  //登出
  logOut({ token }) {
    return request({
      url: "/userLogout",
      method: "post",
      params: {
        token
      }
    });
  }
};
export default user;
