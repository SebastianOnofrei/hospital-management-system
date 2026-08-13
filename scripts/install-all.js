const { execSync } = require("node:child_process");

const projects = [
  ".",
  "apps/medical-web-portal",
  "apps/admin-dashboard",
  "services/api-gateway",
  "services/appointment-service",
  "services/auth-service",
  "services/billing-service",
  "services/doctor-service",
  "services/notification-service",
  "services/patient-service",
  "services/pharmacy-service",
];

for (const project of projects) {
  console.log(`\nInstalling dependencies: ${project} 🚀`);

  execSync("npm install", {
    cwd: project,
    stdio: "inherit",
  });
}

console.log("\n✅All dependencies installed successfully.");
