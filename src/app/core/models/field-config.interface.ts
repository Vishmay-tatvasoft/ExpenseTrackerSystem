import { CustomInputInterface } from "./custom-input.interface";

export interface FieldConfigInterface {
  inputfield:CustomInputInterface;
  validators?:string[];
  matchesWith?: string;
}
