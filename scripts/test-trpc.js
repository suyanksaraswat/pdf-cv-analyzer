// Simple Node.js script to test tRPC endpoint directly
const fetch = require("node-fetch")

async function testTRPC() {
  try {
    const response = await fetch("http://localhost:3000/api/trpc/health.check", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("Response status:", response.status)
    const data = await response.text()
    console.log("Response data:", data)
  } catch (error) {
    console.error("Error testing tRPC:", error)
  }
}

testTRPC()
