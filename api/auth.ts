import { apiRequest, publicApiRequest } from "./client";


interface loginType {
  email: string;
  password: string;
}

interface registerType {
  slug: string;
  name: string;
  email: string;
  password: string;
}

export async function loginUser(data: loginType) {
  return publicApiRequest("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


export async function registerUser(data: registerType){
  return publicApiRequest("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifySession() {
  return apiRequest("/session", {
    method: "GET",
  });
}

export async function dashboardData() {
  return apiRequest("/dashboard", {
    method: "GET",
  });
}

export async function logoutUser() {
  return publicApiRequest("/logout", {
    method: "POST",
  });
}
