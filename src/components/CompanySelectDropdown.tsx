
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

export interface CompanyOption {
  id: string;
  name: string;
  logo?: string;
  address?: string;
}

interface CompanySelectDropdownProps {
  options: CompanyOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  showAddress?: boolean;
  className?: string;
}

const CompanySelectDropdown = ({
  options,
  value,
  onValueChange,
  placeholder,
  showAddress = false,
  className,
}: CompanySelectDropdownProps) => {
  const [open, setOpen] = useState(false);

  const selectedCompany = options.find((company) => company.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn("flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer", className)}>
          {selectedCompany ? (
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {selectedCompany.logo ? (
                  <img 
                    src={selectedCompany.logo} 
                    alt={selectedCompany.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-medium">{selectedCompany.name.charAt(0)}</span>
                )}
              </div>
              <span>{selectedCompany.name}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 opacity-50"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search company..." className="h-9" />
          <CommandEmpty>No company found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {options && options.map((company) => (
              <CommandItem
                key={company.id}
                value={company.id}
                onSelect={() => {
                  onValueChange(company.id);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {company.logo ? (
                      <img 
                        src={company.logo} 
                        alt={company.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-medium">{company.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span>{company.name}</span>
                    {showAddress && company.address && (
                      <span className="text-xs text-muted-foreground truncate max-w-[220px]">{company.address}</span>
                    )}
                  </div>
                </div>
                {value === company.id && <Check className="h-4 w-4 ml-auto" />}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CompanySelectDropdown;
