
import React, { useState } from 'react';
import { Check, ChevronsUpDown, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface Company {
  id: string;
  name: string;
  logo?: string;
}

interface CompanySelectDropdownProps {
  onSelect: (companyId: string, companyName: string) => void;
  placeholder?: string;
}

const CompanySelectDropdown: React.FC<CompanySelectDropdownProps> = ({
  onSelect,
  placeholder = "Select syndicate company"
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  // Mock data for companies with logos
  const companies: Company[] = [
    { id: 'TECH001', name: 'TechCorp Industries', logo: '/lovable-uploads/3403073a-51d7-4790-8a98-97dd7f906b44.png' },
    { id: 'GLOB002', name: 'Global Manufacturing', logo: '/placeholder.svg' },
    { id: 'SUPP003', name: 'Supply Chain Ltd', logo: '/placeholder.svg' },
    { id: 'DIGI004', name: 'Digital Solutions Inc', logo: '/placeholder.svg' },
  ];

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setOpen(false);
    onSelect(company.id, company.name);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-left font-normal"
        >
          {selectedCompany ? selectedCompany.name : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder="Search company..." />
          <CommandEmpty>No company found.</CommandEmpty>
          <CommandGroup>
            {Array.isArray(companies) && companies.length > 0 ? (
              companies.map(company => (
                <CommandItem
                  key={company.id}
                  value={company.name}
                  onSelect={() => handleSelectCompany(company)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={`${company.name} logo`} 
                        className="h-6 w-6 rounded-full object-contain"
                      />
                    ) : (
                      <Building className="h-6 w-6" />
                    )}
                    <span>{company.name}</span>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCompany?.id === company.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))
            ) : (
              <div className="py-6 text-center text-sm">No companies available</div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CompanySelectDropdown;
