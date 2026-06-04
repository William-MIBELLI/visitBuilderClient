
export interface TAPIResonseData<T> {
  status: "success" | "error";
  data: T;
  errors: string;
}