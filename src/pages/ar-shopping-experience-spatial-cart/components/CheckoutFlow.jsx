import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const CheckoutFlow = ({ cartItems, deliveryInfo, onCompleteOrder }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToAR, setAgreedToAR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    { id: 1, name: 'Billing', icon: 'User' },
    { id: 2, name: 'Payment', icon: 'CreditCard' },
    { id: 3, name: 'Review', icon: 'Eye' },
    { id: 4, name: 'Confirmation', icon: 'CheckCircle' }
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
    { id: 'financing', name: 'AR Financing', icon: 'Calculator' },
    { id: 'apple', name: 'Apple Pay', icon: 'Smartphone' }
  ];

  const getSubtotal = () => {
    return cartItems?.reduce((total, item) => total + (item?.price * item?.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + (deliveryInfo?.price || 299);
  };

  const handleInputChange = (section, field, value) => {
    if (section === 'billing') {
      setBillingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'card') {
      setCardInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCompleteOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        items: cartItems,
        billing: billingInfo,
        payment: { method: paymentMethod, ...cardInfo },
        delivery: deliveryInfo,
        total: getTotal(),
        orderNumber: `AR${Date.now()}`,
        timestamp: new Date()?.toISOString()
      };
      
      onCompleteOrder(orderData);
      setCurrentStep(4);
      setIsProcessing(false);
    }, 3000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                value={billingInfo?.firstName}
                onChange={(e) => handleInputChange('billing', 'firstName', e?.target?.value)}
                required
              />
              <Input
                label="Last Name"
                type="text"
                value={billingInfo?.lastName}
                onChange={(e) => handleInputChange('billing', 'lastName', e?.target?.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                type="email"
                value={billingInfo?.email}
                onChange={(e) => handleInputChange('billing', 'email', e?.target?.value)}
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                value={billingInfo?.phone}
                onChange={(e) => handleInputChange('billing', 'phone', e?.target?.value)}
                required
              />
            </div>
            <Input
              label="Address"
              type="text"
              value={billingInfo?.address}
              onChange={(e) => handleInputChange('billing', 'address', e?.target?.value)}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                type="text"
                value={billingInfo?.city}
                onChange={(e) => handleInputChange('billing', 'city', e?.target?.value)}
                required
              />
              <Input
                label="State"
                type="text"
                value={billingInfo?.state}
                onChange={(e) => handleInputChange('billing', 'state', e?.target?.value)}
                required
              />
              <Input
                label="ZIP Code"
                type="text"
                value={billingInfo?.zipCode}
                onChange={(e) => handleInputChange('billing', 'zipCode', e?.target?.value)}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <h4 className="font-semibold mb-4">Payment Method</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {paymentMethods?.map((method) => (
                  <button
                    key={method?.id}
                    onClick={() => setPaymentMethod(method?.id)}
                    className={`p-4 rounded-lg border-2 text-left spatial-transition ${
                      paymentMethod === method?.id
                        ? 'border-accent bg-accent/5' :'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name={method?.icon} size={20} color="currentColor" />
                      <span className="font-medium">{method?.name}</span>
                      {paymentMethod === method?.id && (
                        <Icon name="Check" size={16} color="var(--color-accent)" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* Card Details */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardInfo?.number}
                  onChange={(e) => handleInputChange('card', 'number', e?.target?.value)}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    type="text"
                    placeholder="MM/YY"
                    value={cardInfo?.expiry}
                    onChange={(e) => handleInputChange('card', 'expiry', e?.target?.value)}
                    required
                  />
                  <Input
                    label="CVV"
                    type="text"
                    placeholder="123"
                    value={cardInfo?.cvv}
                    onChange={(e) => handleInputChange('card', 'cvv', e?.target?.value)}
                    required
                  />
                </div>

                <Input
                  label="Cardholder Name"
                  type="text"
                  value={cardInfo?.name}
                  onChange={(e) => handleInputChange('card', 'name', e?.target?.value)}
                  required
                />
              </div>
            )}
            {/* Financing Option */}
            {paymentMethod === 'financing' && (
              <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Calculator" size={20} color="var(--color-accent)" />
                  <h5 className="font-semibold">AR Financing Available</h5>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>12 months at 0% APR</span>
                    <span className="font-semibold">${(getTotal() / 12)?.toFixed(2)}/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>24 months at 2.9% APR</span>
                    <span className="font-semibold">${(getTotal() / 24 * 1.029)?.toFixed(2)}/month</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-surface rounded-lg p-4">
              <h4 className="font-semibold mb-4">Order Summary</h4>
              <div className="space-y-3">
                {cartItems?.map((item) => (
                  <div key={item?.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                        <img src={item?.image} alt={item?.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{item?.name}</div>
                        <div className="text-xs text-muted-foreground">Qty: {item?.quantity}</div>
                      </div>
                    </div>
                    <div className="font-semibold">${(item?.price * item?.quantity)?.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Price Breakdown */}
            <div className="bg-surface rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${getSubtotal()?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${getTax()?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>${deliveryInfo?.price || 299}</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getTotal()?.toLocaleString()}</span>
                </div>
              </div>
            </div>
            {/* Terms and Conditions */}
            <div className="space-y-3">
              <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e?.target?.checked)}
                required
              />
              <Checkbox
                label="I understand the 30-day AR Confidence Guarantee"
                description="Free returns if AR placement doesn't match expectations"
                checked={agreedToAR}
                onChange={(e) => setAgreedToAR(e?.target?.checked)}
                required
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckCircle" size={32} color="var(--color-success)" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
              <p className="text-muted-foreground mb-4">
                Your AR-guided furniture delivery has been scheduled
              </p>
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                <div className="font-semibold text-accent">Order #AR{Date.now()}</div>
                <div className="text-sm text-muted-foreground">
                  Delivery scheduled for {deliveryInfo?.date} at {deliveryInfo?.time}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-spatial-sm">
      {/* Progress Steps */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex items-center">
              <div className={`flex items-center space-x-2 ${
                currentStep >= step?.id ? 'text-accent' : 'text-muted-foreground'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step?.id
                    ? 'border-accent bg-accent text-accent-foreground'
                    : 'border-border'
                }`}>
                  {currentStep > step?.id ? (
                    <Icon name="Check" size={16} color="currentColor" />
                  ) : (
                    <Icon name={step?.icon} size={16} color="currentColor" />
                  )}
                </div>
                <span className="font-medium text-sm">{step?.name}</span>
              </div>
              
              {index < steps?.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${
                  currentStep > step?.id ? 'bg-accent' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Step Content */}
      <div className="p-6">
        {renderStepContent()}
      </div>
      {/* Navigation */}
      {currentStep < 4 && (
        <div className="p-6 border-t border-border">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Back
            </Button>

            {currentStep === 3 ? (
              <Button
                variant="default"
                onClick={handleCompleteOrder}
                disabled={!agreedToTerms || !agreedToAR || isProcessing}
                loading={isProcessing}
                iconName="CreditCard"
                iconPosition="left"
                className="bg-success hover:bg-success/90 text-success-foreground"
              >
                {isProcessing ? 'Processing...' : 'Complete Order'}
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => setCurrentStep(currentStep + 1)}
                iconName="ChevronRight"
                iconPosition="right"
                className="bg-accent hover:bg-accent/90"
              >
                Continue
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutFlow;