/**
 * Uma classe genérica para gerenciar dados no LocalStorage como um banco de dados simples.
 *
 * @template T O tipo de dado a ser armazenado.
 */
export class LocalStorageDB<T> {
  private key: string;
  private id: number;

  /**
   * Cria uma instância do LocalStorageDB.
   *
   * @param {string} key - A chave usada para armazenar os dados no LocalStorage.
   */

  constructor(key: string) {
    this.key = key;
    this.id = Number.parseInt(
      localStorage.getItem(`${this.key}--count`) || "0",
      10
    );
  }

  /**
   * Obtém todos os itens armazenados.
   *
   * @returns {Array<T & { id: number }>} Um array contendo todos os itens armazenados.
   */
  getAll(): (T & { id: number })[] {
    return JSON.parse(localStorage.getItem(this.key) || "[]");
  }

  /**
   * Obtém um item pelo ID.
   *
   * @param {number} id - O ID do item a ser buscado.
   * @returns {(T & { id: number }) | undefined} O item encontrado ou `undefined` se não existir.
   */

  getById(id: number) {
    const data = this.getAll();
    const index = data.findIndex((item) => item.id === id);
    return data[index];
  }

  /**
   * Cria um novo item e o armazena no LocalStorage.
   *
   * @param {T} data - O objeto a ser armazenado.
   * @throws {Error} Lança um erro se o formato dos dados for inválido.
   */

  create(data: T) {
    if (!data) {
      throw new Error("O formato de dado enviado é incompatível");
    }

    if (typeof data === "object" && !Array.isArray(data)) {
      const newItem = { ...data, id: this.generateId() };
      const items = this.getAll();
      items.push(newItem);
      localStorage.setItem(this.key, JSON.stringify(items));
    }
  }

  /**
   * Atualiza um item pelo ID.
   *
   * @param {number} id - O ID do item a ser atualizado.
   * @param {Partial<T>} data - Os dados parciais a serem atualizados.
   * @returns {string | void} Retorna uma mensagem de erro se o item não for encontrado.
   */

  update(id: number, data: Partial<T>) {
    const items = this.getAll();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return "Deu Erro papai";
    }

    items[index] = { ...items[index], ...data };

    localStorage.setItem(this.key, JSON.stringify(items));
  }

  /**
   * Remove um item pelo ID.
   *
   * @param {number} id - O ID do item a ser removido.
   */
  remove(id: number) {
    const items = this.getAll();
    const removedItemIndex = items.findIndex((item) => item.id === id);

    items.splice(removedItemIndex, 1);

    localStorage.setItem(this.key, JSON.stringify(items));
  }

  /**
   * Gera um novo ID incremental e o armazena no LocalStorage.
   *
   * @returns {number} O novo ID gerado.
   * @private
   */
  private generateId(): number {
    localStorage.setItem(`${this.key}--count`, JSON.stringify(++this.id));
    return this.id;
  }
}
