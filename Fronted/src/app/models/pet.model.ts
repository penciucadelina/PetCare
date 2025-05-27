export interface PetDTO {
  name: string;
  type: string;
  breed: string;
  age: number;
}

export interface Pet extends PetDTO {
  id: number;
}
