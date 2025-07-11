import { router } from "../trpc"
import { pdfRouter } from "./pdf"
import { publicProcedure } from "../trpc"

export const appRouter = router({
  pdf: pdfRouter,
  // Add a simple health check endpoint for testing
  health: router({
    check: publicProcedure.query(() => {
      return { status: "ok", timestamp: new Date().toISOString() }
    }),
  }),
})

export type AppRouter = typeof appRouter
