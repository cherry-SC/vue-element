export type AlertType = "primary" | "success" | "warning" | "info" | "danger"
export type AlertEffect = "light" | "dark"

export interface AlertProps {
  title: string;
  type?: AlertType;
  effect?: AlertEffect;
  closable?: boolean;
  closeText?: string;
  showIcon?: boolean;
  description?: string;
}
