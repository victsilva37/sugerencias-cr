export interface ControlProps {
  seleccionados: string[];
  setSeleccionados: (val: string[]) => void;
  cantidad: string;
  setCantidad: (val: string) => void;
}