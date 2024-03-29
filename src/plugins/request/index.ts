import axios, {
  AxiosRequestConfig,
  AxiosError,
  AxiosInstance,
  AxiosResponse,
} from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/plugins/store/modules/user";

const userStore = useUserStore();

interface IAxiosInstance extends AxiosInstance {
  (config: AxiosRequestConfig): IAxiosPromise;
  (url: string, config?: AxiosRequestConfig): IAxiosPromise;
}

export type IAxiosPromise<T = any> = Promise<T>;

const instance: IAxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20000,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (userStore.accessToken && config.headers) {
      config.headers["Authorization"] = "Bearer " + userStore.accessToken;
    }
    return config;
  },
  (error: AxiosError) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    return res.data;
  },
  (error: AxiosError) => {
    const errorResponse = error.response as AxiosResponse;
    const resStatus = errorResponse.status;
    if (resStatus === 401) {
      ElMessage({
        showClose: true,
        message: "登录超时",
        type: "error",
        duration: 3 * 1000,
      });
      userStore.logout();
      return Promise.reject(error);
    }

    ElMessage({
      showClose: true,
      message:
        errorResponse.data.error || errorResponse.data.data.message || "Error",
      type: "error",
      duration: 3 * 1000,
    });

    return Promise.reject(error);
  }
);

export default instance;
