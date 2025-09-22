import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderForm from '../components/OrderForm';
import { ConfigType, OrderType } from '../types';

const mockConfig: ConfigType = {
  chickenQuantity: 10,
  chickenPrice: 18,
  halfChickenPrice: 9,
  potatoBucketPrice: 5,
  confirmDelete: true,
};

const mockOrders: OrderType[] = [{ id: 1, name: 'Test User', chickens: 2, potatoBuckets: 1, delivered: false }];

const mockProps = {
  onNewOrder: jest.fn(),
  onDirectDelivery: jest.fn(),
  config: mockConfig,
  orders: mockOrders,
};

describe('OrderForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calculates remaining chickens correctly', () => {
    render(<OrderForm {...mockProps} />);

    // Total chickens: 10, used: 2, remaining: 8
    const addButton = screen.getByTitle(/Ajouter un demi poulet \(8 restants\)/);
    expect(addButton).toBeInTheDocument();
  });

  test('disables chicken buttons when stock is insufficient', () => {
    const fullStockOrders: OrderType[] = [{ id: 1, name: 'Test', chickens: 10, potatoBuckets: 0, delivered: false }];

    render(<OrderForm {...mockProps} orders={fullStockOrders} />);

    const halfChickenButton = screen.getByTitle(/Ajouter un demi poulet \(0 restants\)/);
    const fullChickenButton = screen.getByTitle(/Ajouter un poulet entier \(0 restants\)/);

    expect(halfChickenButton).toBeDisabled();
    expect(fullChickenButton).toBeDisabled();
  });

  test('calculates price correctly', () => {
    render(<OrderForm {...mockProps} />);

    const nameInput = screen.getByLabelText(/Nom/);
    fireEvent.change(nameInput, { target: { value: 'Test User' } });

    // Add 1 full chicken + 0.5 chicken + 2 potato buckets
    const halfChickenButton = screen.getByTitle(/Ajouter un demi poulet/);
    const fullChickenButton = screen.getByTitle(/Ajouter un poulet entier/);
    const potatoButton = screen.getByTitle(/Ajouter un godet de pommes de terre/);

    fireEvent.mouseDown(fullChickenButton);
    fireEvent.mouseDown(halfChickenButton);
    fireEvent.mouseDown(potatoButton);
    fireEvent.mouseDown(potatoButton);

    // Expected: 1 * 18 + 0.5 * 2 * 9 + 2 * 5 = 18 + 9 + 10 = 37€
    expect(screen.getByText('37€')).toBeInTheDocument();
  });

  test('shows notification on form validation error', () => {
    render(<OrderForm {...mockProps} />);

    const submitButton = screen.getByText('Command');
    fireEvent.click(submitButton);

    // Should show notification for missing name and items
    expect(screen.getByText(/Veuillez entrer un nom et au moins un poulet/)).toBeInTheDocument();
  });

  test('shows success notification on successful order', () => {
    render(<OrderForm {...mockProps} />);

    const nameInput = screen.getByLabelText(/Nom/);
    const halfChickenButton = screen.getByTitle(/Ajouter un demi poulet/);
    const submitButton = screen.getByText('Command');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.mouseDown(halfChickenButton);
    fireEvent.click(submitButton);

    expect(mockProps.onNewOrder).toHaveBeenCalledWith({
      name: 'John Doe',
      chickens: 0.5,
      potatoBuckets: 0,
    });

    expect(screen.getByText('Commande ajoutée pour John Doe')).toBeInTheDocument();
  });

  test('handles direct delivery correctly', () => {
    render(<OrderForm {...mockProps} />);

    const halfChickenButton = screen.getByTitle(/Ajouter un demi poulet/);
    const directButton = screen.getByText('Direct');

    fireEvent.mouseDown(halfChickenButton);
    fireEvent.click(directButton);

    expect(mockProps.onDirectDelivery).toHaveBeenCalledWith({
      name: 'En direct',
      chickens: 0.5,
      potatoBuckets: 0,
    });
  });
});
