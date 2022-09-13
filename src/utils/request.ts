import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();

const instance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code === 200) {
      return res.data;
    }
    ElMessage({
      message: res.message || "Error",
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(new Error(res.message || "Error"));
  },
  (error: AxiosError) => {
    const resStatus = error.request.status;
    if (resStatus === 401) {
      ElMessage({
        message: "登录超时",
        type: "error",
        duration: 5 * 1000,
      });
      userStore.logout();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default instance;
