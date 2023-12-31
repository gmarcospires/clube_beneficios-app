interface API_PAGE_RESPONSE<T> {
  current_page: number;
  frist_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
  data: T[];
}

interface Products {
  create_at: string;
  description: string;
  id: number;
  name: string;
  price: number;
  stock: number;
  image: string;
  update_at: string;
  discount?: Discount;
}

interface Clients {
  id: number;
  user_id: number;
  points: number;
  status: "active" | "inactive";
  create_at: string;
  update_at: string;
  user?: User;
}

interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
  password?: string;
  remember_token?: string;
  role: "admin" | "user";
  create_at: string;
  update_at: string;
  clients?: Clients;
}

interface Discount {
  id: number;
  product_id: number;
  user_id: number;
  discount: number;
  valid_until: string;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
  product?: Products;
  user?: User;
}

interface Sale {
  id: number;
  client_id: number;
  total: number;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
  updated_at: string;
  client?: Clients;
  products?: Products[];
}

interface SalesProducts {
  id: number;
  sale_id: number;
  product_id: number;
  quantity: number;
  price: number;
  status: "active" | "cancelled";
  created_at: string;
  updated_at: string;
}
