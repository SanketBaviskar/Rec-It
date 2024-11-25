import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

// Uncomment this for future use when the UserData type is defined
// import { UserData } from "@/Interface/memberData";

export default function MemberDetails({ userDetails }: any) {
  // console.log("User Details from MemberDetails component:", userDetails);

  // Move equipment list outside the component to prevent re-creation on every render
  const equipmentList = [
    {
      id: "EQ789",
      name: "Camera Kit",
      photoUrl: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "EQ790",
      name: "Tripod",
      photoUrl: "/placeholder.svg?height=80&width=80",
    },
  ];

  // Render when no user is selected
  if (!userDetails) {
    return (
      <div className="w-full max-w-md py-4 pr-4 flex flex-col h-full">
        <h2 className="text-2xl font-semibold mb-4">Member Details</h2>
        <p className="text-center text-muted-foreground">No user selected</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md py-4 pr-4 flex flex-col h-full">
      {/* Member Details Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Member Details</h2>
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={userDetails.avatarUrl || "https://via.placeholder.com/250"} // Fallback image
              alt={`${userDetails.firstName} ${userDetails.lastName}`}
            />
            <AvatarFallback>
              {userDetails.firstName?.charAt(0)}
              {userDetails.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">
              {userDetails.firstName} {userDetails.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">
              Student ID: {userDetails.studentId || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Equipment Checkout Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Equipment Checkout</h2>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {equipmentList.map((equipment) => (
            <div
              key={equipment.id}
              className="flex items-center space-x-4 border-b pb-4"
            >
              {/* Equipment Image */}
              <div className="relative h-20 w-20 rounded-md overflow-hidden bg-muted">
                <img
                  src={equipment.photoUrl}
                  alt={equipment.name}
                  className="object-cover h-full w-full"
                />
                <div className="absolute bottom-0 right-0 bg-background p-1 rounded-tl-md">
                  <Camera className="h-4 w-4" />
                </div>
              </div>
              {/* Equipment Details */}
              <div className="flex-grow">
                <h3 className="font-medium">{equipment.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Equipment ID: {equipment.id}
                </p>
              </div>
              {/* Check-in Button */}
              <Button variant="outline" size="sm" className="shrink-0">
                Check In
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
