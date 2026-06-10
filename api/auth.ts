import { apiRequest, publicApiRequest, documents } from "./client";

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

export async function registerUser(data: registerType) {
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

export async function uploadDoc(data: FormData) {
  return documents("/dashboard/documents", {
    method: "POST",
    body: data,
  });
}

export async function getDocuments() {
  return apiRequest("/dashboard/documents", {
    method: "GET"
  });
}

export async function deleteDoc(documentId: string){
  return apiRequest(`/dashboard/${documentId}/delete`,{
    method: "DELETE"
  })
}

export async function reprocessDoc(documentId: string){
  return apiRequest( `/dashboard/${documentId}/reprocess`,{
    method: "POST"
  })
}

export async function comp_chatbot_info(slug: string){
  return publicApiRequest(`/chat/${slug}`,{
    method: "GET"
  })
}
