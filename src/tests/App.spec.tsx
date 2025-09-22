import '@testing-library/jest-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from '../components/App';

test('Renders the main page', () => {
  render(<App />);
  expect(true).toBeTruthy();
});

test('renders the App component', () => {
  const { getByText, getByLabelText, getByTitle } = render(<App />);

  // Vérifiez que le formulaire de commande est rendu
  expect(getByLabelText(/Nom/i)).toBeInTheDocument();
  expect(getByTitle(/Ajouter un demi poulet/i)).toBeInTheDocument();
  expect(getByTitle(/Ajouter un godet de pommes de terre/i)).toBeInTheDocument();

  // Vérifiez que la ligne de statut est rendue
  expect(getByText(/att./i)).toBeInTheDocument();
});

test('handles new order', async () => {
  const { getByLabelText, getByText, getByTitle, getAllByText } = render(<App />);

  // Remplissez le formulaire de commande
  fireEvent.change(getByLabelText(/Nom/i), { target: { value: 'John Doe' } });
  fireEvent.mouseDown(getByTitle(/Ajouter un demi poulet/i), { target: { value: '2' } });
  fireEvent.mouseDown(getByTitle(/Ajouter un godet de pommes de terre/i), { target: { value: '2' } });

  // Soumettez le formulaire de commande
  fireEvent.click(getByText(/Command/i));

  // Vérifiez que la nouvelle commande est ajoutée à la liste des commandes
  await waitFor(() => expect(getAllByText(/John Doe/i)).toHaveLength(2)); // Notification + Order
});

// Note: Test pour les notifications de suppression nécessite une configuration plus complexe
// Il sera implémenté dans une future itération
