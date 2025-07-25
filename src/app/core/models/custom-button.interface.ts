export interface CustomButtonInterface {
  type?: 'button' | 'submit' | 'reset';
  style?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'lg' | '';
  block?: boolean;
  icon?: string;
  label: string;
  ariaLabel?: string;
  class?: string;
  disabled?: boolean;
  loading?: boolean;
}
