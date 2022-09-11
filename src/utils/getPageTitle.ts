import { RouteMeta } from "vue-router";

const title = "奇点";

function getPageTitle(data: string | RouteMeta): string {
  if (typeof data === "string") {
    return `${data} - ${title}`;
  } else {
    return `${data?.title || ""} - ${title}`;
  }
}

export default getPageTitle;
