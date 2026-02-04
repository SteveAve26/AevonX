'use client';

import { useState, useEffect, useMemo } from 'react';
import { ArrowDownUp, ChevronDown, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Currency, ExchangeRoute, ApiRoute } from '@/types';
import { exchangerApi } from '@/lib/api/exchanger';
import { transformRoutes } from '@/lib/api/transformers';
import { currencies as fallbackCurrencies, exchangeRoutes as fallbackRoutes } from '@/lib/mock/data';
import { cn } from '@/lib/utils';

interface CurrencySelectorProps {
  label: string;
  selected: Currency | null;
  currencies: Currency[];
  onSelect: (currency: Currency) => void;
  amount: string;
  onAmountChange?: (value: string) => void;
  readOnly?: boolean;
}

function CurrencySelector({
  label,
  selected,
  currencies,
  onSelect,
  amount,
  onAmountChange,
  readOnly = false,
}: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#1e2329] rounded-xl p-4">
      <div className="text-sm text-[#848e9c] mb-2">{label}</div>
      <div className="flex items-center gap-3">
        {/* Currency Selector */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 bg-[#2b3139] rounded-lg hover:bg-[#3a4149] transition-colors min-w-[140px]"
          >
            {selected ? (
              <>
                <div className="w-6 h-6 bg-[#f0b90b]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#f0b90b]">
                  {selected.code.slice(0, 2)}
                </div>
                <span className="text-white font-medium">{selected.code}</span>
                {selected.network && (
                  <span className="text-xs text-[#848e9c]">({selected.network})</span>
                )}
              </>
            ) : (
              <span className="text-[#848e9c]">Select</span>
            )}
            <ChevronDown size={16} className="text-[#848e9c] ml-auto" />
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#1e2329] border border-[#2b3139] rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
                {currencies.map((currency) => (
                  <button
                    key={currency.id}
                    onClick={() => {
                      onSelect(currency);
                      setOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 hover:bg-[#2b3139] transition-colors',
                      selected?.id === currency.id && 'bg-[#2b3139]'
                    )}
                  >
                    <div className="w-8 h-8 bg-[#f0b90b]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#f0b90b]">
                      {currency.code.slice(0, 2)}
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium">{currency.code}</div>
                      <div className="text-xs text-[#848e9c]">
                        {currency.name}
                        {currency.network && ` (${currency.network})`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Amount Input */}
        <input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange?.(e.target.value)}
          readOnly={readOnly}
          placeholder="0.00"
          className={cn(
            'flex-1 bg-transparent text-right text-2xl font-semibold text-white placeholder-[#848e9c] focus:outline-none',
            readOnly && 'cursor-default'
          )}
        />
      </div>
    </div>
  );
}

export default function ExchangeForm() {
  const [currencies, setCurrencies] = useState<Currency[]>(fallbackCurrencies);
  const [routes, setRoutes] = useState<ExchangeRoute[]>(fallbackRoutes);
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [fromAmount, setFromAmount] = useState('1');
  const [toAmount, setToAmount] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch routes from API
  useEffect(() => {
    async function fetchRoutes() {
      setIsLoading(true);
      try {
        const response = await exchangerApi.getRoutes();
        if (response.success && response.data) {
          // Transform API routes to our internal format
          const apiRoutes = response.data as unknown as ApiRoute[];
          const transformedRoutes = transformRoutes(apiRoutes);
          setRoutes(transformedRoutes);

          // Extract unique currencies from routes
          const currencyMap = new Map<string, Currency>();
          transformedRoutes.forEach((route: ExchangeRoute) => {
            currencyMap.set(route.fromCurrency.id, route.fromCurrency);
            currencyMap.set(route.toCurrency.id, route.toCurrency);
          });
          const uniqueCurrencies = Array.from(currencyMap.values());
          setCurrencies(uniqueCurrencies);

          // Set default currencies
          if (transformedRoutes.length > 0) {
            setFromCurrency(transformedRoutes[0].fromCurrency);
            setToCurrency(transformedRoutes[0].toCurrency);
          }
        }
      } catch (err) {
        console.error('Failed to fetch routes:', err);
        // Use fallback data
        setFromCurrency(fallbackCurrencies[0]);
        setToCurrency(fallbackCurrencies[2]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRoutes();
  }, []);

  // Find matching route
  const currentRoute = useMemo(() => {
    if (!fromCurrency || !toCurrency) return null;
    return routes.find(
      (r) => r.fromCurrency.id === fromCurrency.id && r.toCurrency.id === toCurrency.id
    );
  }, [fromCurrency, toCurrency, routes]);

  // Calculate to amount
  useEffect(() => {
    if (currentRoute && fromAmount) {
      const amount = parseFloat(fromAmount) * currentRoute.rate;
      setToAmount(amount.toFixed(currentRoute.toCurrency.type === 'crypto' ? 8 : 2));
    } else {
      setToAmount('');
    }
  }, [fromAmount, currentRoute]);

  // Swap currencies
  const handleSwap = () => {
    const tempCurrency = fromCurrency;
    const tempAmount = fromAmount;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  // Get available "to" currencies based on selected "from" currency
  const availableToCurrencies = useMemo(() => {
    if (!fromCurrency) return currencies;
    const routesFromCurrency = routes.filter((r) => r.fromCurrency.id === fromCurrency.id);
    return routesFromCurrency.map((r) => r.toCurrency);
  }, [fromCurrency, routes, currencies]);

  // Validation
  const validation = useMemo(() => {
    if (!currentRoute) return { valid: false, message: 'This exchange pair is not available' };
    if (!fromAmount || parseFloat(fromAmount) <= 0) return { valid: false, message: 'Enter an amount' };
    if (parseFloat(fromAmount) < currentRoute.minAmount) {
      return { valid: false, message: `Minimum amount is ${currentRoute.minAmount} ${fromCurrency?.code}` };
    }
    if (parseFloat(fromAmount) > currentRoute.maxAmount) {
      return { valid: false, message: `Maximum amount is ${currentRoute.maxAmount} ${fromCurrency?.code}` };
    }
    if (!toAddress.trim()) return { valid: false, message: 'Enter recipient address' };
    return { valid: true, message: '' };
  }, [currentRoute, fromAmount, fromCurrency, toAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.valid || !currentRoute) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await exchangerApi.createOrder({
        routeId: currentRoute.id,
        amount: parseFloat(fromAmount),  // Positive amount = "from" currency amount
        toValues: [
          { key: 'address', value: toAddress },
          ...(email ? [{ key: 'email', value: email }] : []),
        ],
        agreement: true,
        disableEmailNotify: !email,
      });

      if (response.success && response.data) {
        // Redirect to order page with uid and secret
        const order = response.data.order;
        window.location.href = `/order/${order.uid}?secret=${order.rid}`;
      } else {
        setError(response.error || 'Failed to create order');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#1e2329] rounded-xl p-8 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#f0b90b]" size={32} />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-[#f6465d]/10 border border-[#f6465d]/20 rounded-lg text-[#f6465d] text-sm flex items-center gap-2">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      {/* From Currency */}
      <CurrencySelector
        label="You Send"
        selected={fromCurrency}
        currencies={currencies.filter((c) => c.id !== toCurrency?.id)}
        onSelect={setFromCurrency}
        amount={fromAmount}
        onAmountChange={setFromAmount}
      />

      {/* Swap Button */}
      <div className="flex justify-center -my-2 relative z-10">
        <button
          type="button"
          onClick={handleSwap}
          className="p-3 bg-[#2b3139] rounded-full hover:bg-[#3a4149] transition-colors border-4 border-[#0b0e11]"
        >
          <ArrowDownUp size={20} className="text-[#f0b90b]" />
        </button>
      </div>

      {/* To Currency */}
      <CurrencySelector
        label="You Receive"
        selected={toCurrency}
        currencies={availableToCurrencies}
        onSelect={setToCurrency}
        amount={toAmount}
        readOnly
      />

      {/* Exchange Rate Info */}
      {currentRoute && (
        <div className="bg-[#1e2329] rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#848e9c]">Exchange Rate</span>
            <span className="text-white">
              1 {fromCurrency?.code} = {currentRoute.rate.toFixed(currentRoute.rate >= 1 ? 2 : 8)} {toCurrency?.code}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#848e9c]">Reserve</span>
            <span className="text-[#0ecb81]">
              {currentRoute.reserve.toLocaleString()} {toCurrency?.code}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#848e9c]">Min / Max</span>
            <span className="text-white">
              {currentRoute.minAmount} - {currentRoute.maxAmount} {fromCurrency?.code}
            </span>
          </div>
        </div>
      )}

      {/* Recipient Address */}
      <div className="bg-[#1e2329] rounded-xl p-4">
        <label className="text-sm text-[#848e9c] mb-2 block">
          Recipient {toCurrency?.code} Address
        </label>
        <input
          type="text"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder={`Enter your ${toCurrency?.code || ''} wallet address`}
          className="w-full bg-[#2b3139] rounded-lg px-4 py-3 text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]"
        />
      </div>

      {/* Email (optional) */}
      <div className="bg-[#1e2329] rounded-xl p-4">
        <label className="text-sm text-[#848e9c] mb-2 block">
          Email (optional, for notifications)
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-[#2b3139] rounded-lg px-4 py-3 text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]"
        />
      </div>

      {/* Validation Message */}
      {!validation.valid && fromAmount && (
        <div className="flex items-center gap-2 text-[#f6465d] text-sm">
          <AlertCircle size={16} />
          {validation.message}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!validation.valid || isSubmitting}
        className={cn(
          'w-full py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2',
          validation.valid && !isSubmitting
            ? 'bg-[#f0b90b] text-black hover:bg-[#d9a60a]'
            : 'bg-[#2b3139] text-[#848e9c] cursor-not-allowed'
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            Creating Order...
          </>
        ) : (
          'Exchange Now'
        )}
      </button>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-6 text-sm text-[#848e9c]">
        <div className="flex items-center gap-1">
          <CheckCircle size={14} className="text-[#0ecb81]" />
          <span>No Registration</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle size={14} className="text-[#0ecb81]" />
          <span>Fast Exchange</span>
        </div>
        <div className="flex items-center gap-1">
          <CheckCircle size={14} className="text-[#0ecb81]" />
          <span>Secure</span>
        </div>
      </div>
    </form>
  );
}
