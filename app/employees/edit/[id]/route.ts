import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import mongoose from "mongoose"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { connectToDatabase } from "@/lib/db"
import { Employee } from "@/lib/models/employee"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectToDatabase()

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid employee ID" }, { status: 400 })
    }

    const employee = await Employee.findById(params.id).lean()

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 })
    }

    // Convert MongoDB document to plain object with string IDs
    const employeeData = {
      ...employee,
      _id: employee._id.toString(),
      createdAt: employee.createdAt?.toISOString(),
      updatedAt: employee.updatedAt?.toISOString(),
    }

    return NextResponse.json(employeeData)
  } catch (error: any) {
    console.error("Error fetching employee:", error)
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
    await connectToDatabase()

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid employee ID" }, { status: 400 })
    }

    const employee = await Employee.findByIdAndUpdate(params.id, { ...body }, { new: true, runValidators: true }).lean()

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 })
    }

    // Convert MongoDB document to plain object with string IDs
    const employeeData = {
      ...employee,
      _id: employee._id.toString(),
      createdAt: employee.createdAt?.toISOString(),
      updatedAt: employee.updatedAt?.toISOString(),
    }

    return NextResponse.json(employeeData)
  } catch (error: any) {
    console.error("Error updating employee:", error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectToDatabase()

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ message: "Invalid employee ID" }, { status: 400 })
    }

    const employee = await Employee.findByIdAndDelete(params.id)

    if (!employee) {
      return NextResponse.json({ message: "Employee not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Employee deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting employee:", error)
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

