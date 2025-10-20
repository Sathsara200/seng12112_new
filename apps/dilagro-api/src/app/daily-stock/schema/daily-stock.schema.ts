import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IDailyStock } from "@seng12112-new/my-lib";


@Schema()
export class DailyStock implements IDailyStock {
    @Prop() date: Date;
    @Prop() amount: number;
}

export type CatDocument = HydratedDocument<DailyStock>;
export const DailyStockSchema = SchemaFactory.createForClass(DailyStock);