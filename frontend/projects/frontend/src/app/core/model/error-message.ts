export interface ErrorMessage {
  title: string;
  description: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  button: {
    label: string;
    action: () => void;
  };
}
