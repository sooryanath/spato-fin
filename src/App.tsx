
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { TokenProvider } from "@/contexts/TokenContext";
import { Web3Provider } from "@/contexts/Web3Context";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import BankDashboard from "./pages/BankDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import CompanyWallet from "./pages/CompanyWallet";
import VendorWallet from "./pages/VendorWallet";
import CompanyVendors from "./pages/CompanyVendors";
import CompanyInvoices from "./pages/CompanyInvoices";
import VendorLoans from "./pages/VendorLoans";
import VendorSubVendors from "./pages/VendorSubVendors";
import ActiveCompanies from "./pages/ActiveCompanies";
import ActiveVendors from "./pages/ActiveVendors";
import ActiveLoans from "./pages/ActiveLoans";
import DisputedLoans from "./pages/DisputedLoans";
import CATRequests from "./pages/CATRequests";
import TokensRedeemed from "./pages/TokensRedeemed";
import TokenExplorer from "./pages/TokenExplorer";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <TokenProvider>
            <Web3Provider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                {/* Bank routes */}
                <Route path="/bank" element={
                  <ProtectedRoute requiredRole="bank">
                    <BankDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/bank-dashboard" element={
                  <ProtectedRoute requiredRole="bank">
                    <BankDashboard />
                  </ProtectedRoute>
                } />
                {/* Company routes */}
                <Route path="/company" element={
                  <ProtectedRoute requiredRole="company">
                    <CompanyDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/company-dashboard" element={
                  <ProtectedRoute requiredRole="company">
                    <CompanyDashboard />
                  </ProtectedRoute>
                } />
                {/* Vendor routes */}
                <Route path="/vendor" element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/vendor-dashboard" element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/company-wallet" element={
                  <ProtectedRoute requiredRole="company">
                    <CompanyWallet />
                  </ProtectedRoute>
                } />
                <Route path="/vendor-wallet" element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorWallet />
                  </ProtectedRoute>
                } />
                <Route path="/company-vendors" element={
                  <ProtectedRoute requiredRole="company">
                    <CompanyVendors />
                  </ProtectedRoute>
                } />
                <Route path="/company-invoices" element={
                  <ProtectedRoute requiredRole="company">
                    <CompanyInvoices />
                  </ProtectedRoute>
                } />
                <Route path="/vendor-loans" element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorLoans />
                  </ProtectedRoute>
                } />
                <Route path="/vendor-sub-vendors" element={
                  <ProtectedRoute requiredRole="vendor">
                    <VendorSubVendors />
                  </ProtectedRoute>
                } />
                <Route path="/active-companies" element={
                  <ProtectedRoute requiredRole="bank">
                    <ActiveCompanies />
                  </ProtectedRoute>
                } />
                <Route path="/active-vendors" element={
                  <ProtectedRoute requiredRole="bank">
                    <ActiveVendors />
                  </ProtectedRoute>
                } />
                <Route path="/active-loans" element={
                  <ProtectedRoute requiredRole="bank">
                    <ActiveLoans />
                  </ProtectedRoute>
                } />
                <Route path="/disputed-loans" element={
                  <ProtectedRoute requiredRole="bank">
                    <DisputedLoans />
                  </ProtectedRoute>
                } />
                <Route path="/cat-requests" element={
                  <ProtectedRoute requiredRole="bank">
                    <CATRequests />
                  </ProtectedRoute>
                } />
                <Route path="/tokens-redeemed" element={
                  <ProtectedRoute requiredRole="bank">
                    <TokensRedeemed />
                  </ProtectedRoute>
                } />
                <Route path="/token-explorer" element={
                  <ProtectedRoute>
                    <TokenExplorer />
                  </ProtectedRoute>
                } />
                <Route path="/docs" element={<Docs />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Web3Provider>
          </TokenProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
