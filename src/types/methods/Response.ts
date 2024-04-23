export default interface Response {
  status: "success" | "error";
  message: string;
  data: any;
}