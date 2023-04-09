import dotenv from "dotenv";
dotenv.config();

export default async function verifyKey(ctx, next) {
  let api_key = ctx.get("x-api-key");
  if (api_key === process.env.API_KEY) {
    ctx.status = 200;
    await next();
  } else {
    ctx.status = 401;
    ctx.body = {
      message: "you aren't authorized to view this endpoint"
    }
  }
}