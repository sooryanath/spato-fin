
import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';

export interface Company {
  id: string;
  name: string;
  logo: string;
}

interface CompanySelectDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  companies: Company[];
  placeholder?: string;
}

export const CompanySelectDropdown = ({
  value,
  onValueChange,
  companies = [],
  placeholder = "Select company",
}: CompanySelectDropdownProps) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? companies.find((company) => company.id === value)?.name || placeholder
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search company..." />
          <CommandEmpty>No company found.</CommandEmpty>
          <CommandGroup>
            {companies && companies.length > 0 ? companies.map((company) => (
              <CommandItem
                key={company.id}
                value={company.id}
                onSelect={() => {
                  onValueChange(company.id);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback for broken images
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/24";
                      }}
                    />
                  </div>
                  <span>{company.name}</span>
                </div>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === company.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            )) : (
              <div className="p-2 text-sm text-center text-gray-500">No companies available</div>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CompanySelectDropdown;
