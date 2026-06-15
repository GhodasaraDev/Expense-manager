import { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext({
  currency: "USD",
  setCurrency: () => {},
  theme: "light",
  setTheme: () => {},
  getCurrencySymbol: () => "$",
  companyName: "My Company",
  setCompanyName: () => {},
});

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem("currency") || "USD";
  });
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [companyName, setCompanyName] = useState(() => {
    return localStorage.getItem("companyName") || "My Company";
  });

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem("companyName", companyName);
  }, [companyName]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    // Apply theme to body/html if implementing dark mode later
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const getCurrencySymbol = () => {
    switch (currency) {
      case "USD": return "$";
      case "EUR": return "€";
      case "GBP": return "£";
      case "INR": return "₹";
      default: return "$";
    }
  };

  return (
    <SettingsContext.Provider value={{ currency, setCurrency, theme, setTheme, getCurrencySymbol, companyName, setCompanyName }}>
      {children}
    </SettingsContext.Provider>
  );
};
