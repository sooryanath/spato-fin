
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { TokenProvider } from "./contexts/TokenContext";
import Index from "./pages/Index";
import Docs from "./pages/Docs";
import Login from "./pages/Login";
import BankDashboard from "./pages/BankDashboard";
import CompanyDashboard from "./pages/CompanyDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import Profile from "./pages/Profile";
import TokenExplorer from "./pages/TokenExplorer";
import ActiveCompanies from "./pages/ActiveCompanies";
import TokensRedeemed from "./pages/TokensRedeemed";
import ActiveVendors from "./pages/ActiveVendors";
import ActiveLoans from "./pages/ActiveLoans";
import DisputedLoans from "./pages/DisputedLoans";
import CATRequests from "./pages/CATRequests";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TokenProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/vendor-signup" element={<Login />} /> {/* Using Login page temporarily */}
              <Route 
                path="/bank" 
                element={
                  <ProtectedRoute allowedRoles={['bank']}>
                    <BankDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/company" 
                element={
                  <ProtectedRoute allowedRoles={['company']}>
                    <CompanyDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/vendor" 
                element={
                  <ProtectedRoute allowedRoles={['vendor']}>
                    <VendorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute allowedRoles={['bank', 'company', 'vendor']}>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/token-explorer" 
                element={
                  <ProtectedRoute allowedRoles={['bank', 'company', 'vendor']}>
                    <TokenExplorer />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/active-companies" 
                element={
                  <ProtectedRoute allowedRoles={['bank']}>
                    <ActiveCompanies />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/tokens-redeemed" 
                element={
                  <ProtectedRoute allowedRoles={['bank']}>
                    <TokensRedeemed />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/active-vendors" 
                element={
                  <ProtectedRoute allowedRoles={['bank']}>
                    <ActiveVendors />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/active-loans" 
                element={
                  <ProtectedRoute allowedRoles={['bank']}>
                    <ActiveLoans />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/disputed-loans" 
                element={
                  <ProtectedRoute allowedRoles={['bank']}>
                    <DisputedLoans />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cat-requests" 
                element={
                  <ProtectedRoute allowedRoles={['bank']}>
                    <CATRequests />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TokenProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
