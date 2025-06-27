export interface Device {
  id: string;
  name: string;
  description?: string;  // необязательное свойство
  type?: string;        // необязательное свойство
  // добавьте другие свойства, которые есть у ваших устройств
}
