export interface Employee {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  role: "Admin" | "Staff"
  createdAt: string
  updatedAt: string
}

export interface User {
  _id: string
  name: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
}

