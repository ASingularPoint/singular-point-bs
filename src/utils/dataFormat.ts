import dayjs from "dayjs";
export class TimeFormat {
  private dataKey: string | string[];

  constructor(dataKey: string | string[]) {
    this.dataKey = dataKey || "";
  }

  pipe(data: CommonTable<any>) {
    data.records.map((item) => {
      if (Array.isArray(this.dataKey)) {
        this.dataKey.forEach((key) => {
          if ((<any>Object).hasOwn(item, key)) {
            item[key] = this.format(item[key]);
          }
        });
      } else {
        if ((<any>Object).hasOwn(item, this.dataKey)) {
          item[this.dataKey] = this.format(item[this.dataKey]);
        }
      }
      return item;
    });
    return data;
  }

  private format(data: string | number) {
    return dayjs(data).format("YYYY-MM-DD HH:mm:ss");
  }
}
