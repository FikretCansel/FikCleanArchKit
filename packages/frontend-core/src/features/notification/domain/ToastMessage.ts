export type ToastMessage = {
  readonly id: string;
  readonly message: string;
  readonly tone: "success" | "error" | "info";
};
