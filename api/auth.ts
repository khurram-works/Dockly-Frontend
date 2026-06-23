import { apiRequest, publicApiRequest, documents } from "./client";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL

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

interface Profile {
  slug: string;
  name: string;
  email: string;
  chatbotName: string;
}

interface passwordSchema {
  currentPassword: string;
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

export async function getDocuments(page: number) {
  const params = new URLSearchParams({
    page: String(page),
  });
  return apiRequest(`/dashboard/documents?${params.toString()}`, {
    method: "GET",
  });
}

export async function deleteDoc(documentId: string) {
  return apiRequest(`/dashboard/${documentId}/delete`, {
    method: "DELETE",
  });
}

export async function reprocessDoc(documentId: string) {
  return apiRequest(`/dashboard/${documentId}/reprocess`, {
    method: "POST",
  });
}

export async function comp_chatbot_info(slug: string) {
  return publicApiRequest(`/chat/${slug}`, {
    method: "GET",
  });
}

export async function sendChatMessageStream(
  question: string,
  companyId: string,
  sessionId: string,
  conversationHistory: { role: string; content: string }[],
): Promise<Response> {
  const response = await fetch(`${BASE_URL}/chat/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      companyId,
      sessionId,
      conversationHistory,
    }),
  });
  return response;
}

export async function analytics() {
  return apiRequest("/dashboard/analytics", {
    method: "GET",
  });
}

export async function conversations(
  page: number,
  status: string,
  days: number,
  search: string,
) {
  const params = new URLSearchParams({
    page: String(page),
    status,
    days: String(days),
    search,
  });

  return apiRequest(
    `/dashboard/conversations?${params.toString()}`,

    {
      method: "GET",
    },
  );
}

export async function conversationDetail(id: string) {
  return apiRequest(`/dashboard/conversations/${id}`, {
    method: "GET",
  });
}

export async function companyDetails(id: string) {
  return apiRequest(`/dashboard/profile/${id}`, {
    method: "GET",
  });
}

export async function updateCompanyProfile(data: Profile) {
  return publicApiRequest("/dashboard/profile/update", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function updatePassword(data: passwordSchema) {
  return publicApiRequest("/dashboard/profile/password", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function docDetails(id: string) {
  return apiRequest(`/dashboard/documents/${id}`, {
    method: "GET",
  });
}
