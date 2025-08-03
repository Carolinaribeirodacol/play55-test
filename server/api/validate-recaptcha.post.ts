export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.token) {
    return sendError(event, createError({ statusCode: 400, message: 'Token ausente' }))
  }

  return { success: true }
})
