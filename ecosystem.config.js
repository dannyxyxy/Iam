module.exports = {
  apps: [
    {
      name: "iam-front",
      script: "vite",
      instances: 0,
      exec_mode: "cluster",
      watch: ".",
    },
  ],
};
