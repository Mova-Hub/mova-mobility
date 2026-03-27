// src/api/apiService.js

export const API_BASE_URL = "https://api.mova-mobility.com/api"; // URL de prod
// export const API_BASE_URL = "http://127.0.0.1:8000/api"; // URL de dev locale

export class ApiError extends Error {
  constructor(status, message, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function hasWindow() {
  return typeof window !== "undefined";
}

const TOKEN_KEY = "authToken";

const storage = {
  getToken() {
    if (!hasWindow()) return null;
    try {
      return window.localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken(token) {
    if (!hasWindow()) return;
    try {
      window.localStorage.setItem(TOKEN_KEY, token);
    } catch {}
  },
  removeToken() {
    if (!hasWindow()) return;
    try {
      window.localStorage.removeItem(TOKEN_KEY);
    } catch {}
  },
};

export function buildQuery(params) {
  if (!params) return "";
  const entries = Object.entries(params).filter(
    ([, v]) => v !== null && v !== undefined && String(v) !== ""
  );
  if (entries.length === 0) return "";
  const sp = new URLSearchParams();
  for (const [k, v] of entries) sp.append(k, String(v));
  return `?${sp.toString()}`;
}

async function doFetch(method, path, data = null, options = {}) {
  const token = storage.getToken();
  
  // Base headers
  const headers = {
    Accept: "application/json",
    ...options.headers,
  };

  // Ajout du token si présent
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const fetchOptions = {
    method,
    headers,
  };

  // Gestion du body
  if (data !== null && data !== undefined) {
    // Si c'est un FormData (pour l'upload de fichier), on ne met PAS de Content-Type.
    // Le navigateur va générer le bon Content-Type avec le "boundary" automatiquement.
    if (data instanceof FormData) {
      fetchOptions.body = data;
      // Il faut supprimer le Content-Type s'il a été mis par défaut
      delete headers["Content-Type"];
    } else {
      // Sinon, on envoie du JSON classique
      headers["Content-Type"] = "application/json";
      fetchOptions.body = JSON.stringify(data);
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, fetchOptions);

  if (res.status === 204) {
    return { success: true, data: null, status: res.status };
  }

  const contentType = res.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const json = await res.json();

    if (!res.ok) {
      const payload = json || {};
      const msg = payload.message || `Erreur API (${res.status})`;
      throw new ApiError(res.status, msg, payload);
    }

    return { success: true, data: json, status: res.status };
  }

  const text = await res.text();
  if (!res.ok) {
    throw new ApiError(res.status, `Réponse inattendue (${res.status}): ${text.slice(0, 120)}`);
  }

  return { success: true, data: text, status: res.status };
}

export const apiService = {
  getToken: storage.getToken,
  setToken: storage.setToken,
  removeToken: storage.removeToken,

  get(path) {
    return doFetch("GET", path);
  },
  post(path, data, options) {
    return doFetch("POST", path, data, options);
  },
  put(path, data) {
    return doFetch("PUT", path, data);
  },
  delete(path) {
    return doFetch("DELETE", path);
  },
};

export default apiService;