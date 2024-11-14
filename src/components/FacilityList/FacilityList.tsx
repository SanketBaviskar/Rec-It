import React from 'react';
import { Search, Filter } from 'lucide-react';
import type { Facility } from '../../types/Calendar';

interface FacilityListProps {
  facilities: Facility[];
  onSelect: (facilityId: string) => void;
  selectedFacility?: string;
}

export const FacilityList: React.FC<FacilityListProps> = ({
  facilities,
  onSelect,
  selectedFacility,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterType, setFilterType] = React.useState<string>('all');

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch = facility.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || facility.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="w-64 bg-gray-50 p-4 border-r overflow-y-auto">
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search facilities..."
            className="w-full pl-9 pr-3 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            className="flex-1 border rounded-md py-1 px-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="room">Rooms</option>
            <option value="court">Courts</option>
            <option value="pool">Pools</option>
            <option value="gym">Gyms</option>
            <option value="studio">Studios</option>
            <option value="outdoor">Outdoor</option>
          </select>
        </div>

        <div className="space-y-2">
          {filteredFacilities.map((facility) => (
            <button
              key={facility.id}
              onClick={() => onSelect(facility.id)}
              className={`w-full text-left px-4 py-2 rounded-lg ${
                selectedFacility === facility.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="font-medium">{facility.name}</div>
              <div className="text-sm text-gray-500">
                {facility.type.charAt(0).toUpperCase() + facility.type.slice(1)} •{' '}
                {facility.capacity} capacity
              </div>
              <div className="text-sm text-gray-500">{facility.location}</div>
              <div
                className={`text-sm ${
                  facility.available ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {facility.available ? 'Available' : 'In Use'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};