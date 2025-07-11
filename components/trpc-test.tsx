"use client"

import { trpc } from "@/lib/trpc"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TRPCTest() {
  const healthQuery = trpc.health.check.useQuery()

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>tRPC Connection Test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button onClick={() => healthQuery.refetch()} disabled={healthQuery.isFetching}>
            {healthQuery.isFetching ? "Testing..." : "Test Connection"}
          </Button>

          {healthQuery.data && (
            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800 font-medium">✅ tRPC Working!</p>
              <p className="text-sm text-green-600">Status: {healthQuery.data.status}</p>
              <p className="text-sm text-green-600">Time: {healthQuery.data.timestamp}</p>
            </div>
          )}

          {healthQuery.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-800 font-medium">❌ tRPC Error</p>
              <p className="text-sm text-red-600">{healthQuery.error.message}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
