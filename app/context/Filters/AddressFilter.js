import { useState, useEffect, useRef } from 'react';

export function useAddressFilter(filteredProperties) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(undefined); // Track the focused property index
  const [selectedProperty, setSelectedProperty] = useState(null); // Store the selected property
  const [localSelectedProperty, setLocalSelectedProperty] = useState(null); // Store the selected property

  useEffect(() => {
    const filtered = filteredProperties.filter((item) =>
      item.extraDetails.info.propertyAddress.toLowerCase()
    );

    setFilteredData(filtered);
  }, [filteredProperties]);

  const popoverRef = useRef(null);
  const listRef = useRef(null); // Ref for the scrollable div

  // Toggle popover visibility
  const togglePopover = () => {
    setIsOpen(true);
    setSearchQuery('');
    setLocalSelectedProperty(null);
  };

  // Handle outside click and Escape key
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  // Handle search functionality
  const handleSearch = (query) => {
    setIsOpen(true);

    setSearchQuery(query);
    setFocusedIndex(-1); // Reset focus index on search
    if (query.trim() === '') {
      setFilteredData([]);
    } else {
      const filtered = filteredProperties.filter((item) =>
        item.extraDetails.info.propertyAddress
          .toLowerCase()
          .includes(query.toLowerCase())
      );

      setFilteredData(filtered);
    }
  };

  // Handle keyboard navigation and selection
  const handleKeyDown = (event) => {
    if (filteredData.length === 0) return;

    if (event.key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => {
        const nextIndex =
          prevIndex < filteredData.length - 1 ? prevIndex + 1 : 0;

        scrollToFocusedItem(nextIndex);

        return nextIndex;
      });
    }
    if (event.key === 'ArrowUp') {
      setFocusedIndex((prevIndex) => {
        const nextIndex =
          prevIndex > 0 ? prevIndex - 1 : filteredData.length - 1;

        scrollToFocusedItem(nextIndex);

        return nextIndex;
      });
    }
    if (event.key === 'Enter' && focusedIndex >= 0) {
      event.preventDefault(); // Prevent default behavior (optional, to stop form submission in case of input fields)

      setLocalSelectedProperty(filteredData[focusedIndex]);
      setSearchQuery(
        filteredData[focusedIndex].extraDetails.info.propertyAddress
      );
    }
  };

  // Scroll to the focused item inside the popover
  const scrollToFocusedItem = (index) => {
    if (listRef.current) {
      const focusedItem = listRef.current.children[index];

      if (focusedItem) {
        focusedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [filteredData]);

  const handleSelectProperty = (item) => {
    setSearchQuery(item.extraDetails.info.propertyAddress);
    setLocalSelectedProperty(item);
    setIsOpen(false);
  };

  const handleClearProperty = () => {
    setSearchQuery('');
    setLocalSelectedProperty(null);
    setIsOpen(false);
  };

  const applyAddress = (properties, selectedProperty) => {
    if (selectedProperty) {
      return properties.sort((a, b) => {
        if (
          a.extraDetails.info.propertyAddress ===
          selectedProperty.extraDetails.info.propertyAddress
        )
          return -1; // Move selectedProperty" to the front
        if (
          b.extraDetails.info.propertyAddress ===
          selectedProperty.extraDetails.info.propertyAddress
        )
          return 1;

        return 0; // Keep other properties as they are
      });
    }

    return properties;
  };

  return {
    togglePopover,
    searchQuery,
    handleSearch,
    handleClearProperty,
    isOpen,
    popoverRef,
    listRef,
    filteredData,
    focusedIndex,
    setFocusedIndex,
    handleSelectProperty,
    selectedProperty,
    setSelectedProperty,
    localSelectedProperty,
    setLocalSelectedProperty,
    applyAddress,
    setFilteredData,
    setSearchQuery,
  };
}
