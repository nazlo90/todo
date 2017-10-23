interface RegisterItem {
  firstname: String;
  email: String;
  password: String;
  description?: String;
}

interface AdvancedRegisterItem extends RegisterItem {
  planned?: Date;
}

export class Register implements AdvancedRegisterItem {
  id: Number = Date.now();
  firstname: String = '';
  email: String = '';
  password: String = '';
  description: String = '';

  constructor(values?: RegisterItem) {
    Object.assign(this, values);
  }
}
