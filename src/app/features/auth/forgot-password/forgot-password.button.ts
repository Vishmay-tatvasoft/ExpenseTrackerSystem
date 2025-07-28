import { CustomButtonInterface } from "../../../core/models/custom-button.interface";

export const forgotPasswordButtonConfig:CustomButtonInterface = {
  size:'lg',
  label:'submit',
  ariaLabel:'Submit',
  block:true,
  class:'btn btn-success',
  icon:'send',
  type:'submit',
  loading:false,
  disabled:true
};