// router
interface MenuRecord {
  component: string;
  createTime: string;
  fullPath: string;
  icon: string;
  id: number;
  keepAlive: boolean;
  name: string;
  parent: number;
  path: string;
  title: string;
  redirect: string;
  children?: MenuRecord[];
  orderIndex: number;
}
