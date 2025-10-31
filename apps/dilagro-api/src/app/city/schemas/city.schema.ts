import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ICity } from "@seng12112-new/my-lib";


@Schema()
export class City implements ICity {
    @Prop({type: String}) name: string;
}

export type CityDocument = HydratedDocument<ICity>;
export const CitySchema = SchemaFactory.createForClass(City);