import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balacence  = this.transactions.reduce((previous,current) => {
      if(current.type === 'income') {
        previous.income += current.value
      } else if(current.type === 'outcome') {
        previous.outcome += current.value
      }
      previous.total = previous.income - previous.outcome
      return previous
    },{ income: 0, outcome: 0, total:0 })
    return balacence
  }

  public create({ title, value, type } :Omit<Transaction,'id'>): Transaction {
    const transaction = new Transaction({ title, value, type })
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
