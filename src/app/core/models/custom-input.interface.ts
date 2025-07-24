export interface CustomInputInterface {
  accept?: any;
  appearance?: 'outline' | 'fill';
  type: string;
  placeholder: string;
  value?: any;
  id: string;
  name: string;
  icon?: string | null;
  label: string;
  hint?: string | null;
  disabled: boolean | false | null;
  options?: { value: string; label: string }[];
  class?: string;
  rows?: number;
  toggleIcon?: boolean;
  toggleTypes?: string[];
  toggleIcons?: string[];
}
