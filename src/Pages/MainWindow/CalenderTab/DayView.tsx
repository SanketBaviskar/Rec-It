import { useState, useRef, useEffect } from 'react';
import { format, startOfDay, endOfDay, eachMinuteOfInterval, isSameDay, differenceInMinutes, addMinutes } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { Booking, Facility } from './types';

interface DayViewProps {
    currentDate: Date;
    bookings: Booking[];
    facilities: Facility[];
    onClickSlot: (date: Date) => void;
    onEditBooking: (booking: Booking) => void;
    onDeleteBooking: (bookingId: string) => void;
}

export function DayView({
    currentDate,
    bookings,
    facilities,
    onClickSlot,
    onEditBooking,
    onDeleteBooking
}: DayViewProps) {
    const calendarRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedBooking, setDraggedBooking] = useState<Booking | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [mouseTime, setMouseTime] = useState<Date | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [mouseY, setMouseY] = useState<number | null>(null);

    const groupOverlappingEvents = (events: Booking[]) => {
        const sortedEvents = events.sort(
            (a, b) => a.start.getTime() - b.start.getTime()
        );
        const groups: Booking[][] = [];

        for (const event of sortedEvents) {
            let added = false;
            for (const group of groups) {
                if (
                    !group.some(
                        (groupEvent) =>
                            event.start < groupEvent.end && event.end > groupEvent.start
                    )
                ) {
                    group.push(event);
                    added = true;
                    break;
                }
            }
            if (!added) {
                groups.push([event]);
            }
        }

        return groups;
    };

    const handleDragStart = (e: React.MouseEvent, booking: Booking) => {
        e.stopPropagation();
        const element = e.currentTarget as HTMLDivElement;
        const rect = element.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setDraggedBooking(booking);
        setIsDragging(true);
    };

    const handleDragMove = (e: MouseEvent) => {
        if (!draggedBooking || !calendarRef.current || !isDragging) return;

        const rect = calendarRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top - dragOffset.y;

        const minutes = Math.floor(y / 2); // Each pixel represents 0.5 minutes
        const hours = Math.floor(minutes / 60);
        const minutesWithinHour = minutes % 60;
        const snappedMinutes = Math.round(minutesWithinHour / 5) * 5;

        const newStart = new Date(currentDate);
        newStart.setHours(hours, snappedMinutes, 0, 0);

        const duration = differenceInMinutes(draggedBooking.end, draggedBooking.start);
        const newEnd = addMinutes(newStart, duration);

        setBookings(prevBookings =>
            prevBookings.map(b =>
                b.id === draggedBooking.id
                    ? { ...b, start: newStart, end: newEnd }
                    : b
            )
        );
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        setDraggedBooking(null);
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
        };
    }, [isDragging, draggedBooking]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (calendarRef.current) {
            const rect = calendarRef.current.getBoundingClientRect();
            const scrollTop = calendarRef.current.scrollTop;
            const y = e.clientY - rect.top + scrollTop;
            setMouseY(y);

            const minutes = Math.floor(y / 2);
            const newDate = new Date(currentDate);
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            newDate.setHours(hours, mins, 0, 0);

            setMouseTime(newDate);
            setIsHovering(true);
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    const renderBooking = (
        booking: Booking,
        dayStart: Date,
        totalWidth: number,
        groupIndex: number,
        totalGroups: number
    ) => {
        const facility = facilities.find((f) => f.id === booking.facility);
        const startMinutes = differenceInMinutes(booking.start, dayStart) * 2;
        const duration = differenceInMinutes(booking.end, booking.start) * 2;
        const width = totalWidth / totalGroups - 4;
        const left = 60 + groupIndex * (width + 4);

        return (
            <div
                key={booking.id}
                className={`absolute rounded-md overflow-hidden cursor-move ${isDragging && draggedBooking?.id === booking.id ? 'opacity-50' : ''
                    }`}
                style={{
                    top: `${startMinutes}px`,
                    height: `${duration}px`,
                    left: `${left}px`,
                    width: `${width}px`,
                    backgroundColor: facility?.color || "#999",
                    cursor: isDragging ? 'grabbing' : 'grab',
                    zIndex: isDragging && draggedBooking?.id === booking.id ? 1000 : 1,
                }}
                onMouseDown={(e) => handleDragStart(e, booking)}
                onClick={() => onEditBooking(booking)}
            >
                <div className="p-2 h-full flex flex-col justify-between">
                    <div>
                        <div className="font-bold text-white truncate">{booking.title}</div>
                        <div className="text-white text-xs truncate">{facility?.name}</div>
                    </div>
                    <div className="text-white text-xs">
                        {format(booking.start, "HH:mm")} - {format(booking.end, "HH:mm")}
                    </div>
                </div>
                <button
                    className="absolute top-1 right-1 text-white hover:text-red-500 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteBooking(booking.id);
                    }}
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        );
    };

    const dayStart = startOfDay(currentDate);
    const dayEnd = endOfDay(currentDate);
    const intervals = eachMinuteOfInterval(
        { start: dayStart, end: dayEnd },
        { step: 30 }
    );
    const columnWidth = calendarRef.current
        ? calendarRef.current.offsetWidth - 60
        : 200;

    const dayEvents = bookings.filter((booking) =>
        isSameDay(booking.start, currentDate)
    );
    const eventGroups = groupOverlappingEvents(dayEvents);

    return (
        <div
            className="relative"
            ref={calendarRef}
            onClick={(e) => {
                const rect = calendarRef.current?.getBoundingClientRect();
                if (rect) {
                    const y = (e as React.MouseEvent).clientY - rect.top;
                    const minutes = Math.floor(y / 2);
                    const hours = Math.floor(minutes / 60);
                    const mins = minutes % 60;
                    const newDate = new Date(currentDate);
                    newDate.setHours(hours, mins, 0, 0);
                    onClickSlot(newDate);
                }
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Time grid lines */}
            {intervals.map((interval, index) => (
                <div
                    key={index}
                    className="relative flex"
                    style={{ height: "60px" }}
                >
                    <div
                        className="absolute w-14 pr-2 text-right text-sm text-gray-500 dark:text-gray-400"
                        style={{
                            top: "-9px",
                            left: "0",
                            zIndex: 10,
                            background: "var(--background)",
                            paddingTop: "2px",
                            paddingBottom: "2px"
                        }}
                    >
                        {format(interval, "HH:mm")}
                    </div>
                    <div
                        className="absolute left-14 right-0 border-t border-gray-200 dark:border-gray-700"
                        style={{ top: "-1px" }}
                    />
                    <div className="flex-1 h-full"></div>
                </div>
            ))}

            {/* Time indicator line */}
            {mouseTime && (
                <div
                    className="absolute left-0 right-0 flex items-center pointer-events-none"
                    style={{
                        top: `${(mouseY || 0) - 28}px`,
                        zIndex: 20,
                        transition: isHovering ? 'none' : 'top 0.1s ease-out'
                    }}
                >
                    <div className="w-14 pr-2 text-right">
                        <span className="bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                            {format(mouseTime, "HH:mm")}
                        </span>
                    </div>
                    <div className="flex-1 h-px bg-blue-500" />
                </div>
            )}

            {/* Render bookings */}
            {eventGroups.map((group, groupIndex) =>
                group.map((booking) =>
                    renderBooking(
                        booking,
                        dayStart,
                        columnWidth,
                        groupIndex,
                        eventGroups.length
                    )
                )
            )}
        </div>
    );
};