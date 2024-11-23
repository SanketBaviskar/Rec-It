import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addMember } from "@/Services/Api/addNewMember"; // Adjust the path as needed
import { MemberData } from "@/Interface/memberData";


interface NewMemberFormProps {
  isOpen: boolean;
  onClose: () => void;
}



const MEMBERSHIP_TYPES = [{1:"Standard", 2:"Premium", 3:"Student", 4:"Senior", 5:"Family"}];

export default function NewMemberForm({ isOpen, onClose }: NewMemberFormProps) {
  const [formData, setFormData] = useState<MemberData>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    accessId: "",
    //membershipId: "Standard",
    gender: "",
    dateOfBirth: "",
  });

  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const handleCancel = () => {
    setShowCancelConfirm(true); // Show confirmation dialog
  };

  const confirmCancel = () => {
    setShowCancelConfirm(false); // Hide confirmation dialog
    onClose(); // Close the form
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //setIsSubmitting(true);
    try {
      // Call the API to add a member
      const response = await addMember(formData);
      console.log("Member added successfully:", response);
      setSubmitMessage("Member added successfully!"); // Show success message
      //setIsSubmitting(false);
      onClose(); // Close the form
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitMessage("Failed to add member. Please try again."); // Show error message
      //setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //camer states
  const [showUpload, setShowUpload] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Handle photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedPhoto(reader.result as string); // Display photo as a preview
      };
      reader.readAsDataURL(file);
    }
  };

  // Start camera for live feed
  const startCamera = async () => {
    setShowCamera(true);
    setCapturedPhoto(null); // Reset captured photo

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setShowCamera(false);
    }
  };

  // Capture photo from live feed
  const capturePhoto = () => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext("2d")?.drawImage(videoElement, 0, 0);

      // Convert the canvas image to a data URL and display as preview
      setCapturedPhoto(canvas.toDataURL("image/png"));

      // Stop the camera feed
      const stream = videoElement.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      setShowCamera(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleCancel(); // Trigger cancel confirmation on close attempt
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name *
              </label>
              <Input
                required
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Middle Name
              </label>
              <Input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name *
              </label>
              <Input
                required
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Email and phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address *
              </label>
              <Input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number *
              </label>
              <Input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth *
              </label>
              <Input
                required
                type="date"
                name="dateOfBirth"
                onChange={handleChange}
                value={formData.dateOfBirth}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
            <label className="block text-sm font-medium mb-1">
                Gender *
              </label>
              <Input
                required
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address *</label>
            <Input
              required
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Photo */}
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-1">Photo</label>
            {/* Buttons for selecting photo option */}
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowUpload(true)}>
                Upload Photo
              </Button>
              <Button variant="outline" onClick={startCamera}>
                Take Photo
              </Button>
            </div>

            {/* Show upload input if "Upload Photo" is clicked */}
            {showUpload && (
              <div className="mt-4">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Show live camera feed if "Take Photo" is clicked */}
            {showCamera && (
              <div className="mt-4 space-y-2">
                <video
                  ref={videoRef}
                  className="w-full max-w-sm rounded-lg border border-gray-300"
                />
                <Button onClick={capturePhoto}>Click Picture</Button>
              </div>
            )}

            {/* Display captured or uploaded photo preview */}
            {capturedPhoto && (
              <div className="mt-4">
                <img
                  src={capturedPhoto}
                  alt="Captured"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Access Id and Membership Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Access ID *
              </label>
              <Input
                required
                type="text"
                name="accessId"
                value={formData.accessId}
                onChange={handleChange}
              />
            </div>
            {/* <div>
              <label className="block text-sm font-medium mb-1">
                Membership Type *
              </label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, membershipType: value }))
                }
                defaultValue={formData.membershipId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  {MEMBERSHIP_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Add Member
            </Button>
          </div>
        </form>

        {/* Confirmation dialog for cancel action */}
        {showCancelConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Cancel Form?</h3>
              <p className="mb-6 text-gray-600">
                Are you sure you want to cancel? All changes will be lost.
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelConfirm(false)}
                >
                  Continue Editing
                </Button>
                <Button variant="destructive" onClick={confirmCancel}>
                  Yes, Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
        {submitMessage && (
          <p
            className={`text-center text-sm ${
              submitMessage.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {submitMessage}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
