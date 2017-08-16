import { Color } from './color';

export interface Light {
  type: string;
  power: number;
  color: Color;
  label: string;
  
}
