import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ICity, ICustomer } from "@seng12112-new/my-lib";


@Schema()
export class Customer implements ICustomer {
    @Prop({type: String, required: true}) firstName: string;
    @Prop({type: String, required: true}) lastName: string;
    @Prop({type: String, required: true, unique: true}) email: string;
    @Prop({type: String}) phoneNumber?: string;
}

export type CustomerDocument = HydratedDocument<ICustomer>;
export const CustomerSchema = SchemaFactory.createForClass(Customer);