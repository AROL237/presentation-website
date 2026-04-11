import { ProductEntity, User } from "@/store/AppStore"

export type Filter={
      page: number,
      limit: number,
      orderBy?: ProductEntity
    };
    