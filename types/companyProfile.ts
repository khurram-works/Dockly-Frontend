export interface Company {
  id: string;
  name: string;
  email: string;
  password: string;
  slug: string;
  chatbotName: string;
  welcomeMessage: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyResponse {
  success: boolean;
  company: Company;
}