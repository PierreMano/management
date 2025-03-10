import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getEmployeeById, updateEmployee, deleteEmployee } from "@/lib/employee-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const employee = await getEmployeeById(params.id)

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json(employee)
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const employee = await updateEmployee(params.id, body)

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json(employee)
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const employee = await deleteEmployee(params.id)

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Employee deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

