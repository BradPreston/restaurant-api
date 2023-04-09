import Router from "@koa/router";
const router = new Router();
import { createStore, deleteStore, getAllStores, getOneStore, updateStore } from "./stores.controller.ts";
import { koaBody } from "koa-body";
router.use(koaBody())

type Store = {
  owner: string,
  store_name: string,
  address: string
}

router
  .get("/stores", async (ctx, next) => {
    try {
      const stores = await getAllStores();
      stores.sort((a, b) => a.id - b.id)
      ctx.body = {
        stores: stores
      }
      ctx.status = 200;
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        message: err.message  
      }
    }
  })
  .get("/stores/:id", async (ctx, next) => {
    try {
      const store = await getOneStore(ctx.params.id);
      ctx.status = 200;
      ctx.body = {
        info: store
      }
    } catch(err) {
      ctx.status = 400;
      ctx.body = {
        message: err.message
      }
    }
  })
  .post('/stores', async (ctx, next) => {
    const info: Store = ctx.request.body;
    try {
      const store = await createStore(info);
      ctx.status = 201;
      ctx.body = {
        message: "Successfully created store",
        info: store
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        message: err.message
      }
    }
  })
  .put('/stores/:id', async(ctx, next) => {
    const info: Store = ctx.request.body;
    const id: string = ctx.params.id;
    try {
      const store = await updateStore(info, id);
      ctx.status = 200;
      ctx.body = {
        message: 'Successfully updated store',
        info: store
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        message: err.message
      }
    }
  })
  .delete('/stores/:id', async (ctx, next) => {
    try {
      await deleteStore(ctx.params.id);
      ctx.status = 200;
      ctx.body = {
        message: 'Successfully deleted store'
      }
    } catch (err) {
      ctx.status = 400;
      ctx.body = {
        message: err.message
      }
    }
  })
export default router;