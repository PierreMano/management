import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import EmployeeForm from "@/components/employee-form"

async function getEmployee(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/employees/${id}`, {
      cache: "no-store"
    })
    
    if (!response.ok) {
      throw new Error("Failed to fetch employee")
    }
    
    return await response.json()
  } catch (error) {
    console.error("Error fetching employee:", error)
    return null
  }
}

export default async function EditEmployeePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }
  
  const employee = await getEmployee(params.id)
  
  if (!employee) {
    redirect("/")  // Redirect to homepage or show an error
  }
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Edit Employee: {employee.firstName} {employee.lastName}</h1>
      <EmployeeForm employee={employee} />
    </div>
  )
}