module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    //关闭组件命名规则
    "vue/multi-word-component-names": "off",
    //检测未使用的变量，函数和函数的参数
    "@typescript-eslint/no-unused-vars": "off",
    //
    "@typescript-eslint/no-empty-interface": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.vue"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
};
