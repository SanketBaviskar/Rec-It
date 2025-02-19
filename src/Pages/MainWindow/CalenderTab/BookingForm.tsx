import { useState, useEffect } from 'react';
import { format, addDays, addMinutes, parseISO } from 'date-fns';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Facility, Booking } from './types';

interface BookingFormProps {
    selectedDate: Date;
    facilities: Facility[];
    selectedFacility?: string;
    onBook: (booking: Booking) => void;
    onClose: () => void;
    editingBooking: Booking | null;
}

export function BookingForm({ selectedDate, facilities, selectedFacility, onBook, onClose, editingBooking }: BookingFormProps) {
    // ... BookingForm implementation
    const [formData, setFormData] = useState({
        title: "",
        facility: selectedFacility || "",
        startTime: format(selectedDate, "HH:mm"),
        endTime: format(addMinutes(selectedDate, 60), "HH:mm"),
        type: "booking" as Booking["type"],
        status: "pending" as Booking["status"],
        description: "",
        attendees: "",
        instructor: "",
        isRecurring: false,
        recurringFrequency: "weekly" as "daily" | "weekly" | "monthly",
        recurringEndDate: format(addDays(selectedDate, 90), "yyyy-MM-dd"),
    })

    useEffect(() => {
        if (editingBooking) {
            setFormData({
                title: editingBooking.title,
                facility: editingBooking.facility,
                startTime: format(editingBooking.start, "HH:mm"),
                endTime: format(editingBooking.end, "HH:mm"),
                type: editingBooking.type,
                status: editingBooking.status,
                description: editingBooking.description || "",
                attendees: editingBooking.attendees?.toString() || "",
                instructor: editingBooking.instructor || "",
                isRecurring: !!editingBooking.recurring,
                recurringFrequency: editingBooking.recurring?.frequency || "weekly",
                recurringEndDate: editingBooking.recurring
                    ? format(editingBooking.recurring.endDate, "yyyy-MM-dd")
                    : format(addDays(selectedDate, 90), "yyyy-MM-dd"),
            })
        } else {
            setFormData(prevData => ({
                ...prevData,
                facility: selectedFacility || "",
            }))
        }
    }, [editingBooking, selectedFacility, selectedDate])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const [startHours, startMinutes] = formData.startTime
            .split(":")
            .map(Number)
        const [endHours, endMinutes] = formData.endTime.split(":").map(Number)

        const start = new Date(selectedDate)
        start.setHours(startHours, startMinutes, 0, 0)

        const end = new Date(selectedDate)
        end.setHours(endHours, endMinutes, 0, 0)

        onBook({
            id: editingBooking?.id || "", // This will be set in the parent component for new bookings
            title: formData.title,
            facility: formData.facility,
            start,
            end,
            type: formData.type,
            status: formData.status,
            description: formData.description,
            attendees: formData.attendees ? parseInt(formData.attendees) : undefined,
            instructor: formData.instructor || undefined,
            createdAt: editingBooking?.createdAt || new Date(),
            ...(formData.isRecurring && {
                recurring: {
                    frequency: formData.recurringFrequency,
                    endDate: parseISO(formData.recurringEndDate),
                },
            }),
        })
        onClose()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label
                    htmlFor="title"
                    className="block text-sm font-medium text-foreground mb-1"
                >
                    Title
                </Label>
                <Input
                    id="title"
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
            </div>

            <div>
                <Label
                    htmlFor="facility"
                    className="block text-sm font-medium text-foreground mb-1"
                >
                    Facility
                </Label>
                <Select
                    value={formData.facility}
                    onValueChange={(value) =>
                        setFormData({ ...formData, facility: value })
                    }
                >
                    <SelectTrigger id="facility">
                        <SelectValue placeholder="Select a facility" />
                    </SelectTrigger>
                    <SelectContent>
                        {facilities.map((facility) => (
                            <SelectItem key={facility.id} value={facility.id}>
                                {facility.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label
                        htmlFor="startTime"
                        className="block text-sm font-medium text-foreground mb-1"
                    >
                        Start Time
                    </Label>
                    <Input
                        id="startTime"
                        type="time"
                        required
                        value={formData.startTime}
                        onChange={(e) =>
                            setFormData({ ...formData, startTime: e.target.value })
                        }
                    />
                </div>
                <div>
                    <Label
                        htmlFor="endTime"
                        className="block text-sm font-medium text-foreground mb-1"
                    >
                        End Time
                    </Label>
                    <Input
                        id="endTime"
                        type="time"
                        required
                        value={formData.endTime}
                        onChange={(e) =>
                            setFormData({ ...formData, endTime: e.target.value })
                        }
                    />
                </div>
            </div>

            <div>
                <Label
                    htmlFor="type"
                    className="block text-sm font-medium text-foreground mb-1"
                >
                    Type
                </Label>
                <Select
                    value={formData.type}
                    onValueChange={(value) =>
                        setFormData({ ...formData, type: value as Booking["type"] })
                    }
                >
                    <SelectTrigger id="type">
                        <SelectValue placeholder="Select booking type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="booking">Booking</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="event">Event</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label
                    htmlFor="description"
                    className="block text-sm font-medium text-foreground mb-1"
                >
                    Description
                </Label>
                <Input
                    id="description"
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                />
            </div>

            <div>
                <Label
                    htmlFor="attendees"
                    className="block text-sm font-medium text-foreground mb-1"
                >
                    Attendees
                </Label>
                <Input
                    id="attendees"
                    type="number"
                    value={formData.attendees}
                    onChange={(e) =>
                        setFormData({ ...formData, attendees: e.target.value })
                    }
                />
            </div>

            <div>
                <Label
                    htmlFor="instructor"
                    className="block text-sm font-medium text-foreground mb-1"
                >
                    Instructor
                </Label>
                <Input
                    id="instructor"
                    type="text"
                    value={formData.instructor}
                    onChange={(e) =>
                        setFormData({ ...formData, instructor: e.target.value })
                    }
                />
            </div>

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button type="submit">{editingBooking ? "Update" : "Book"}</Button>
            </div>
        </form>
    )
}