import { useState } from "react"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="border border-black bg-white rounded shadow">
        <h1>form</h1>
      </div>
    </div>
  )
}
