export interface CustomButtonInterface {
  type?: 'button' | 'submit' | 'reset';
  style?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'lg' | ''; // bootstrap size
  block?: boolean;
  icon?: string;
  label: string;
  disabled?: boolean;
  ariaLabel?: string;
  class?: string; // optional custom class
}
