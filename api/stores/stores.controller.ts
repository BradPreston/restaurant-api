import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Store = {
  owner: string,
  store_name: string,
  address: string
}

export async function createStore({ owner, store_name, address }: Store) {
  try {
    const newStore = await prisma.stores.create({
      data: {
        owner,
        store_name,
        address
      }
    });
    return newStore;
  } catch (err) {
    throw new Error(err);
  }
}

export async function getAllStores() {
  try {
    const stores = await prisma.stores.findMany();
    return stores
  } catch (err) {
    throw new Error(err);
  }
}

export async function getOneStore(id: string) {
  try {
    const store = await prisma.stores.findUnique({
      where: { id: Number(id) }
    });
    return store;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateStore({ owner, store_name, address }: Store, id: string) {
  try {
    const store = await prisma.stores.update({
      where: { id: Number(id) },
      data: { owner, store_name, address }
    })
    return store;
  } catch (err) {
    throw new Error(err)
  }
}

export async function deleteStore(id: string) {
  try {
    await prisma.stores.delete({
      where: { id: Number(id) }
    });
  } catch (err) {
    throw new Error(err);
  }
}