import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IBank } from "@seng12112-new/my-lib";


@Schema()
export class Bank implements IBank {
    @Prop({type: String}) name: string;
    @Prop({type: String}) branchCode: string;
    @Prop({type: String}) branch: string;
    @Prop({type: String}) branchAddress: string;
    @Prop({type: String}) contactNumber: string;
}

export type BankDocument = HydratedDocument<IBank>;
export const BankSchema = SchemaFactory.createForClass(Bank);