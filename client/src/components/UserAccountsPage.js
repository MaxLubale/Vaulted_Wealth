import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TransactionForm from './TransactionForm';
import EditAccountNameForm from './EditAccountNameForm';
import DeleteAccount from './DeleteAccount'; 
// import './UserAccountsPage.css';

const UserAccountsPage = ({ userId }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        setLoading(true);

        // Fetch user accounts data from the backend
        const response = await fetch(`/user/${userId}/accounts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const accountsData = await response.json();
          console.log('User accounts data:', accountsData);

          // Update the accounts state
          setAccounts(accountsData.accounts);
        } else {
          console.error('Error fetching user accounts. Status:', response.status);
          const errorMessage = await response.text();
          console.error('Error message:', errorMessage);
          setError(`Error fetching user accounts: ${errorMessage}`);
        }
      } catch (error) {
        console.error('Error fetching user accounts:', error);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAccounts();
  }, [userId]);

  // Function to handle the edit of an account name
  const handleEditAccountName = (accountId, newAccountName) => {
    // Update the accounts state with the new account name
    setAccounts((prevAccounts) =>
      prevAccounts.map((account) =>
        account.id === accountId ? { ...account, account_name: newAccountName } : account
      )
    );

    // Set success message
    setSuccessMessage(`Account name updated successfully for account ${accountId}`);

    // Clear success message after a few seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  // Function to handle the deletion of an account
  const handleDeleteAccount = (deletedAccountId) => {
    // Remove the deleted account from the state
    setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== deletedAccountId));

    // Set success message
    setSuccessMessage(`Account with ID ${deletedAccountId} deleted successfully`);

    // Clear success message after a few seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  return (
    <div>
      <h1>User Accounts</h1>
      <Link to={`/user/${userId}/create-account`}>
        <button>Create a New Account</button>
      </Link>
      {loading && <p>Loading user accounts...</p>}
      {error && <p>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {accounts.length > 0 && (
        <div>
          <h2>Accounts List</h2>
          {accounts.map((account) => (
            <div key={account.id}>
              <h3>Account Name: {account.name}</h3>
              <p>Balance:$ {account.balance}</p>
              <p>Created Date: {account.created_date}</p>
              <EditAccountNameForm
                user_id={userId}
                account_id={account.id}
                currentName={account.account_name}
                onEdit={handleEditAccountName}
              />
              <DeleteAccount
                userId={userId}
                accountId={account.id}
                onDeleteSuccess={handleDeleteAccount}
              />
              <TransactionForm
                userId={userId}
                accountId={account.id}
                onTransactionAdded={() => {
                  setSuccessMessage(`Transaction added successfully for account ${account.id}`);
                  setTimeout(() => {
                    setSuccessMessage(null);
                  }, 3000);
                }}
              />
              
              {account.transactions && account.transactions.length > 0 && (
                <div>
                  <h3>Transactions List</h3>
                  {account.transactions.map((transaction) => (
                    <div key={transaction.id}>
                      <p>Amount: {transaction.amount}</p>
                      <p>Description: {transaction.description}</p>
                      <p>Date: {transaction.transaction_date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserAccountsPage;
