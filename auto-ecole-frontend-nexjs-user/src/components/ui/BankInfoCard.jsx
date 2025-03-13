const BankInfoCard = ({ bankName, accountNumber, amount, referenceFormat }) => {
    return (
      <div className="p-6 bg-background-200 dark:bg-foreground-200 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4">Informations Bancaires</h3>
        <dl className="space-y-3">
          <div>
            <dt className="text-sm font-medium">Banque</dt>
            <dd className="font-mono">{bankName}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium">Numéro de Compte</dt>
            <dd className="font-mono">{accountNumber}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium">Montant à Payer</dt>
            <dd className="text-lg font-bold text-primary-500">{amount}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium">Format de Référence</dt>
            <dd className="font-mono text-sm">{referenceFormat}</dd>
          </div>
        </dl>
      </div>
    );
  };
  
  export default BankInfoCard;