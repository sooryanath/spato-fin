import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Calendar, Hash } from 'lucide-react';

interface GSTNInfo {
  gstin: string;
  legalName: string;
  tradeName: string;
  registrationDate: string;
  address: string;
  state: string;
  status: 'active' | 'inactive' | 'cancelled';
  businessType: string;
}

interface GSTNStatusDisplayProps {
  gstinData: {
    gstin: string;
    legal_name?: string;
    trade_name?: string;
    registration_date?: string;
    address?: string;
    state?: string;
    status?: string;
    business_type?: string;
    api_response?: any;
  };
}

const GSTNStatusDisplay = ({ gstinData }: GSTNStatusDisplayProps) => {
  const gstnInfo: GSTNInfo = {
    gstin: gstinData.gstin,
    legalName: gstinData.legal_name || 'N/A',
    tradeName: gstinData.trade_name || '',
    registrationDate: gstinData.registration_date || '',
    address: gstinData.address || 'N/A',
    state: gstinData.state || 'N/A',
    status: gstinData.status as 'active' | 'inactive' | 'cancelled' || 'active',
    businessType: gstinData.business_type || 'N/A'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-700';
      case 'inactive': return 'bg-yellow-500/10 text-yellow-700';
      case 'cancelled': return 'bg-red-500/10 text-red-700';
      default: return 'bg-gray-500/10 text-gray-700';
    }
  };

  return (
    <Card className="bg-muted/30">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-sm font-medium">{gstnInfo.gstin}</span>
          </div>
          <Badge className={getStatusColor(gstnInfo.status)}>
            {gstnInfo.status.toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <div>
              <span className="font-medium">{gstnInfo.legalName}</span>
              {gstnInfo.tradeName && (
                <span className="text-muted-foreground ml-1">({gstnInfo.tradeName})</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{gstnInfo.address}, {gstnInfo.state}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Registered: {new Date(gstnInfo.registrationDate).toLocaleDateString()}</span>
          </div>

          <div className="text-xs text-muted-foreground mt-2">
            Business Type: {gstnInfo.businessType}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GSTNStatusDisplay;