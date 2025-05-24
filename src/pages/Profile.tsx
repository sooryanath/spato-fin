
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/DashboardLayout';
import BankProfile from '@/components/profiles/BankProfile';
import CompanyProfile from '@/components/profiles/CompanyProfile';
import VendorProfile from '@/components/profiles/VendorProfile';

const Profile = () => {
  const { user } = useAuth();

  // Render different profile views based on user role
  const renderProfileByRole = () => {
    switch (user?.role) {
      case 'bank':
        return <BankProfile />;
      case 'company':
        return <CompanyProfile />;
      case 'vendor':
        return <VendorProfile />;
      default:
        return <div>Please login to view profile</div>;
    }
  };

  return (
    <DashboardLayout>
      {renderProfileByRole()}
    </DashboardLayout>
  );
};

export default Profile;
