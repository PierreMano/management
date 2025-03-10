import { connectToDatabase } from "@/lib/db"
import { Employee } from "@/lib/models/employee"

export async function getEmployees() {
  await connectToDatabase()
  const employees = await Employee.find({}).sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(employees))
}

export async function getEmployeeById(id: string) {
  await connectToDatabase()
  const employee = await Employee.findById(id)
  if (!employee) return null
  return JSON.parse(JSON.stringify(employee))
}

export async function createEmployee(employeeData: any) {
  await connectToDatabase()
  const employee = await Employee.create(employeeData)
  return JSON.parse(JSON.stringify(employee))
}

export async function updateEmployee(id: string, employeeData: any) {
  await connectToDatabase()
  const employee = await Employee.findByIdAndUpdate(id, { ...employeeData }, { new: true, runValidators: true })
  if (!employee) return null
  return JSON.parse(JSON.stringify(employee))
}

export async function deleteEmployee(id: string) {
  await connectToDatabase()
  const employee = await Employee.findByIdAndDelete(id)
  if (!employee) return null
  return JSON.parse(JSON.stringify(employee))
}

