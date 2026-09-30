const VOLUNTEER_STORAGE_KEY = "instituto-novo-horizonte:voluntarios:v1";

function readJson(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch {
    try {
      localStorage.removeItem(key);
    } catch {
      // O navegador pode bloquear o armazenamento; a aplicação continua sem persistência.
    }
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function getVolunteerApplications() {
  const value = readJson(VOLUNTEER_STORAGE_KEY, []);
  return Array.isArray(value) ? value.filter((item) => item && typeof item === "object") : [];
}

export function saveVolunteerApplication(application) {
  const applications = getVolunteerApplications();
  const record = {
    name: String(application.name ?? "").trim(),
    email: String(application.email ?? "").trim(),
    area: String(application.area ?? "").trim(),
    availability: String(application.availability ?? "").trim(),
    submittedAt: new Date().toISOString(),
  };

  applications.push(record);
  return writeJson(VOLUNTEER_STORAGE_KEY, applications) ? record : null;
}
