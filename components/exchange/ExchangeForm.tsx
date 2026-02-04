'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowDownUp, ChevronDown, AlertCircle, CheckCircle, Loader2, Search, X, Zap, Shield, Clock, Wallet, Mail, Info } from 'lucide-react';
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
  variant?: 'send' | 'receive';
  minAmount?: number;
  maxAmount?: number;
  showMinWarning?: boolean;
}

function CurrencySelector({
  label,
  selected,
  currencies,
  onSelect,
  amount,
  onAmountChange,
  readOnly = false,
  variant = 'send',
  minAmount,
  maxAmount,
  showMinWarning = false,
}: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCurrencies = useMemo(() => {
    if (!search) return currencies;
    const query = search.toLowerCase();
    return currencies.filter(
      (c) =>
        c.code.toLowerCase().includes(query) ||
        c.name.toLowerCase().includes(query) ||
        c.network?.toLowerCase().includes(query)
    );
  }, [currencies, search]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) setSearch('');
  }, [open]);

  const accentColor = variant === 'send' ? '#f0b90b' : '#0ecb81';

  return (
    <div className={cn(
      'relative rounded-xl p-3 transition-all duration-300',
      'bg-gradient-to-br from-[#1e2329] to-[#181c21]',
      'border border-[#2b3139] hover:border-[#3a4149]',
      open && 'ring-2 ring-[#f0b90b]/30 border-[#f0b90b]/50'
    )}>
      {/* Label with limits */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-xs font-medium text-[#848e9c]">{label}</span>
        </div>
        {minAmount !== undefined && maxAmount !== undefined && (
          <span className="text-[10px] text-[#848e9c]">
            Min: {minAmount} — Max: {maxAmount}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        {/* Currency Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={cn(
              'group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 min-w-[130px]',
              'bg-[#2b3139] hover:bg-[#363d47]',
              'border border-transparent hover:border-[#f0b90b]/30',
              open && 'bg-[#363d47] border-[#f0b90b]/50'
            )}
          >
            {selected ? (
              <>
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-transform duration-200 group-hover:scale-110',
                  'bg-gradient-to-br shadow-lg',
                  variant === 'send'
                    ? 'from-[#f0b90b] to-[#d9a60a] text-black shadow-[#f0b90b]/20'
                    : 'from-[#0ecb81] to-[#0ba36a] text-white shadow-[#0ecb81]/20'
                )}>
                  {selected.code.slice(0, 2)}
                </div>
                <div className="text-left">
                  <span className="text-white font-medium text-sm block">{selected.code}</span>
                  {selected.network && (
                    <span className="text-[10px] text-[#848e9c]">{selected.network}</span>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="w-6 h-6 rounded-full bg-[#3a4149] flex items-center justify-center">
                  <span className="text-[#848e9c] text-xs">?</span>
                </div>
                <span className="text-[#848e9c] text-sm">Select</span>
              </>
            )}
            <ChevronDown
              size={14}
              className={cn(
                'text-[#848e9c] ml-auto transition-transform duration-200',
                open && 'rotate-180 text-[#f0b90b]'
              )}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute top-full left-0 mt-2 w-72 bg-[#1e2329] border border-[#2b3139] rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Search */}
                <div className="p-2 border-b border-[#2b3139]">
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#848e9c]" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search..."
                      className="w-full bg-[#2b3139] rounded-lg pl-9 pr-8 py-2 text-white text-sm placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/50"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#848e9c] hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Currency List */}
                <div className="max-h-56 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2b3139] scrollbar-track-transparent">
                  {filteredCurrencies.length === 0 ? (
                    <div className="p-3 text-center text-[#848e9c] text-sm">
                      No currencies found
                    </div>
                  ) : (
                    filteredCurrencies.map((currency) => (
                      <button
                        key={currency.id}
                        type="button"
                        onClick={() => {
                          onSelect(currency);
                          setOpen(false);
                        }}
                        className={cn(
                          'w-full flex items-center gap-2 px-3 py-2 transition-all duration-150',
                          'hover:bg-[#2b3139]',
                          selected?.id === currency.id && 'bg-[#2b3139] border-l-2 border-[#f0b90b]'
                        )}
                      >
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold',
                          'bg-gradient-to-br from-[#f0b90b]/20 to-[#f0b90b]/10 text-[#f0b90b]'
                        )}>
                          {currency.code.slice(0, 2)}
                        </div>
                        <div className="text-left flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-white font-medium text-sm">{currency.code}</span>
                            {currency.network && (
                              <span className="text-[10px] px-1 py-0.5 bg-[#3a4149] rounded text-[#848e9c]">
                                {currency.network}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-[#848e9c]">{currency.name}</div>
                        </div>
                        {selected?.id === currency.id && (
                          <CheckCircle size={14} className="text-[#f0b90b]" />
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Amount Input */}
        <div className="flex-1 text-right">
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange?.(e.target.value)}
            readOnly={readOnly}
            placeholder="0.00"
            className={cn(
              'w-full bg-transparent text-right text-2xl font-bold text-white placeholder-[#3a4149] focus:outline-none transition-colors',
              readOnly && 'cursor-default text-[#848e9c]',
              !readOnly && 'hover:text-[#f0b90b] focus:text-[#f0b90b]'
            )}
          />
        </div>
      </div>

      {/* Min amount info - yellow style */}
      {showMinWarning && minAmount && selected && (
        <div className="flex items-center gap-1.5 mt-2 text-[#f0b90b]">
          <Info size={12} />
          <span className="text-xs">Enter at least {minAmount} {selected.code}</span>
        </div>
      )}
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
          const apiRoutes = response.data as unknown as ApiRoute[];
          const transformedRoutes = transformRoutes(apiRoutes);
          setRoutes(transformedRoutes);

          const currencyMap = new Map<string, Currency>();
          transformedRoutes.forEach((route: ExchangeRoute) => {
            currencyMap.set(route.fromCurrency.id, route.fromCurrency);
            currencyMap.set(route.toCurrency.id, route.toCurrency);
          });
          const uniqueCurrencies = Array.from(currencyMap.values());
          setCurrencies(uniqueCurrencies);

          if (transformedRoutes.length > 0) {
            setFromCurrency(transformedRoutes[0].fromCurrency);
            setToCurrency(transformedRoutes[0].toCurrency);
          }
        }
      } catch (err) {
        console.error('Failed to fetch routes:', err);
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

  // Get available "to" currencies
  const availableToCurrencies = useMemo(() => {
    if (!fromCurrency) return currencies;
    const routesFromCurrency = routes.filter((r) => r.fromCurrency.id === fromCurrency.id);
    return routesFromCurrency.map((r) => r.toCurrency);
  }, [fromCurrency, routes, currencies]);

  // Validation
  const validation = useMemo(() => {
    if (!currentRoute) return { valid: false, message: 'This exchange pair is not available', isBelowMin: false };
    if (!fromAmount || parseFloat(fromAmount) <= 0) return { valid: false, message: 'Enter an amount', isBelowMin: false };
    if (parseFloat(fromAmount) < currentRoute.minAmount) {
      return { valid: false, message: `Minimum amount is ${currentRoute.minAmount} ${fromCurrency?.code}`, isBelowMin: true };
    }
    if (parseFloat(fromAmount) > currentRoute.maxAmount) {
      return { valid: false, message: `Maximum amount is ${currentRoute.maxAmount} ${fromCurrency?.code}`, isBelowMin: false };
    }
    if (!toAddress.trim()) return { valid: false, message: 'Enter recipient address', isBelowMin: false };
    return { valid: true, message: '', isBelowMin: false };
  }, [currentRoute, fromAmount, fromCurrency, toAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validation.valid || !currentRoute) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await exchangerApi.createOrder({
        routeId: currentRoute.id,
        amount: parseFloat(fromAmount),
        toValues: [
          { key: 'address', value: toAddress },
          ...(email ? [{ key: 'email', value: email }] : []),
        ],
        agreement: true,
        disableEmailNotify: !email,
      });

      if (response.success && response.data) {
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
      <div className="bg-gradient-to-br from-[#1e2329] to-[#181c21] rounded-xl p-8 flex flex-col items-center justify-center border border-[#2b3139]">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-[#2b3139] border-t-[#f0b90b] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap size={18} className="text-[#f0b90b]" />
          </div>
        </div>
        <p className="mt-3 text-[#848e9c] text-sm">Loading rates...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-gradient-to-r from-[#f6465d]/20 to-[#f6465d]/5 border border-[#f6465d]/30 rounded-xl text-[#f6465d] text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={16} />
          <span>{error}</span>
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
        variant="send"
        minAmount={currentRoute?.minAmount}
        maxAmount={currentRoute?.maxAmount}
        showMinWarning={validation.isBelowMin}
      />

      {/* Swap Button */}
      <div className="flex justify-center -my-0.5 relative z-10">
        <button
          type="button"
          onClick={handleSwap}
          className="group p-2 bg-gradient-to-br from-[#2b3139] to-[#1e2329] rounded-xl hover:from-[#3a4149] hover:to-[#2b3139] transition-all duration-300 border-4 border-[#0b0e11] shadow-lg shadow-black/30 hover:shadow-[#f0b90b]/10 hover:scale-105 active:scale-95"
        >
          <ArrowDownUp
            size={14}
            className="text-[#f0b90b] transition-transform duration-300 group-hover:rotate-180"
          />
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
        variant="receive"
      />

      {/* Exchange Rate - Compact */}
      {currentRoute && (
        <div className="flex items-center justify-center gap-2 py-2 text-xs text-[#848e9c]">
          <Zap size={10} className="text-[#f0b90b]" />
          <span>1 {fromCurrency?.code} = <span className="text-white font-medium">{currentRoute.rate.toFixed(currentRoute.rate >= 1 ? 2 : 8)}</span> {toCurrency?.code}</span>
        </div>
      )}

      {/* Recipient Address */}
      <div className="bg-gradient-to-br from-[#1e2329] to-[#181c21] rounded-xl p-3 border border-[#2b3139]">
        <label className="flex items-center gap-1.5 text-xs font-medium text-[#848e9c] mb-2">
          <Wallet size={12} className="text-[#0ecb81]" />
          {toCurrency?.code} Address
        </label>
        <input
          type="text"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder={`Enter ${toCurrency?.code || 'crypto'} wallet`}
          className="w-full bg-[#2b3139] rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#3a4149] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/50 border border-transparent focus:border-[#f0b90b]/30 transition-all"
        />
      </div>

      {/* Email (optional) */}
      <div className="bg-gradient-to-br from-[#1e2329] to-[#181c21] rounded-xl p-3 border border-[#2b3139]">
        <label className="flex items-center gap-1.5 text-xs font-medium text-[#848e9c] mb-2">
          <Mail size={12} className="text-[#f0b90b]" />
          Email <span className="text-[#3a4149]">(optional)</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-[#2b3139] rounded-lg px-3 py-2.5 text-white text-sm placeholder-[#3a4149] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/50 border border-transparent focus:border-[#f0b90b]/30 transition-all"
        />
      </div>

      {/* Validation Message - only for non-min errors */}
      {!validation.valid && !validation.isBelowMin && fromAmount && toAddress && (
        <div className="flex items-center gap-2 p-3 bg-[#f6465d]/10 rounded-lg border border-[#f6465d]/20 text-[#f6465d] text-xs animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={14} />
          <span>{validation.message}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!validation.valid || isSubmitting}
        className={cn(
          'group relative w-full py-3 rounded-xl font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden mt-3',
          validation.valid && !isSubmitting
            ? 'bg-gradient-to-r from-[#f0b90b] to-[#d9a60a] text-black shadow-lg shadow-[#f0b90b]/25 hover:shadow-xl hover:shadow-[#f0b90b]/30 hover:scale-[1.02] active:scale-[0.98]'
            : 'bg-[#2b3139] text-[#848e9c] cursor-not-allowed'
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            <span>Creating...</span>
          </>
        ) : (
          <>
            <Zap size={18} />
            <span>Exchange Now</span>
          </>
        )}
        {validation.valid && !isSubmitting && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
      </button>

      {/* Trust Indicators - Compact */}
      <div className="flex items-center justify-center gap-4 text-[10px] text-[#848e9c] pt-2">
        <div className="flex items-center gap-1">
          <Zap size={10} className="text-[#0ecb81]" />
          <span>No Registration</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={10} className="text-[#0ecb81]" />
          <span>Fast</span>
        </div>
        <div className="flex items-center gap-1">
          <Shield size={10} className="text-[#0ecb81]" />
          <span>Secure</span>
        </div>
      </div>
    </form>
  );
}
