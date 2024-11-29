import React from 'react';
import { AccessTabs } from '../../Pages/Admin/Access/AccessTabs';

interface RenderWindowProps {
  selectedItem: string;
}

const RenderWindow: React.FC<RenderWindowProps> = ({ selectedItem }) => {
  return (
    <div className="bg-gray-50 p-4 overflow-auto h-[calc(100vh-4rem)]">
      {selectedItem === "Access" ? (
        <AccessTabs />
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">{selectedItem}</h2>
          <p>Content for {selectedItem} goes here.</p>
        </div>
      )}
    </div>
  );
};

export default RenderWindow;
