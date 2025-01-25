import { useState, useMemo } from 'react';

export function usePaymentFilter(properties) {
  // Extract unique payment options from properties
  const paymentOptions = useMemo(() => {
    const allPaymentOptions = properties.flatMap(
      (property) => property.payment || []
    );

    return Array.from(new Set(allPaymentOptions)); // Remove duplicates
  }, [properties]);

  const [selectedPaymentOptions, setSelectedPaymentOptions] = useState([]);
  const [localSelectedPaymentValues, setLocalSelectedPaymentValues] = useState(
    []
  );

  const togglePaymentSelection = (option) => {
    if (localSelectedPaymentValues.includes(option)) {
      // Remove option if already selected
      setLocalSelectedPaymentValues(
        localSelectedPaymentValues.filter((item) => item !== option)
      );
    } else {
      // Add option if not already selected
      setLocalSelectedPaymentValues([...localSelectedPaymentValues, option]);
    }
  };

  return {
    paymentOptions,
    selectedPaymentOptions,
    setSelectedPaymentOptions,
    togglePaymentSelection,
    localSelectedPaymentValues,
    setLocalSelectedPaymentValues,
  };
}
