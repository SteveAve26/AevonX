'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowDownUp, ChevronDown, AlertCircle, CheckCircle, Loader2, Search, X, Zap, Shield, Clock, Wallet, Mail } from 'lucide-react';
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

  // Get color scheme based on variant
  const accentColor = variant === 'send' ? '#f0b90b' : '#0ecb81';

  return (
    <div className={cn(
      'relative rounded-2xl p-5 transition-all duration-300',
      'bg-gradient-to-br from-[#1e2329] to-[#181c21]',
      'border border-[#2b3139] hover:border-[#3a4149]',
      open && 'ring-2 ring-[#f0b90b]/30 border-[#f0b90b]/50'
    )}>
      {/* Label with indicator */}
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <span className="text-sm font-medium text-[#848e9c]">{label}</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Currency Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={cn(
              'group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 min-w-[160px]',
              'bg-[#2b3139] hover:bg-[#363d47]',
              'border border-transparent hover:border-[#f0b90b]/30',
              open && 'bg-[#363d47] border-[#f0b90b]/50'
            )}
          >
            {selected ? (
              <>
                {/* Currency Icon */}
                <div className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-transform duration-200 group-hover:scale-110',
                  'bg-gradient-to-br shadow-lg',
                  variant === 'send'
                    ? 'from-[#f0b90b] to-[#d9a60a] text-black shadow-[#f0b90b]/20'
                    : 'from-[#0ecb81] to-[#0ba36a] text-white shadow-[#0ecb81]/20'
                )}>
                  {selected.code.slice(0, 2)}
                </div>
                <div className="text-left">
                  <span className="text-white font-semibold block">{selected.code}</span>
                  {selected.network && (
                    <span className="text-xs text-[#848e9c]">{selected.network}</span>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="w-9 h-9 rounded-full bg-[#3a4149] flex items-center justify-center">
                  <span className="text-[#848e9c]">?</span>
                </div>
                <span className="text-[#848e9c]">Select coin</span>
              </>
            )}
            <ChevronDown
              size={18}
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
              <div className="absolute top-full left-0 mt-2 w-80 bg-[#1e2329] border border-[#2b3139] rounded-2xl shadow-2xl shadow-black/50 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Search */}
                <div className="p-3 border-b border-[#2b3139]">
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#848e9c]" />
                    <input
                      ref={inputRef}
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search currency..."
                      className="w-full bg-[#2b3139] rounded-xl pl-10 pr-10 py-3 text-white text-sm placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/50"
                    />
                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#848e9c] hover:text-white"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Currency List */}
                <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-[#2b3139] scrollbar-track-transparent">
                  {filteredCurrencies.length === 0 ? (
                    <div className="p-4 text-center text-[#848e9c] text-sm">
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
                          'w-full flex items-center gap-3 px-4 py-3 transition-all duration-150',
                          'hover:bg-[#2b3139]',
                          selected?.id === currency.id && 'bg-[#2b3139] border-l-2 border-[#f0b90b]'
                        )}
                      >
                        <div className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold',
                          'bg-gradient-to-br from-[#f0b90b]/20 to-[#f0b90b]/10 text-[#f0b90b]'
                        )}>
                          {currency.code.slice(0, 2)}
                        </div>
                        <div className="text-left flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{currency.code}</span>
                            {currency.network && (
                              <span className="text-xs px-1.5 py-0.5 bg-[#3a4149] rounded text-[#848e9c]">
                                {currency.network}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-[#848e9c]">{currency.name}</div>
                        </div>
                        {selected?.id === currency.id && (
                          <CheckCircle size={18} className="text-[#f0b90b]" />
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
              'w-full bg-transparent text-right text-3xl font-bold text-white placeholder-[#3a4149] focus:outline-none transition-colors',
              readOnly && 'cursor-default text-[#848e9c]',
              !readOnly && 'hover:text-[#f0b90b] focus:text-[#f0b90b]'
            )}
          />
          {selected && amount && parseFloat(amount) > 0 && (
            <div className="text-sm text-[#848e9c] mt-1">
              {selected.name}
            </div>
          )}
        </div>
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
      <div className="bg-gradient-to-br from-[#1e2329] to-[#181c21] rounded-2xl p-12 flex flex-col items-center justify-center border border-[#2b3139]">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-[#2b3139] border-t-[#f0b90b] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap size={24} className="text-[#f0b90b]" />
          </div>
        </div>
        <p className="mt-4 text-[#848e9c]">Loading exchange rates...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-gradient-to-r from-[#f6465d]/20 to-[#f6465d]/5 border border-[#f6465d]/30 rounded-2xl text-[#f6465d] text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="w-10 h-10 rounded-full bg-[#f6465d]/20 flex items-center justify-center flex-shrink-0">
            <AlertCircle size={20} />
          </div>
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
      />

      {/* Swap Button */}
      <div className="flex justify-center -my-1 relative z-10">
        <button
          type="button"
          onClick={handleSwap}
          className="group p-4 bg-gradient-to-br from-[#2b3139] to-[#1e2329] rounded-2xl hover:from-[#3a4149] hover:to-[#2b3139] transition-all duration-300 border-4 border-[#0b0e11] shadow-lg shadow-black/30 hover:shadow-[#f0b90b]/10 hover:scale-105 active:scale-95"
        >
          <ArrowDownUp
            size={22}
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

      {/* Exchange Rate Info */}
      {currentRoute && (
        <div className="bg-gradient-to-br from-[#1e2329] to-[#181c21] rounded-2xl p-5 border border-[#2b3139] space-y-3 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-[#f0b90b]" />
            <span className="text-sm font-medium text-white">Exchange Details</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-[#2b3139]/50">
            <span className="text-[#848e9c] text-sm">Exchange Rate</span>
            <span className="text-white font-medium">
              1 {fromCurrency?.code} = <span className="text-[#f0b90b]">{currentRoute.rate.toFixed(currentRoute.rate >= 1 ? 2 : 8)}</span> {toCurrency?.code}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-[#2b3139]/50">
            <span className="text-[#848e9c] text-sm">Available Reserve</span>
            <span className="text-[#0ecb81] font-medium">
              {currentRoute.reserve.toLocaleString()} {toCurrency?.code}
            </span>
          </div>

          <div className="flex justify-between items-center py-2">
            <span className="text-[#848e9c] text-sm">Limits</span>
            <span className="text-white text-sm">
              <span className="text-[#848e9c]">Min</span> {currentRoute.minAmount} — <span className="text-[#848e9c]">Max</span> {currentRoute.maxAmount} {fromCurrency?.code}
            </span>
          </div>
        </div>
      )}

      {/* Recipient Address */}
      <div className="bg-gradient-to-br from-[#1e2329] to-[#181c21] rounded-2xl p-5 border border-[#2b3139] mt-4">
        <label className="flex items-center gap-2 text-sm font-medium text-[#848e9c] mb-3">
          <Wallet size={16} className="text-[#0ecb81]" />
          Recipient {toCurrency?.code} Address
        </label>
        <input
          type="text"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder={`Enter your ${toCurrency?.code || 'crypto'} wallet address`}
          className="w-full bg-[#2b3139] rounded-xl px-4 py-4 text-white placeholder-[#3a4149] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/50 border border-transparent focus:border-[#f0b90b]/30 transition-all"
        />
      </div>

      {/* Email (optional) */}
      <div className="bg-gradient-to-br from-[#1e2329] to-[#181c21] rounded-2xl p-5 border border-[#2b3139]">
        <label className="flex items-center gap-2 text-sm font-medium text-[#848e9c] mb-3">
          <Mail size={16} className="text-[#f0b90b]" />
          Email <span className="text-[#3a4149]">(optional)</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full bg-[#2b3139] rounded-xl px-4 py-4 text-white placeholder-[#3a4149] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/50 border border-transparent focus:border-[#f0b90b]/30 transition-all"
        />
        <p className="text-xs text-[#3a4149] mt-2">Get notified about your exchange status</p>
      </div>

      {/* Validation Message */}
      {!validation.valid && fromAmount && (
        <div className="flex items-center gap-3 p-4 bg-[#f6465d]/10 rounded-xl border border-[#f6465d]/20 text-[#f6465d] text-sm animate-in fade-in slide-in-from-top-2">
          <AlertCircle size={18} />
          <span>{validation.message}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!validation.valid || isSubmitting}
        className={cn(
          'group relative w-full py-5 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden mt-6',
          validation.valid && !isSubmitting
            ? 'bg-gradient-to-r from-[#f0b90b] to-[#d9a60a] text-black shadow-lg shadow-[#f0b90b]/25 hover:shadow-xl hover:shadow-[#f0b90b]/30 hover:scale-[1.02] active:scale-[0.98]'
            : 'bg-[#2b3139] text-[#848e9c] cursor-not-allowed'
        )}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={22} />
            <span>Creating Order...</span>
          </>
        ) : (
          <>
            <Zap size={22} />
            <span>Exchange Now</span>
          </>
        )}
        {/* Shine effect */}
        {validation.valid && !isSubmitting && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        )}
      </button>

      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#848e9c] pt-4">
        <div className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-full bg-[#0ecb81]/10 flex items-center justify-center group-hover:bg-[#0ecb81]/20 transition-colors">
            <Zap size={12} className="text-[#0ecb81]" />
          </div>
          <span>No Registration</span>
        </div>
        <div className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-full bg-[#0ecb81]/10 flex items-center justify-center group-hover:bg-[#0ecb81]/20 transition-colors">
            <Clock size={12} className="text-[#0ecb81]" />
          </div>
          <span>Fast Exchange</span>
        </div>
        <div className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-full bg-[#0ecb81]/10 flex items-center justify-center group-hover:bg-[#0ecb81]/20 transition-colors">
            <Shield size={12} className="text-[#0ecb81]" />
          </div>
          <span>100% Secure</span>
        </div>
      </div>
    </form>
  );
}
